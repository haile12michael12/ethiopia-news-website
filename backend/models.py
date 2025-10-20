from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Index, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
from backend.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="reader")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    articles = relationship("Article", back_populates="author")
    comments = relationship("Comment", back_populates="user")
    submissions = relationship("Submission", foreign_keys="Submission.submitter_id", back_populates="submitter")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name_en = Column(String, nullable=False)
    name_am = Column(String)
    name_om = Column(String)
    name_ti = Column(String)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    parent = relationship("Category", remote_side=[id], backref="subcategories")
    articles = relationship("Article", back_populates="category")

class Region(Base):
    __tablename__ = "regions"
    
    id = Column(Integer, primary_key=True, index=True)
    name_en = Column(String, nullable=False)
    name_am = Column(String)
    name_om = Column(String)
    name_ti = Column(String)
    slug = Column(String, unique=True, index=True, nullable=False)
    
    articles = relationship("Article", back_populates="region")

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title_en = Column(String, nullable=False)
    title_am = Column(String)
    title_om = Column(String)
    title_ti = Column(String)
    slug = Column(String, unique=True, index=True, nullable=False)
    content_en = Column(Text, nullable=False)
    content_am = Column(Text)
    content_om = Column(Text)
    content_ti = Column(Text)
    excerpt_en = Column(Text)
    excerpt_am = Column(Text)
    excerpt_om = Column(Text)
    excerpt_ti = Column(Text)
    featured_image = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    region_id = Column(Integer, ForeignKey("regions.id"))
    tags = Column(ARRAY(String), default=[])
    status = Column(String, default="draft")
    is_breaking = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    published_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    author = relationship("User", back_populates="articles")
    category = relationship("Category", back_populates="articles")
    region = relationship("Region", back_populates="articles")
    comments = relationship("Comment", back_populates="article", cascade="all, delete-orphan")
    
    __table_args__ = (
        Index('idx_article_status_published', status, published_at),
    )

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    article = relationship("Article", back_populates="comments")
    user = relationship("User", back_populates="comments")

class Submission(Base):
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    submitter_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    submitter_name = Column(String)
    submitter_email = Column(String)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    language = Column(String, default="en")
    images = Column(ARRAY(String), default=[])
    region_id = Column(Integer, ForeignKey("regions.id"))
    status = Column(String, default="pending")
    reviewed_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    submitter = relationship("User", foreign_keys=[submitter_id], back_populates="submissions")
    region = relationship("Region")
