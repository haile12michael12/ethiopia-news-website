from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from backend.database import get_db
from backend.models import Category, User
from backend.schemas import CategoryBase, Category as CategorySchema
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/api/categories", tags=["categories"])

@router.post("", response_model=CategorySchema)
async def create_category(
    category_data: CategoryBase,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role not in ["editor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_category = Category(**category_data.dict())
    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)
    return new_category

@router.get("", response_model=List[CategorySchema])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category))
    return result.scalars().all()
