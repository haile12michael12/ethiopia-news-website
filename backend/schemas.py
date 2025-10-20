from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class CategoryBase(BaseModel):
    name_en: str
    name_am: Optional[str] = None
    name_om: Optional[str] = None
    name_ti: Optional[str] = None
    slug: str
    description: Optional[str] = None
    parent_id: Optional[int] = None

class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class RegionBase(BaseModel):
    name_en: str
    name_am: Optional[str] = None
    name_om: Optional[str] = None
    name_ti: Optional[str] = None
    slug: str

class Region(RegionBase):
    id: int
    
    class Config:
        from_attributes = True

class ArticleBase(BaseModel):
    title_en: str
    title_am: Optional[str] = None
    title_om: Optional[str] = None
    title_ti: Optional[str] = None
    slug: str
    content_en: str
    content_am: Optional[str] = None
    content_om: Optional[str] = None
    content_ti: Optional[str] = None
    excerpt_en: Optional[str] = None
    excerpt_am: Optional[str] = None
    excerpt_om: Optional[str] = None
    excerpt_ti: Optional[str] = None
    featured_image: Optional[str] = None
    category_id: Optional[int] = None
    region_id: Optional[int] = None
    tags: List[str] = []
    is_breaking: bool = False

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(BaseModel):
    title_en: Optional[str] = None
    title_am: Optional[str] = None
    title_om: Optional[str] = None
    title_ti: Optional[str] = None
    content_en: Optional[str] = None
    content_am: Optional[str] = None
    content_om: Optional[str] = None
    content_ti: Optional[str] = None
    excerpt_en: Optional[str] = None
    category_id: Optional[int] = None
    region_id: Optional[int] = None
    tags: Optional[List[str]] = None
    status: Optional[str] = None
    is_breaking: Optional[bool] = None

class Article(ArticleBase):
    id: int
    author_id: int
    status: str
    view_count: int
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    article_id: int

class Comment(CommentBase):
    id: int
    article_id: int
    user_id: int
    is_approved: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class SubmissionBase(BaseModel):
    submitter_name: Optional[str] = None
    submitter_email: Optional[EmailStr] = None
    title: str
    content: str
    language: str = "en"
    region_id: Optional[int] = None

class SubmissionCreate(SubmissionBase):
    images: List[str] = []

class Submission(SubmissionBase):
    id: int
    submitter_id: Optional[int] = None
    images: List[str] = []
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
