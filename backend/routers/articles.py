from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_, desc
from typing import List, Optional
from datetime import datetime
import os
import uuid
from backend.database import get_db
from backend.models import Article, User, Category, Region
from backend.schemas import ArticleCreate, ArticleUpdate, Article as ArticleSchema
from backend.utils.auth import get_current_user, get_optional_user
from backend.utils.ethiopian_calendar import format_ethiopian_date

router = APIRouter(prefix="/api/articles", tags=["articles"])

@router.post("", response_model=ArticleSchema)
async def create_article(
    article_data: ArticleCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    new_article = Article(
        **article_data.dict(),
        author_id=current_user.id
    )
    db.add(new_article)
    await db.commit()
    await db.refresh(new_article)
    return new_article

@router.get("", response_model=List[ArticleSchema])
async def get_articles(
    skip: int = 0,
    limit: int = 20,
    status: Optional[str] = None,
    category_id: Optional[int] = None,
    region_id: Optional[int] = None,
    is_breaking: Optional[bool] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Article)
    
    if status:
        query = query.where(Article.status == status)
    else:
        query = query.where(Article.status == "published")
    
    if category_id:
        query = query.where(Article.category_id == category_id)
    
    if region_id:
        query = query.where(Article.region_id == region_id)
    
    if is_breaking is not None:
        query = query.where(Article.is_breaking == is_breaking)
    
    if search:
        search_filter = or_(
            Article.title_en.ilike(f"%{search}%"),
            Article.title_am.ilike(f"%{search}%"),
            Article.content_en.ilike(f"%{search}%"),
            Article.content_am.ilike(f"%{search}%")
        )
        query = query.where(search_filter)
    
    query = query.order_by(desc(Article.published_at)).offset(skip).limit(limit)
    
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/trending", response_model=List[ArticleSchema])
async def get_trending_articles(
    region_id: Optional[int] = None,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    query = select(Article).where(Article.status == "published")
    
    if region_id:
        query = query.where(Article.region_id == region_id)
    
    query = query.order_by(desc(Article.view_count)).limit(limit)
    
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{article_id}", response_model=ArticleSchema)
async def get_article(
    article_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    if article.status != "published" and (not current_user or current_user.id != article.author_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    article.view_count += 1
    await db.commit()
    
    return article

@router.put("/{article_id}", response_model=ArticleSchema)
async def update_article(
    article_id: int,
    article_data: ArticleUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    if article.author_id != current_user.id and current_user.role not in ["editor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    for key, value in article_data.dict(exclude_unset=True).items():
        setattr(article, key, value)
    
    if article_data.status == "published" and not article.published_at:
        article.published_at = datetime.utcnow()
    
    await db.commit()
    await db.refresh(article)
    return article

@router.delete("/{article_id}")
async def delete_article(
    article_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    if article.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.delete(article)
    await db.commit()
    return {"message": "Article deleted successfully"}

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    file_extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_extension}"
    filepath = f"backend/static/uploads/{filename}"
    
    os.makedirs("backend/static/uploads", exist_ok=True)
    
    with open(filepath, "wb") as f:
        content = await file.read()
        f.write(content)
    
    return {"url": f"/uploads/{filename}"}
