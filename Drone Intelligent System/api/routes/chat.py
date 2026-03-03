from fastapi import APIRouter, HTTPException
from api.models.schemas import ChatRequest, ChatResponse
from api.services.analytics_service import record_chat
from MCP_Server.router import handle_query
import traceback

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):

    try:
        # ------------------------------
        # Process Query
        # ------------------------------
        result = handle_query(request.message)

        if not isinstance(result, dict):
            raise ValueError("Invalid response from query handler")

        response_payload = {
            "answer": result.get("answer", "No response generated."),
            "sources": result.get("sources", []),
            "tool_used": result.get("tool_used"),
            "data": result.get("data")
        }

        # ------------------------------
        # Record analytics (safe)
        # ------------------------------
        try:
            record_chat(
                request.message,
                response_payload["tool_used"]
            )
        except Exception as analytics_error:
            print("Analytics error:", analytics_error)

        return ChatResponse(**response_payload)

    except Exception:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail="AI processing failed"
        )