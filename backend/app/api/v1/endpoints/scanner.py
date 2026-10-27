from fastapi import APIRouter, Request, status
from app.schemas.scanner import ScanRequest, ScanResponse, TargetListResponse
from app.services.scanner_service import ScannerService
from app.core.limiter import limiter

router = APIRouter()


@router.post(
    "/check",
    response_model=ScanResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze suspicious gaming link for phishing and typosquatting",
)
@limiter.limit("30/minute")
def scan_link(
    request: Request,
    payload: ScanRequest,
):
    """
    Scans a given URL or domain name using multiple heuristic, homoglyph,
    and typosquatting detection algorithms to evaluate phishing risks.
    """
    result = ScannerService.scan_url(url=payload.url, lang=payload.lang or "en")
    return result


@router.get(
    "/targets",
    response_model=TargetListResponse,
    status_code=status.HTTP_200_OK,
    summary="List protected official gaming platforms and domains",
)
@limiter.limit("60/minute")
def list_monitored_targets(request: Request):
    """Returns the list of monitored official gaming ecosystems and canonical domains."""
    targets = ScannerService.get_supported_targets()
    return TargetListResponse(official_platforms=targets)
