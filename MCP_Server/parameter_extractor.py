import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ---------------------------------------------------
# GENERIC LLM JSON EXTRACTOR
# ---------------------------------------------------
def llm_extract(prompt: str, fallback: dict):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "Return ONLY valid JSON. No explanation. No text outside JSON."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0,
        )

        content = response.choices[0].message.content.strip()

        # remove markdown code blocks if LLM adds them
        content = content.replace("```json", "").replace("```", "").strip()

        return json.loads(content)

    except Exception as e:
        print("Extraction failed:", e)
        print("Raw LLM output:", content if 'content' in locals() else "None")
        return fallback

# ---------------------------------------------------
# ROI PARAMETERS
# ---------------------------------------------------
def extract_roi_parameters(question: str):

    prompt = f"""
Extract ROI calculation parameters.

Return ONLY JSON:

{{
    "investment": number,
    "monthly_revenue": number,
    "monthly_cost": number
}}

Convert:
- lakh = 100000
- k = 1000

Question:
{question}
"""

    fallback = {
        "investment": 800000,
        "monthly_revenue": 120000,
        "monthly_cost": 40000,
    }

    return llm_extract(prompt, fallback)


# ---------------------------------------------------
# FLIGHT TIME PARAMETERS
# ---------------------------------------------------
def extract_flight_parameters(question: str):

    prompt = f"""
Extract drone flight calculation parameters.

Return ONLY JSON:

{{
  "battery_capacity_wh": number,
  "drone_weight_kg": number,
  "payload_weight_kg": number,
  "weather_condition": "clear|windy|rainy|hot"
}}

Question:
{question}
"""

    fallback = {
        "battery_capacity_wh": 600,
        "drone_weight_kg": 5,
        "payload_weight_kg": 2,
        "weather_condition": "clear",
    }

    return llm_extract(prompt, fallback)


# ---------------------------------------------------
# COMPLIANCE PARAMETERS
# ---------------------------------------------------
def extract_compliance_parameters(question: str):

    prompt = f"""
Extract drone compliance parameters.

Return ONLY JSON:

{{
  "drone_weight_kg": number,
  "intended_use": string,
  "location": string
}}

Question:
{question}
"""

    fallback = {
        "drone_weight_kg": 5,
        "intended_use": "commercial",
        "location": "urban area",
    }

    return llm_extract(prompt, fallback)


# ---------------------------------------------------
# DRONE RECOMMENDATION PARAMETERS
# ---------------------------------------------------
def extract_recommendation_parameters(question: str):

    prompt = f"""
Extract drone recommendation parameters.

Return ONLY JSON:

{{
  "use_case": string,
  "budget_inr": number,
  "min_flight_time": number
}}

Question:
{question}
"""

    fallback = {
        "use_case": "agriculture",
        "budget_inr": 1000000,
        "min_flight_time": 20,
    }

    return llm_extract(prompt, fallback)