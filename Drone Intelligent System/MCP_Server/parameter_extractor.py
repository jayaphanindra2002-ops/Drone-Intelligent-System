import os
import json
from dotenv import load_dotenv
from groq import Groq


load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def extract_roi_parameters(question: str):
    """
    Uses LLM to extract ROI parameters from user query.
    Returns structured JSON.
    """

    prompt = f"""
Extract ROI calculation parameters from the user question.

Return ONLY valid JSON with this structure:

{{
    "investment": number,
    "monthly_revenue": number,
    "monthly_cost": number
}}

Rules:
- Convert lakh = 100000
- Convert k = 1000
- If value missing, estimate reasonable default.
- Output JSON only. No explanation.

User Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    content = response.choices[0].message.content.strip()

    try:
        return json.loads(content)
    except Exception:
        print("Extraction failed. Raw output:", content)
        return {
            "investment": 800000,
            "monthly_revenue": 120000,
            "monthly_cost": 40000,
        }


if __name__ == "__main__":
    test = extract_roi_parameters(
        "Calculate ROI for drone costing 10 lakh with revenue 1.2 lakh and cost 40k"
    )

    print(test)