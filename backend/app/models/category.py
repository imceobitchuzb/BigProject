from sqlalchemy import Column, String, Integer, Text
from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(64), unique=True, nullable=False, index=True)
    title_en = Column(String(128), nullable=False)
    title_ru = Column(String(128), nullable=False)
    description_en = Column(Text, nullable=False)
    description_ru = Column(Text, nullable=False)
    icon = Column(String(32), nullable=False, default="shield")
    display_order = Column(Integer, default=0, index=True)

    def to_dict(self, lang: str = "en"):
        return {
            "id": self.id,
            "slug": self.slug,
            "title": self.title_ru if lang == "ru" else self.title_en,
            "description": self.description_ru if lang == "ru" else self.description_en,
            "icon": self.icon,
            "display_order": self.display_order,
        }
