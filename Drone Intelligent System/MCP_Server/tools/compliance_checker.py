def classify_drone(weight_kg):
    if weight_kg <= 0.25:
        return "Nano"
    elif weight_kg <= 2:
        return "Micro"
    elif weight_kg <= 25:
        return "Small"
    elif weight_kg <= 150:
        return "Medium"
    else:
        return "Large"


def check_compliance(drone_weight_kg, intended_use, location):
    """
    Checks Indian drone regulation compliance.
    """

    category = classify_drone(drone_weight_kg)

    intended_use = intended_use.lower()
    location = location.lower()

    permits = []
    restrictions = []
    compliance_status = "Compliant"

    # ----------------------------
    # Registration rules
    # ----------------------------
    if category != "Nano":
        permits.append("Drone registration on Digital Sky platform")

    # ----------------------------
    # Commercial usage rules
    # ----------------------------
    if "commercial" in intended_use or "delivery" in intended_use:
        permits.append("Remote Pilot Certificate required")

    # ----------------------------
    # Location restrictions
    # ----------------------------
    restricted_zones = ["airport", "military", "border", "government"]

    if any(zone in location for zone in restricted_zones):
        compliance_status = "Restricted"
        restrictions.append(
            "Operation restricted in controlled airspace."
        )
        permits.append("Special DGCA flight authorization")

    # ----------------------------
    # Heavy drone rules
    # ----------------------------
    if category in ["Medium", "Large"]:
        permits.append("Additional safety clearance required")
        restrictions.append(
            "Higher safety and insurance requirements apply."
        )

    if not restrictions:
        restrictions.append("No major operational restrictions.")

    return {
        "drone_category": category,
        "compliance_status": compliance_status,
        "required_permits": permits,
        "restrictions": restrictions,
    }


if __name__ == "__main__":
    result = check_compliance(
        drone_weight_kg=10,
        intended_use="commercial delivery",
        location="near airport"
    )

    print(result)