from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List, Optional
import os
import uuid
from backend.database import get_db
from backend.models import Submission, User
from backend.schemas import SubmissionCreate, Submission as SubmissionSchema
from backend.utils.auth import get_current_user, get_optional_user

router = APIRouter(prefix="/api/submissions", tags=["submissions"])

@router.post("", response_model=SubmissionSchema)
async def create_submission(
    submission_data: SubmissionCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    new_submission = Submission(
        **submission_data.dict(),
        submitter_id=current_user.id if current_user else None
    )
    db.add(new_submission)
    await db.commit()
    await db.refresh(new_submission)
    return new_submission

@router.get("", response_model=List[SubmissionSchema])
async def get_submissions(
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role not in ["editor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    query = select(Submission)
    
    if status:
        query = query.where(Submission.status == status)
    
    query = query.order_by(desc(Submission.created_at)).offset(skip).limit(limit)
    
    result = await db.execute(query)
    return result.scalars().all()

@router.put("/{submission_id}/status")
async def update_submission_status(
    submission_id: int,
    status: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role not in ["editor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.execute(select(Submission).where(Submission.id == submission_id))
    submission = result.scalar_one_or_none()
    
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    submission.status = status
    submission.reviewed_by = current_user.id
    await db.commit()
    await db.refresh(submission)
    return submission
