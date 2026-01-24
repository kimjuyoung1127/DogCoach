from datetime import datetime, date, timezone
import pytz
from zoneinfo import ZoneInfo
from typing import Optional

def to_utc(dt: datetime, timezone_str: str = "Asia/Seoul") -> datetime:
    """
    Converts a naive or timezone-aware datetime to UTC aware datetime.
    """
    if dt.tzinfo is None:
        # If naive, assume it is in the user's timezone
        local_tz = ZoneInfo(timezone_str)
        dt = dt.replace(tzinfo=local_tz)
    
    return dt.astimezone(timezone.utc)

def get_today_with_timezone(timezone_str: str = "Asia/Seoul") -> date:
    """
    Returns today's date based on the user's timezone.
    Important for calculating 'Daily Missions' or 'Streaks'.
    """
    return datetime.now(ZoneInfo(timezone_str)).date()
