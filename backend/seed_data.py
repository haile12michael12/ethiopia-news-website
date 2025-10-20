import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import async_session_maker, init_db
from backend.models import User, Category, Region
from backend.utils.auth import get_password_hash

async def seed_data():
    await init_db()
    
    async with async_session_maker() as db:
        admin_user = User(
            email="admin@ethiopiannews.com",
            username="admin",
            full_name="Admin User",
            hashed_password=get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin_user)
        
        categories = [
            Category(
                name_en="Politics",
                name_am="ፖለቲካ",
                name_om="Siyaasa",
                name_ti="ፖለቲካ",
                slug="politics"
            ),
            Category(
                name_en="Business",
                name_am="ቢዝነስ",
                name_om="Daldala",
                name_ti="ንግዲ",
                slug="business"
            ),
            Category(
                name_en="Sports",
                name_am="ስፖርት",
                name_om="Ispoortii",
                name_ti="ስፖርት",
                slug="sports"
            ),
            Category(
                name_en="Technology",
                name_am="ቴክኖሎጂ",
                name_om="Teeknooloojii",
                name_ti="ቴክኖሎጂ",
                slug="technology"
            ),
            Category(
                name_en="Health",
                name_am="ጤና",
                name_om="Fayyaa",
                name_ti="ጥዕና",
                slug="health"
            ),
        ]
        
        for category in categories:
            db.add(category)
        
        regions = [
            Region(
                name_en="Addis Ababa",
                name_am="አዲስ አበባ",
                name_om="Finfinnee",
                name_ti="አዲስ አበባ",
                slug="addis-ababa"
            ),
            Region(
                name_en="Oromia",
                name_am="ኦሮሚያ",
                name_om="Oromiyaa",
                name_ti="ኦሮሚያ",
                slug="oromia"
            ),
            Region(
                name_en="Amhara",
                name_am="አማራ",
                name_om="Amaaraa",
                name_ti="አማራ",
                slug="amhara"
            ),
            Region(
                name_en="Tigray",
                name_am="ትግራይ",
                name_om="Tigiraay",
                name_ti="ትግራይ",
                slug="tigray"
            ),
            Region(
                name_en="Sidama",
                name_am="ሲዳማ",
                name_om="Sidaamaa",
                name_ti="ሲዳማ",
                slug="sidama"
            ),
        ]
        
        for region in regions:
            db.add(region)
        
        await db.commit()
        print("✅ Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
