import hashlib
from typing import Optional
from sqlalchemy.orm import Session
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate, ContactResponse
from app.repositories.contact_repo import ContactRepository


class ContactService:
    def __init__(self, db: Session):
        self.repo = ContactRepository(db)

    @staticmethod
    def _hash_ip(ip: Optional[str]) -> Optional[str]:
        if not ip:
            return None
        # Salted hash to preserve user privacy
        salt = "safeingame-privacy-salt-v1"
        return hashlib.sha256(f"{salt}:{ip}".encode("utf-8")).hexdigest()[:32]

    def create_submission(self, data: ContactCreate, client_ip: Optional[str] = None) -> ContactResponse:
        ip_hash = self._hash_ip(client_ip)

        submission = ContactSubmission(
            subject=data.subject,
            category=data.category,
            message=data.message,
            email=str(data.email) if data.email else None,
            status="pending",
            client_ip_hash=ip_hash,
        )

        saved = self.repo.create(submission)
        return ContactResponse(
            status="received",
            message="Your message has been safely received and stored for founder review. We do not share your inquiry with third parties.",
            submission_id=saved.id,
        )
