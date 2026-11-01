import hashlib
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

from app.database import get_db
from app.models.threat import Threat, ThreatReport
from app.core.limiter import limiter
from app.services.threat_seed import seed_threats

router = APIRouter()


class ThreatReportCreate(BaseModel):
    game: str = Field(..., max_length=64)
    threat_type: str = Field(..., max_length=64)
    suspicious_url: Optional[str] = Field(None, max_length=512)
    suspicious_text: Optional[str] = Field(None, max_length=4096)
    description: str = Field(..., min_length=10, max_length=2048)
    contact_info: Optional[str] = Field(None, max_length=128)
    honeypot: Optional[str] = Field(None, max_length=32)


@router.get("/")
def list_threats(
    game: Optional[str] = Query(None, description="Filter by game: cs2, roblox, brawl-stars, minecraft, pubg, discord"),
    vector: Optional[str] = Query(None, description="Filter by attack vector: phishing, token_stealer, mitm, malware, social_eng"),
    severity: Optional[str] = Query(None, description="Filter by severity: CRITICAL, HIGH, MEDIUM, LOW"),
    search: Optional[str] = Query(None, description="Search keyword in title or description"),
    lang: str = Query("en", pattern="^(en|ru|uz)$"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Query verified threat intelligence database entries."""
    seed_threats(db)

    query = db.query(Threat).filter(Threat.status == "ACTIVE")

    if game and game != "all":
        query = query.filter(Threat.game == game)
    if vector and vector != "all":
        query = query.filter(Threat.attack_vector == vector)
    if severity and severity != "all":
        query = query.filter(Threat.severity == severity.upper())

    if search:
        s = f"%{search}%"
        if lang == "ru":
            query = query.filter((Threat.title_ru.ilike(s)) | (Threat.description_ru.ilike(s)))
        else:
            query = query.filter((Threat.title_en.ilike(s)) | (Threat.description_en.ilike(s)))

    total = query.count()
    items = query.order_by(Threat.created_at.desc()).offset((page - 1) * limit).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "items": [item.to_dict(lang=lang) for item in items],
    }


@router.get("/stats")
def get_threat_radar_stats(db: Session = Depends(get_db)):
    """Aggregated threat metrics for Global Scam Radar visualization."""
    seed_threats(db)

    threats = db.query(Threat).all()

    by_game: dict = {}
    by_vector: dict = {}
    by_severity: dict = {}

    for t in threats:
        by_game[t.game] = by_game.get(t.game, 0) + 1
        by_vector[t.attack_vector] = by_vector.get(t.attack_vector, 0) + 1
        by_severity[t.severity] = by_severity.get(t.severity, 0) + 1

    return {
        "total_active_threats": len(threats),
        "by_game": by_game,
        "by_vector": by_vector,
        "by_severity": by_severity,
        "recent_advisories": [
            {
                "slug": t.slug,
                "title_en": t.title_en,
                "title_ru": t.title_ru,
                "game": t.game,
                "severity": t.severity,
            }
            for t in threats[:5]
        ],
    }


@router.get("/{slug}")
def get_threat_detail(slug: str, lang: str = "en", db: Session = Depends(get_db)):
    """Retrieve detailed threat dossier by slug."""
    seed_threats(db)
    threat = db.query(Threat).filter(Threat.slug == slug).first()
    if not threat:
        raise HTTPException(status_code=404, detail="Threat not found")
    return threat.to_dict(lang=lang)


@router.post("/report")
@limiter.limit("5/minute")
def submit_threat_report(
    payload: ThreatReportCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    """Submit a community threat report for verification."""
    # Honeypot spam trap
    if payload.honeypot:
        return {"status": "success", "message": "Report received and queued for review."}

    # Hash client IP for rate limiting / abuse prevention without storing raw IP
    client_ip = request.client.host if request.client else "unknown"
    ip_hash = hashlib.sha256(client_ip.encode()).hexdigest()[:16]

    report = ThreatReport(
        game=payload.game,
        threat_type=payload.threat_type,
        suspicious_url=payload.suspicious_url,
        suspicious_text=payload.suspicious_text,
        description=payload.description,
        contact_info=payload.contact_info,
        status="PENDING",
        ip_hash=ip_hash,
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        "status": "success",
        "id": report.id,
        "message": "Report received. Our threat intelligence team will verify the indicators.",
    }


@router.get("/reports/recent")
def get_recent_reports(db: Session = Depends(get_db)):
    """Public feed of recent verified community reports."""
    reports = (
        db.query(ThreatReport)
        .order_by(ThreatReport.created_at.desc())
        .limit(10)
        .all()
    )
    return {"reports": [r.to_dict() for r in reports]}
