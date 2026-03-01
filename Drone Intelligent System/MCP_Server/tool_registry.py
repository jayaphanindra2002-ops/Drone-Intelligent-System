from MCP_Server.tools.ROI import calculate_roi
from MCP_Server.tools.Recommendation_tool import recommend_drone
from MCP_Server.tools.flight_tool import estimate_flight_cost
from MCP_Server.tools.flight_time_calculator import calculate_flight_time
from MCP_Server.tools.compliance_checker import check_compliance
from MCP_Server.tools.drone_selection_assistant import select_drones

TOOLS = {
    "roi_calculator": {
        "name": "roi_calculator",
        "description": (
            "Calculate ROI and break-even period for drone business "
            "based on investment, monthly revenue, and monthly cost."
        ),
        "parameters": [
            "investment",
            "monthly_revenue",
            "monthly_cost"
        ],
        "function": calculate_roi,
    },

    "drone_recommender": {
        "name": "drone_recommender",
        "description": "Recommend drone type based on use case.",
        "parameters": ["use_case"],
        "function": recommend_drone,
    },

    "flight_cost_estimator": {
        "name": "flight_cost_estimator",
        "description": "Estimate drone flight operational cost.",
        "parameters": ["distance_km", "payload_kg"],
        "function": estimate_flight_cost,
    },
    "flight_time_calculator": {
        "name": "flight_time_calculator",
        "description": "Estimate drone flight time and range using battery, weight, payload and weather.",
        "parameters": [
            "battery_capacity_wh",
            "drone_weight_kg",
            "payload_weight_kg",
            "weather_condition",
    ],
    "function": calculate_flight_time,
        },
        "regulation_compliance_checker": {
        "name": "regulation_compliance_checker",
        "description": "Check drone regulatory compliance in India based on drone specs and location.",
        "parameters": [
            "drone_weight_kg",
            "intended_use",
            "location",
    ],
    "function": check_compliance,
        },

        "drone_selection_assistant": {
        "name": "drone_selection_assistant",
        "description": "Recommend drone models based on use case, budget and flight requirements.",
        "parameters": [
            "use_case",
            "budget_inr",
            "min_flight_time"
        ],
        "function": select_drones,
    },
    
}


def get_available_tools():
    return {
        name: {
            "description": tool["description"],
            "parameters": tool["parameters"]
        }
        for name, tool in TOOLS.items()
    }


def execute_tool(tool_name, **kwargs):

    if tool_name not in TOOLS:
        raise ValueError(f"Tool {tool_name} not found")

    tool_function = TOOLS[tool_name]["function"]

    return tool_function(**kwargs)


if __name__ == "__main__":
    result = execute_tool(
        "roi_calculator",
        investment=800000,
        monthly_revenue=120000,
        monthly_cost=40000
    )

    print(result)