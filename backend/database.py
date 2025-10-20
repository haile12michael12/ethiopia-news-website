import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from urllib.parse import urlparse, urlunparse, parse_qs, urlencode

def clean_database_url(url: str) -> str:
    url = url.replace("postgresql://", "postgresql+asyncpg://")
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    query.pop('sslmode', None)
    new_query = urlencode(query, doseq=True)
    return urlunparse((
        parsed.scheme,
        parsed.netloc,
        parsed.path,
        parsed.params,
        new_query,
        parsed.fragment
    ))

DATABASE_URL = clean_database_url(os.getenv("DATABASE_URL", ""))

engine = create_async_engine(DATABASE_URL, echo=False, future=True)
async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

async def get_db():
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
