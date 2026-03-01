def estimate_flight_cost(distance_km, payload_kg):
    """
    Estimates operational drone flight cost.
    """

    base_cost_per_km = 50       # INR
    payload_factor = 10 * payload_kg

    total_cost = (distance_km * base_cost_per_km) + payload_factor

    return {
        "distance_km": distance_km,
        "payload_kg": payload_kg,
        "estimated_cost_inr": round(total_cost, 2)
    }


if __name__ == "__main__":
    print(estimate_flight_cost(25, 3))