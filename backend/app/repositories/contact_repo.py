from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.contact import ContactSubmission


class ContactRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, submission: ContactSubmission) -> ContactSubmission:
        self.db.add(submission)
        self.db.commit()
        self.db.refresh(submission)
        return submission

    def get_by_id(self, submission_id: int) -> Optional[ContactSubmission]:
        return self.db.query(ContactSubmission).filter(ContactSubmission.id == submission_id).first()

    def list_all(self, limit: int = 50, offset: int = 0) -> List[ContactSubmission]:
        return (
            self.db.query(ContactSubmission)
            .order_by(ContactSubmission.created_at.desc())
            .offset(offset)
            .limit(limit)
            .all()
        )

    def count(self) -> int:
        return self.db.query(ContactSubmission).count()
