def calculate_roi(investment, monthly_revenue, monthly_cost):

    # Ensure numeric types
    investment = float(investment)
    monthly_revenue = float(monthly_revenue)
    monthly_cost = float(monthly_cost)

    monthly_profit = monthly_revenue - monthly_cost
    yearly_profit = monthly_profit * 12

    roi_percent = (yearly_profit / investment) * 100 if investment > 0 else 0

    break_even_months = (
        investment / monthly_profit
        if monthly_profit > 0 else float("inf")
    )

    return {
        "roi_percent": round(roi_percent, 2),
        "break_even_months": (
            round(break_even_months, 1)
            if break_even_months != float("inf")
            else "Not achievable"
        )
    }


if __name__ == "__main__":
    result = calculate_roi(
        investment=800000,
        monthly_revenue=120000,
        monthly_cost=40000
    )

    print(result)