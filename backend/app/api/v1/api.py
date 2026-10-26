from fastapi import APIRouter
from app.api.v1.endpoints import health, categories, articles, contact

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(categories.router, tags=["Categories"])
api_router.include_router(articles.router, tags=["Articles"])
api_router.include_router(contact.router, tags=["Contact"])
