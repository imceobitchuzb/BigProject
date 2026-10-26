import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    subject = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False, default="general")
    message = Column(Text, nullable=False)
    email = Column(String(255), nullable=True)
    status = Column(String(32), default="pending", index=True)  # pending, reviewed, resolved
    client_ip_hash = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "subject": self.subject,
            "category": self.category,
            "message": self.message,
            "email": self.email,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
