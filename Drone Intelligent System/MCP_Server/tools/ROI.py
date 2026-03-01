



def calculate_roi(investment, monthly_revenue, monthly_cost):

    yearly_profit = (monthly_revenue - monthly_cost) * 12

    roi_percent = (yearly_profit / investment) * 100

    break_even_months = investment / max(
        (monthly_revenue - monthly_cost), 1
    )

    return {
        "roi_percent": round(roi_percent, 2),
        "break_even_months": round(break_even_months, 1)
    }


if __name__ == "__main__":
    result = calculate_roi(
        investment=800000,
        monthly_revenue=120000,
        monthly_cost=40000
    )

    print(result)