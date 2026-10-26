from typing import List, Optional
from pydantic import BaseModel


class ArticleSummary(BaseModel):
    slug: str
    title: str
    description: str
    category: str
    category_title: Optional[str] = None
    lang: str
    published_date: str
    last_reviewed: Optional[str] = None
    reading_time: str
    warning_signs_count: int


class ArticleDetail(ArticleSummary):
    content_html: Optional[str] = None
    content_markdown: str
    warning_signs: List[str]
    prevention_steps: List[str]
    recovery_steps: List[str]
    official_sources: List[dict]
    related_slugs: List[str]
