from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from backend.database import get_db
from backend.models import Region, User
from backend.schemas import RegionBase, Region as RegionSchema
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/api/regions", tags=["regions"])

@router.post("", response_model=RegionSchema)
async def create_region(
    region_data: RegionBase,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role not in ["editor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_region = Region(**region_data.dict())
    db.add(new_region)
    await db.commit()
    await db.refresh(new_region)
    return new_region

@router.get("", response_model=List[RegionSchema])
async def get_regions(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Region))
    return result.scalars().all()
