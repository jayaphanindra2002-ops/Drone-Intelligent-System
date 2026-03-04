from fastapi import APIRouter
from pydantic import BaseModel

# Import MCP tools
from MCP_Server.tools.flight_time_calculator import calculate_flight_time
from MCP_Server.tools.ROI import calculate_roi
from MCP_Server.tools.compliance_checker import check_compliance
from MCP_Server.tools.drone_selection_assistant import select_drones
from api.services.analytics_service import record_tool

router = APIRouter(tags=["Calculations"])


# -----------------------------
# REQUEST MODELS
# -----------------------------

class FlightTimeRequest(BaseModel):
    battery_capacity_wh: float
    drone_weight_kg: float
    payload_weight_kg: float
    weather_condition: str


class ROIRequest(BaseModel):
    investment: float
    monthly_revenue: float
    monthly_cost: float


class ComplianceRequest(BaseModel):
    drone_weight_kg: float
    intended_use: str
    location: str


class DroneRecommendationRequest(BaseModel):
    use_case: str
    budget_inr: float
    min_flight_time: float = 20


# -----------------------------
# ENDPOINTS
# -----------------------------

@router.post("/calculate/flight-time")
def flight_time(data: FlightTimeRequest):

    result = calculate_flight_time(
        data.battery_capacity_wh,
        data.drone_weight_kg,
        data.payload_weight_kg,
        data.weather_condition,
    )
    try:
     record_tool("flight_time_calculator")
    except Exception:
     pass
    return result




@router.post("/calculate/roi")
def roi(data: ROIRequest):

    result = calculate_roi(
        investment=data.investment,
        monthly_revenue=data.monthly_revenue,
        monthly_cost=data.monthly_cost,
    )
    try:
        record_tool("roi_calculator")
    except:
       pass
    return result


@router.post("/check/compliance")
def compliance(data: ComplianceRequest):

    result = check_compliance(
        drone_weight_kg=data.drone_weight_kg,
        intended_use=data.intended_use,
        location=data.location,
    )
    try:
        record_tool("compliance_checker")
    except:
       pass
    return result


@router.post("/recommend/drone")
def recommend(data: DroneRecommendationRequest):

    result = select_drones(
        use_case=data.use_case,
        budget_inr=data.budget_inr,
        min_flight_time=data.min_flight_time,
    )
    try:
        record_tool("drone_selection_assistant")
    except:
       pass
    return result