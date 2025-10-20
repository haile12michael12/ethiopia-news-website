from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List
from backend.database import get_db
from backend.models import Comment, User, Article
from backend.schemas import CommentCreate, Comment as CommentSchema
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/api/comments", tags=["comments"])

@router.post("", response_model=CommentSchema)
async def create_comment(
    comment_data: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Article).where(Article.id == comment_data.article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    new_comment = Comment(
        article_id=comment_data.article_id,
        user_id=current_user.id,
        content=comment_data.content
    )
    db.add(new_comment)
    await db.commit()
    await db.refresh(new_comment)
    return new_comment

@router.get("/article/{article_id}", response_model=List[CommentSchema])
async def get_article_comments(
    article_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(Comment).where(
        Comment.article_id == article_id,
        Comment.is_approved == True
    ).order_by(desc(Comment.created_at))
    
    result = await db.execute(query)
    return result.scalars().all()

@router.put("/{comment_id}/approve")
async def approve_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role not in ["editor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    comment.is_approved = True
    await db.commit()
    return {"message": "Comment approved"}
