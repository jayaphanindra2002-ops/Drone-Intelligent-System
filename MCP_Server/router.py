
import re
from MCP_Server.tool_registry import execute_tool
from RAG.rag_pipeline import ask_question
from MCP_Server.parameter_extractor import extract_roi_parameters
from MCP_Server.response_generator import generate_tool_response
from MCP_Server.tool_selector import select_tool




def is_small_talk(query: str) -> bool:
    """
    Detects conversational / greeting messages
    that should NOT trigger RAG or tools.
    """

    if not query:
        return False

    # normalize text
    q = query.lower().strip()

    # remove punctuation
    q = re.sub(r"[^\w\s]", "", q)

    small_talk_patterns = [
        r"^hi$",
        r"^hello$",
        r"^hey$",
        r"^hi there$",
        r"^hello there$",
        r"^how are you$",
        r"^how r you$",
        r"^good morning$",
        r"^good evening$",
        r"^good afternoon$",
        r"^thanks?$",
        r"^thank you$",
        r"^ok$",
        r"^okay$",
        r"^bye$",
        r"^goodbye$",
    ]

    return any(re.match(pattern, q) for pattern in small_talk_patterns)





def is_out_of_context(query: str) -> bool:
    """
    Detects questions unrelated to drones or aviation domain.
    """

    if not query:
        return True

    q = query.lower().strip()
    q = re.sub(r"[^\w\s]", "", q)

    # Drone domain keywords
    drone_keywords = [
        "drone", "drones", "uav", "uas",
        "flight", "flying", "battery",
        "payload", "dgca", "airspace",
        "regulation", "rules", "compliance",
        "inspection", "mapping",
        "surveillance", "delivery",
        "agriculture", "spraying",
        "roi", "profit", "investment",
        "recommend", "range"
    ]

    # If NONE of domain words appear → out of context
    return not any(keyword in q for keyword in drone_keywords)

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

def extract_parameters(tool_name, question):

    if tool_name == "roi_calculator":
        from MCP_Server.parameter_extractor import extract_roi_parameters
        return extract_roi_parameters(question)

    elif tool_name == "flight_time_calculator":
        from MCP_Server.parameter_extractor import extract_flight_parameters
        return extract_flight_parameters(question)

    elif tool_name == "regulation_compliance_checker":
        from MCP_Server.parameter_extractor import extract_compliance_parameters
        return extract_compliance_parameters(question)

    elif tool_name == "drone_recommender":
        from MCP_Server.parameter_extractor import extract_recommendation_parameters
        params = extract_recommendation_parameters(question)

        # recommender only needs use_case
        return {"use_case": params.get("use_case", "agriculture")}

    return {}

def handle_query(question: str):

    if is_small_talk(question):
        return {
            "answer": "Hello 👋 I'm your Drone Intelligence Assistant. Ask me anything about drones in India!",
            "sources": [],
            "tool_used": None,
            "data": None
        }
    
    if is_out_of_context(question):
        return {
            "answer": (
                "I specialize in India's drone ecosystem 🚁. "
                "Please ask questions related to drones, regulations, ROI, flight operations, or drone business use cases."
            ),
            "sources": [],
            "tool_used": None,
            "data": None
        }
    tool_name = select_tool(question)

    if tool_name and tool_name != "none":
        try:
            params = extract_parameters(tool_name, question)

            result = execute_tool(tool_name, **params)

            explanation = generate_tool_response(question, result)

            return {
                "answer": explanation,
                "tool_used": tool_name,
                "data": result,
                "sources": []
            }

        except Exception as e:
            print("Tool execution error:", e)
            return {
                "answer": "⚠️ Please rephrase your request.If you want better output using tools",
                "tool_used": None,
                "data": None,
                "sources": []
            }
    # RAG PATH
    rag_result = ask_question(question)

    return {
        "answer": rag_result.get("answer"),
        "tool_used": None,
        "data": None,
        "sources": rag_result.get("sources", [])
    }

  


if __name__ == "__main__":

    print("\n--- Tool Example ---")
    print(handle_query("Calculate ROI for drone costing 12 lakh with monthly revenue 1.5 lakh and cost 50k"))

    print("\n--- Tool Example ---")
    print(handle_query("Check compliance for a 5 kg drone used for commercial inspection in urban area"))

    # print("\n--- Tool Example ---")
    # print(handle_query("Estimate flight time for drone with 600Wh battery,5kg drone weight, 2kg payload in windy weather"))


    # print("\n--- RAG Example ---")
    # print(handle_query("What are drone regulations in India?"))