from fastapi import APIRouter, HTTPException
from api.services.analytics_service import get_analytics

router = APIRouter(tags=["Analytics"])


@router.get("/analytics")
def analytics():
    """
    Returns system analytics and usage statistics.
    """
    try:
        return get_analytics()
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Analytics service unavailable"
        )