from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ScanRequest(BaseModel):
    url: str = Field(..., min_length=3, max_length=2048, description="URL or domain string to inspect")
    lang: Optional[str] = Field("en", description="Language for analysis messages ('en' or 'ru')")


class ScanFlag(BaseModel):
    id: str
    severity: str  # "CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"
    name: str
    description: str


class ScanAnalysisDetails(BaseModel):
    has_homoglyphs: bool = False
    homoglyphs_detected: List[Dict[str, Any]] = Field(default_factory=list)
    typosquatting_detected: bool = False
    typosquatting_target: Optional[str] = None
    edit_distance: Optional[int] = None
    suspicious_tld: bool = False
    tld: str = ""
    is_ip_address: bool = False
    subdomain_depth: int = 0
    subdomains: List[str] = Field(default_factory=list)
    detected_keywords: List[str] = Field(default_factory=list)


class ScanResponse(BaseModel):
    original_url: str
    normalized_url: str
    domain: str
    risk_score: int = Field(..., ge=0, le=100)
    risk_level: str  # "SAFE", "CAUTION", "SUSPICIOUS", "CRITICAL"
    verdict: str
    is_official_domain: bool
    matched_target: Optional[str] = None
    flags: List[ScanFlag] = Field(default_factory=list)
    details: ScanAnalysisDetails
    recommendations: List[str] = Field(default_factory=list)
    scan_timestamp: str


class TargetListResponse(BaseModel):
    official_platforms: List[Dict[str, Any]]
