import datetime
import json
from sqlalchemy import Column, String, Integer, Text, DateTime, JSON
from app.database import Base


def utcnow():
    return datetime.datetime.now(datetime.timezone.utc)


class Threat(Base):
    __tablename__ = "threats"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    slug = Column(String(128), unique=True, nullable=False, index=True)
    title_en = Column(String(256), nullable=False)
    title_ru = Column(String(256), nullable=False)
    game = Column(String(64), nullable=False, index=True)  # cs2, roblox, brawl-stars, minecraft, pubg, discord, universal
    attack_vector = Column(String(64), nullable=False, index=True)  # phishing, token_stealer, mitm, social_eng, malware, credential_stuffing
    severity = Column(String(32), nullable=False, default="HIGH", index=True)  # CRITICAL, HIGH, MEDIUM, LOW
    description_en = Column(Text, nullable=False)
    description_ru = Column(Text, nullable=False)
    indicators_json = Column(Text, nullable=False, default="[]")  # JSON-encoded array of IOC strings
    prevention_en = Column(Text, nullable=False)
    prevention_ru = Column(Text, nullable=False)
    status = Column(String(32), default="ACTIVE", index=True)  # ACTIVE, MITIGATED, MONITORING
    created_at = Column(DateTime, default=utcnow)

    def to_dict(self, lang: str = "en"):
        try:
            indicators = json.loads(self.indicators_json)
        except Exception:
            indicators = []

        return {
            "id": self.id,
            "slug": self.slug,
            "title": self.title_ru if lang == "ru" else self.title_en,
            "game": self.game,
            "attack_vector": self.attack_vector,
            "severity": self.severity,
            "description": self.description_ru if lang == "ru" else self.description_en,
            "indicators": indicators,
            "prevention": self.prevention_ru if lang == "ru" else self.prevention_en,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class ThreatReport(Base):
    __tablename__ = "threat_reports"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    game = Column(String(64), nullable=False, default="universal")
    threat_type = Column(String(64), nullable=False)  # phishing_url, fake_support, mod_malware, trade_scam, code_theft
    suspicious_url = Column(String(512), nullable=True)
    suspicious_text = Column(Text, nullable=True)
    description = Column(Text, nullable=False)
    contact_info = Column(String(128), nullable=True)  # Optional Discord/Telegram handle or email
    status = Column(String(32), default="PENDING", index=True)  # PENDING, VERIFIED, REJECTED
    ip_hash = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "game": self.game,
            "threat_type": self.threat_type,
            "suspicious_url": self.suspicious_url,
            "suspicious_text": self.suspicious_text[:200] if self.suspicious_text else None,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
