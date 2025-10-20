from fastapi import APIRouter, Depends
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from feedgen.feed import FeedGenerator
from backend.database import get_db
from backend.models import Article

router = APIRouter(prefix="/api/rss", tags=["rss"])

@router.get("/feed.xml")
async def generate_rss_feed(db: AsyncSession = Depends(get_db)):
    fg = FeedGenerator()
    fg.id("https://ethiopiannews.com")
    fg.title("Ethiopian News")
    fg.link(href="https://ethiopiannews.com", rel="alternate")
    fg.description("Latest news from Ethiopia")
    fg.language("en")
    
    result = await db.execute(
        select(Article)
        .where(Article.status == "published")
        .order_by(desc(Article.published_at))
        .limit(20)
    )
    articles = result.scalars().all()
    
    for article in articles:
        fe = fg.add_entry()
        fe.id(f"https://ethiopiannews.com/article/{article.slug}")
        fe.title(article.title_en)
        fe.link(href=f"https://ethiopiannews.com/article/{article.slug}")
        fe.description(article.excerpt_en or article.content_en[:200])
        fe.published(article.published_at)
        if article.featured_image:
            fe.enclosure(article.featured_image, 0, "image/jpeg")
    
    rss_feed = fg.rss_str(pretty=True)
    return Response(content=rss_feed, media_type="application/rss+xml")
