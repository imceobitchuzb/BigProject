from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "SafeInGame API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "sqlite:///./safeingame.db"
    
    # Security & CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:4321",
        "http://127.0.0.1:4321",
        "http://localhost:3000",
        "https://safeingame.org",
    ]
    
    # Rate Limiting
    RATE_LIMIT_CONTACT: str = "5/minute"
    
    # Admin / Founder inspection key (for local management/CLI)
    ADMIN_API_KEY: str = "dev-secret-founder-key-change-in-prod"
    
    # Content path (for markdown articles sync/read)
    CONTENT_DIR: str = "../frontend/src/content/threats"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
