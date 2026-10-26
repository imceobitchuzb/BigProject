from fastapi import APIRouter, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import ContactService
from app.core.limiter import limiter
from app.core.config import settings

router = APIRouter()


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit feedback, inquiry, or scam report for founder review",
)
@limiter.limit(settings.RATE_LIMIT_CONTACT)
def submit_contact(
    request: Request,
    payload: ContactCreate,
    db: Session = Depends(get_db),
):
    """Safely process and store contact submissions with rate limiting and anti-spam validation."""
    client_ip = request.client.host if request.client else None

    # Anti-bot honeypot check
    if payload.honeypot:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request submission.",
        )

    service = ContactService(db)
    response = service.create_submission(data=payload, client_ip=client_ip)
    return response
