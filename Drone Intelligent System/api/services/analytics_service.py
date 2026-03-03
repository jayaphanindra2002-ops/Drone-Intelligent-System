from collections import Counter
from datetime import datetime
from typing import Optional
from threading import Lock

# In-memory analytics store
analytics_data = {
    "total_requests": 0,
    "chat_requests": 0,
    "tool_usage": Counter(),
    "queries": [],
    "start_time": datetime.utcnow(),
}

analytics_lock = Lock()
MAX_QUERY_HISTORY = 1000


def record_chat(query: str, tool_used: Optional[str]):
    with analytics_lock:
        analytics_data["total_requests"] += 1
        analytics_data["chat_requests"] += 1

        analytics_data["queries"].append(query)
        analytics_data["queries"] = analytics_data["queries"][-MAX_QUERY_HISTORY:]

        if tool_used:
            analytics_data["tool_usage"][tool_used] += 1


def record_tool(tool_name: str):
    with analytics_lock:
        analytics_data["total_requests"] += 1
        analytics_data["tool_usage"][tool_name] += 1


def get_analytics():
    uptime = datetime.utcnow() - analytics_data["start_time"]

    return {
        "total_requests": analytics_data["total_requests"],
        "chat_requests": analytics_data["chat_requests"],
        "popular_queries": Counter(
            analytics_data["queries"]
        ).most_common(5),
        "tool_usage": dict(analytics_data["tool_usage"]),
        "uptime_seconds": int(uptime.total_seconds()),
    }