import html
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    subject: str = Field(..., min_length=2, max_length=128, description="Subject or topic of inquiry")
    category: str = Field("general", min_length=2, max_length=64, description="Category of submission")
    message: str = Field(..., min_length=10, max_length=2000, description="Message content")
    email: Optional[EmailStr] = Field(None, max_length=255, description="Optional contact email for replies")
    honeypot: Optional[str] = Field(None, max_length=100, description="Anti-spam honeypot field, must be empty")

    @field_validator("subject", "category", "message", mode="before")
    @classmethod
    def sanitize_strings(cls, v: str) -> str:
        if isinstance(v, str):
            # Strip whitespace and normalize
            cleaned = v.strip()
            # Escape HTML characters to protect against XSS
            return html.escape(cleaned)
        return v

    @field_validator("honeypot")
    @classmethod
    def check_honeypot(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v.strip()) > 0:
            raise ValueError("Spam detected")
        return v


class ContactResponse(BaseModel):
    status: str
    message: str
    submission_id: Optional[int] = None
