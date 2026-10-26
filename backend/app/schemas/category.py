from pydantic import BaseModel, Field


class CategoryBase(BaseModel):
    id: str = Field(..., max_length=64, description="Unique category slug/ID")
    slug: str = Field(..., max_length=64)
    title_en: str = Field(..., max_length=128)
    title_ru: str = Field(..., max_length=128)
    description_en: str
    description_ru: str
    icon: str = Field("shield", max_length=32)
    display_order: int = 0


class CategoryLocalized(BaseModel):
    id: str
    slug: str
    title: str
    description: str
    icon: str
    display_order: int


class CategoryResponse(CategoryLocalized):
    pass
