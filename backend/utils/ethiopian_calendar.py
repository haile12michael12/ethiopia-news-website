from datetime import datetime, timedelta

def gregorian_to_ethiopian(g_date: datetime) -> dict:
    """Convert Gregorian date to Ethiopian calendar date"""
    
    year = g_date.year
    month = g_date.month
    day = g_date.day
    
    if month == 1 and day <= 9:
        e_year = year - 8
        e_month = 4
        e_day = day + 21
    elif month >= 9 or (month == 9 and day >= 11):
        e_year = year - 7
        if month == 9:
            e_month = 1
            e_day = day - 10
        elif month == 10:
            e_month = 1 if day <= 10 else 2
            e_day = day + 20 if day <= 10 else day - 10
        elif month == 11:
            e_month = 2 if day <= 9 else 3
            e_day = day + 21 if day <= 9 else day - 9
        elif month == 12:
            e_month = 3 if day <= 9 else 4
            e_day = day + 21 if day <= 9 else day - 9
        else:
            e_month = month - 8
            e_day = day + 21
    else:
        e_year = year - 7
        e_month = month + 4
        e_day = day + 21
    
    return {
        "year": e_year,
        "month": e_month,
        "day": e_day
    }

def format_ethiopian_date(g_date: datetime, language: str = "en") -> str:
    """Format Ethiopian date in specified language"""
    eth_date = gregorian_to_ethiopian(g_date)
    
    months = {
        "en": ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"],
        "am": ["መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"]
    }
    
    month_names = months.get(language, months["en"])
    month_name = month_names[eth_date["month"] - 1] if eth_date["month"] <= 13 else ""
    
    return f"{month_name} {eth_date['day']}, {eth_date['year']}"
