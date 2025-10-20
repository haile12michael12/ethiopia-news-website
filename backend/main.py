from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.database import init_db
from backend.routers import auth, articles, submissions, comments, categories, regions, rss, websocket

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(title="Ethiopian News API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="backend/static/uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(articles.router)
app.include_router(submissions.router)
app.include_router(comments.router)
app.include_router(categories.router)
app.include_router(regions.router)
app.include_router(rss.router)
app.include_router(websocket.router)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
