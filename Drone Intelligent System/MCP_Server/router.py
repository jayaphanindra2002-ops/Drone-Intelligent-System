from MCP_Server.tool_registry import execute_tool
from RAG.rag_pipeline import ask_question
from MCP_Server.parameter_extractor import extract_roi_parameters
from MCP_Server.response_generator import generate_tool_response
from MCP_Server.tool_selector import select_tool


def detect_tool_intent(question: str):

    q = question.lower()

    roi_keywords = [
        "roi",
        "return on investment",
        "profit",
        "earnings",
        "business return",
        "break even",
        "investment analysis",
    ]

    if any(word in q for word in roi_keywords):
        return "roi_calculator"

    return None


def handle_query(question: str):

    print("\nSelecting tool using LLM...")

    tool_name = select_tool(question)

    print("Selected Tool:", tool_name)

    # ---------- TOOL PATH ----------
    if tool_name == "roi_calculator":

        params = extract_roi_parameters(question)

        result = execute_tool(
            tool_name,
            investment=params["investment"],
            monthly_revenue=params["monthly_revenue"],
            monthly_cost=params["monthly_cost"],
        )

        return generate_tool_response(question, result)

    # ---------- RAG PATH ----------
    return ask_question(question)


if __name__ == "__main__":

    print("\n--- Tool Example ---")
    print(handle_query("Calculate ROI for drone costing 12 lakh with monthly revenue 1.5 lakh and cost 50k"))

    print("\n--- Tool Example ---")
    print(handle_query("Check compliance for a 5 kg drone used for commercial inspection in urban area"))

    # print("\n--- Tool Example ---")
    # print(handle_query("Estimate flight time for drone with 600Wh battery,5kg drone weight, 2kg payload in windy weather"))


    # print("\n--- RAG Example ---")
    # print(handle_query("What are drone regulations in India?"))