from typing import Optional, List, Dict
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[str] = Field(default_factory=list)
    tool_used: Optional[str] = None
    data: Optional[Dict] = None