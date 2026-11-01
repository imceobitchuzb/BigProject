from typing import Optional
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel, Field
from app.core.limiter import limiter
from app.services.detective_service import analyze_scam_content

router = APIRouter()


class DetectiveRequest(BaseModel):
    text: Optional[str] = Field(None, max_length=10000, description="Suspicious text or chat excerpt")
    url: Optional[str] = Field(None, max_length=2048, description="Suspicious URL")
    image_metadata: Optional[str] = Field(None, max_length=5000, description="Extracted OCR text or image context")
    lang: str = Field("en", pattern="^(en|ru|uz)$")


@router.post("/analyze")
@limiter.limit("20/minute")
def analyze_scam(payload: DetectiveRequest, request: Request):
    """
    AI Scam Detective analysis endpoint.
    Performs multi-vector threat detection on text, URLs, and screenshots.
    Redacts personal identifiers and guarantees zero credential harvesting.
    """
    if not payload.text and not payload.url and not payload.image_metadata:
        raise HTTPException(
            status_code=400,
            detail="At least one input (text, url, or image_metadata) must be provided for analysis."
        )

    result = analyze_scam_content(
        text=payload.text,
        url=payload.url,
        image_metadata=payload.image_metadata,
        lang=payload.lang
    )

    return result
