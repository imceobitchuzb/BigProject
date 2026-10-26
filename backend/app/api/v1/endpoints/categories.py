from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.repositories.category_repo import CategoryRepository
from app.schemas.category import CategoryResponse

router = APIRouter()

# Default fallback categories if database is newly initialized
DEFAULT_CATEGORIES = [
    {
        "id": "account-security",
        "slug": "account-security",
        "title_en": "Account Security",
        "title_ru": "Безопасность аккаунта",
        "description_en": "Authentication, passwords, recovery emails, and unauthorized session management.",
        "description_ru": "Аутентификация, надежные пароли, защита почты и управление сессиями.",
        "icon": "shield-check",
        "display_order": 1,
    },
    {
        "id": "phishing",
        "slug": "phishing",
        "title_en": "Phishing & Fake Sites",
        "title_ru": "Фишинг и поддельные сайты",
        "description_en": "Counterfeit login portals, lookalike domains, and deceptive tournament links.",
        "description_ru": "Поддельные страницы входа, похожие домены и фальшивые турниры.",
        "icon": "globe",
        "display_order": 2,
    },
    {
        "id": "trading-and-items",
        "slug": "trading-and-items",
        "title_en": "Trading & Virtual Items",
        "title_ru": "Торговля и предметы",
        "description_en": "API interception, item substitution, and peer-to-peer exchange safety.",
        "description_ru": "API-скам, подмена скинов при обмене и безопасность P2P сделок.",
        "icon": "repeat",
        "display_order": 3,
    },
    {
        "id": "currency-and-payments",
        "slug": "currency-and-payments",
        "title_en": "Currency & Payments",
        "title_ru": "Валюта и платежи",
        "description_en": "Third-party top-ups, stolen card chargebacks, and payment card protection.",
        "description_ru": "Покупка доната на сторонних сайтах, чарджбэки и защита платежных карт.",
        "icon": "credit-card",
        "display_order": 4,
    },
    {
        "id": "fake-giveaways",
        "slug": "fake-giveaways",
        "title_en": "Fake Giveaways",
        "title_ru": "Фейковые раздачи",
        "description_en": "Fraudulent Discord Nitro codes, bogus stream raffles, and QR scams.",
        "description_ru": "Поддельный Discord Nitro, фальшивые стримы с QR-кодами и боты-скамеры.",
        "icon": "gift",
        "display_order": 5,
    },
    {
        "id": "fake-support",
        "slug": "fake-support",
        "title_en": "Fake Support & Recovery",
        "title_ru": "Поддельная поддержка",
        "description_en": "Pseudosupport agents, fake admins on Discord, and fee-based recovery scams.",
        "description_ru": "Лже-агенты поддержки, фальшивые админы в Discord и скам на возврате аккаунтов.",
        "icon": "headset",
        "display_order": 6,
    },
    {
        "id": "social-engineering",
        "slug": "social-engineering",
        "title_en": "Social Engineering",
        "title_ru": "Социальная инженерия",
        "description_en": "Trust manipulation, clan pressure, voice patch malware, and grooming tactics.",
        "description_ru": "Манипуляции доверием, давление в кланах, вредоносные программы связи.",
        "icon": "users",
        "display_order": 7,
    },
    {
        "id": "incident-response",
        "slug": "incident-response",
        "title_en": "Incident Response",
        "title_ru": "Реагирование на инциденты",
        "description_en": "Emergency actions, account quarantine, evidence collection, and recovery guidance.",
        "description_ru": "Экстренный план действий, изоляция аккаунта, сбор улик и обращение в поддержку.",
        "icon": "alert-triangle",
        "display_order": 8,
    },
]


@router.get("/categories", response_model=List[CategoryResponse])
def get_categories(
    lang: str = Query("en", pattern="^(en|ru)$"),
    db: Session = Depends(get_db),
):
    """Retrieve published educational threat categories localized in English or Russian."""
    repo = CategoryRepository(db)
    db_categories = repo.get_all()

    if db_categories:
        return [
            CategoryResponse(
                id=c.id,
                slug=c.slug,
                title=c.title_ru if lang == "ru" else c.title_en,
                description=c.description_ru if lang == "ru" else c.description_en,
                icon=c.icon,
                display_order=c.display_order,
            )
            for c in db_categories
        ]

    # Return defaults if database not seeded yet
    return [
        CategoryResponse(
            id=c["id"],
            slug=c["slug"],
            title=c["title_ru"] if lang == "ru" else c["title_en"],
            description=c["description_ru"] if lang == "ru" else c["description_en"],
            icon=c["icon"],
            display_order=c["display_order"],
        )
        for c in DEFAULT_CATEGORIES
    ]
