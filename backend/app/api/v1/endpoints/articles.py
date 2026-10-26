import math
from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.article import ArticleSummary, ArticleDetail
from app.schemas.common import PaginatedResponse
from app.services.article_service import ArticleService

router = APIRouter()


@router.get("/articles", response_model=PaginatedResponse[ArticleSummary])
def get_articles(
    lang: str = Query("en", pattern="^(en|ru)$", description="Language code"),
    category: Optional[str] = Query(None, description="Category slug filter"),
    q: Optional[str] = Query(None, min_length=1, max_length=100, description="Search query"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=50, description="Items per page"),
):
    """Retrieve published educational threat articles with search, category filtering, and pagination."""
    items, total = ArticleService.list_articles(
        lang=lang,
        category=category,
        query=q,
        page=page,
        page_size=page_size,
    )
    total_pages = math.ceil(total / page_size) if total > 0 else 1

    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/articles/{slug}", response_model=ArticleDetail)
def get_article(
    slug: str,
    lang: str = Query("en", pattern="^(en|ru)$", description="Language code"),
):
    """Retrieve an individual educational article by slug and language."""
    article = ArticleService.get_article(slug=slug, lang=lang)
    if not article:
        raise HTTPException(
            status_code=404,
            detail=f"Article '{slug}' was not found for language '{lang}'.",
        )
    return article
