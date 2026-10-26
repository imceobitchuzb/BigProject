import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.schemas.common import HealthResponse
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def get_health(db: Session = Depends(get_db)):
    """Health check endpoint confirming service status and database connectivity."""
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_status = "degraded"

    return HealthResponse(
        status="ok" if db_status == "healthy" else "degraded",
        version=settings.VERSION,
        service=settings.PROJECT_NAME,
        timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat(),
        database=db_status,
    )
