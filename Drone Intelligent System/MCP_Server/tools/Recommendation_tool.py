
def recommend_drone(use_case: str):
    """
    Simple rule-based recommendation engine.
    Can later be upgraded using dataset lookup.
    """

    use_case = use_case.lower()

    if "agriculture" in use_case or "spray" in use_case:
        return {
            "category": "Agriculture Drone",
            "payload_capacity": "10–20 kg",
            "flight_time": "20–40 minutes",
            "example_application": "Crop spraying & monitoring"
        }

    elif "surveillance" in use_case or "security" in use_case:
        return {
            "category": "Surveillance Drone",
            "payload_capacity": "Camera payload",
            "flight_time": "30–60 minutes",
            "example_application": "Area monitoring & security patrol"
        }

    elif "delivery" in use_case or "logistics" in use_case:
        return {
            "category": "Delivery Drone",
            "payload_capacity": "2–5 kg",
            "flight_time": "15–30 minutes",
            "example_application": "Medical & parcel delivery"
        }

    else:
        return {
            "category": "General Purpose Drone",
            "payload_capacity": "Light payload",
            "flight_time": "20–30 minutes",
            "example_application": "Inspection & photography"
        }


if __name__ == "__main__":
    print(recommend_drone("agriculture spraying"))