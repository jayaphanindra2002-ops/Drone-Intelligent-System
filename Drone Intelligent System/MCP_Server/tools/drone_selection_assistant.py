DRONE_DATABASE = [
    {
        "model": "DJI Agras T10",
        "category": "Agriculture",
        "price_inr": 900000,
        "payload_kg": 10,
        "flight_time_min": 24,
        "use_cases": ["agriculture", "spraying"],
    },
    {
        "model": "DJI Mavic 3 Enterprise",
        "category": "Surveillance",
        "price_inr": 350000,
        "payload_kg": 1,
        "flight_time_min": 45,
        "use_cases": ["inspection", "surveillance", "mapping"],
    },
    {
        "model": "Skye Air Delivery Drone",
        "category": "Logistics",
        "price_inr": 700000,
        "payload_kg": 5,
        "flight_time_min": 30,
        "use_cases": ["delivery", "logistics"],
    },
    {
        "model": "ideaForge SWITCH UAV",
        "category": "Mapping",
        "price_inr": 1200000,
        "payload_kg": 2,
        "flight_time_min": 60,
        "use_cases": ["survey", "mapping", "defense"],
    },
]


def select_drones(use_case, budget_inr, min_flight_time=20):
    """
    Recommend drones based on requirements.
    """

    use_case = use_case.lower()

    candidates = []

    for drone in DRONE_DATABASE:

        if (
            use_case in drone["use_cases"]
            and drone["price_inr"] <= budget_inr
            and drone["flight_time_min"] >= min_flight_time
        ):
            candidates.append(drone)

    if not candidates:
        return {
            "message": "No drones match requirements. Consider increasing budget or relaxing constraints."
        }

    # Comparison summary
    comparison = [
        {
            "model": d["model"],
            "price_inr": d["price_inr"],
            "payload_kg": d["payload_kg"],
            "flight_time_min": d["flight_time_min"],
        }
        for d in candidates
    ]

    return {
        "recommended_drones": comparison,
        "total_matches": len(comparison),
    }


if __name__ == "__main__":
    result = select_drones(
        use_case="agriculture",
        budget_inr=1000000,
        min_flight_time=20,
    )

    print(result)