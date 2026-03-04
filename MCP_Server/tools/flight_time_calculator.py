def calculate_flight_time(
    battery_capacity_wh,
    drone_weight_kg,
    payload_weight_kg,
    weather_condition="clear",
):
    """
    Estimate drone flight time and range.
    """

    # ---- Input Safety ----
    battery_capacity_wh = float(battery_capacity_wh)
    drone_weight_kg = float(drone_weight_kg)
    payload_weight_kg = float(payload_weight_kg)
    weather_condition = str(weather_condition).lower()

    drone_weight_kg = max(drone_weight_kg, 0.1)
    payload_weight_kg = max(payload_weight_kg, 0)
    battery_capacity_wh = max(battery_capacity_wh, 10)

    # -----------------------------
    # Base assumptions
    # -----------------------------
    base_efficiency = 12  # minutes per 100Wh for light drone

    total_weight = drone_weight_kg + payload_weight_kg

    # Weight penalty
    weight_factor = 1 + (total_weight * 0.15)

    # Weather impact
    weather_factors = {
        "clear": 1.0,
        "windy": 1.25,
        "rainy": 1.4,
        "hot": 1.15,
    }

    weather_penalty = weather_factors.get(weather_condition, 1.0)

    # -----------------------------
    # Flight Time Calculation
    # -----------------------------
    estimated_minutes = (
        (battery_capacity_wh / 100) * base_efficiency
    ) / (weight_factor * weather_penalty)

    estimated_minutes = max(5, estimated_minutes)

    # -----------------------------
    # Range Estimation
    # -----------------------------
    avg_speed_kmph = 40

    range_km = (estimated_minutes / 60) * avg_speed_kmph

    # -----------------------------
    # Recommendations
    # -----------------------------
    recommendations = []

    if payload_weight_kg > drone_weight_kg * 0.7:
        recommendations.append(
            "Payload is heavy; consider reducing load."
        )

    if weather_condition in ["windy", "rainy"]:
        recommendations.append(
            "Weather may reduce stability and battery efficiency."
        )

    if estimated_minutes < 15:
        recommendations.append(
            "Consider higher-capacity battery for longer missions."
        )

    if not recommendations:
        recommendations.append("Flight parameters are optimal.")

    return {
        "estimated_flight_time_minutes": round(estimated_minutes, 2),
        "estimated_range_km": round(range_km, 2),
        "recommendations": recommendations,
    }


if __name__ == "__main__":
    result = calculate_flight_time(
        battery_capacity_wh=600,
        drone_weight_kg=5,
        payload_weight_kg=2,
        weather_condition="windy",
    )

    print(result)