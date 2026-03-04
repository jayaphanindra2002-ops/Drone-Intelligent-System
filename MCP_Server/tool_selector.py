import sys
sys.path.append(".")

import os
import json
from dotenv import load_dotenv
from groq import Groq
from MCP_Server.tool_registry import get_available_tools

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

if not API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env")

client = Groq(api_key=API_KEY)

def select_tool(question: str):
    """
    LLM decides whether a tool is needed.
    Always returns a valid registered tool or 'none'.
    """

    tools = get_available_tools()

    # Convert registry into readable list
    tool_descriptions = "\n".join(
        f"- {name}: {tool['description']}"
        for name, tool in tools.items()
    )

    prompt = f"""
You are an AI system deciding whether a calculation tool is required.

Available Tools:
{tool_descriptions}

User Question:
{question}

Return ONLY valid JSON:

{{
  "tool": "<tool_name or none>"
}}

Rules:
- Choose a tool ONLY if calculation or action is required.
- If the question is informational, return "none".
- Tool name MUST match exactly from the available tools.
- Never invent tool names.
- Output JSON only.
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )

        if not response.choices:
            return "none"

        content = (response.choices[0].message.content or "").strip()

        # Remove markdown wrappers
        cleaned = content.replace("```json", "").replace("```", "").strip()

        data = json.loads(cleaned)
        selected_tool = data.get("tool", "none")

        # ✅ Validate against registry
        valid_tools = list(tools.keys()) + ["none"]

        if selected_tool not in valid_tools:
            print("Invalid tool predicted:", selected_tool)
            return "none"

        return selected_tool

    except Exception as e:
        print("Tool selection failed:", e)
        return "none"


if __name__ == "__main__":
    print(select_tool("Calculate ROI for drone costing 10 lakh"))
    print(select_tool("What are drone regulations in India?"))