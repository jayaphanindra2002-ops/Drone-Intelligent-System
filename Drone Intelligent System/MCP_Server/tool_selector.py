import os
import json
from dotenv import load_dotenv
from groq import Groq
from MCP_Server.tool_registry import get_available_tools

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def select_tool(question: str):
    """
    LLM decides whether a tool is needed.
    """

    tools = get_available_tools()

    prompt = f"""
You are an AI system deciding whether a tool is required.

Available Tools:
{json.dumps(tools, indent=2)}

User Question:
{question}

Return ONLY valid JSON:

{{
  "tool": "<tool_name or none>"
}}

Rules:
- Choose a tool ONLY if calculation/action is required.
- If question is informational, return "none".
- Output JSON only.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    content = response.choices[0].message.content.strip()

    try:
        return json.loads(content)["tool"]
    except Exception:
        print("Tool selection failed:", content)
        return "none"


if __name__ == "__main__":
    print(select_tool("Calculate ROI for drone costing 10 lakh"))
    print(select_tool("What are drone regulations in India?"))