import sys
sys.path.append(".")

import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

if not API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env")

client = Groq(api_key=API_KEY)


def generate_answer(question, context):

    if not context or not context.strip():
        return "Information unavailable in knowledge base."

    SAFE_CONTEXT = context[:12000]

    system_prompt = """
        You are an expert AI assistant for India's Drone Intelligence System.

        Rules:
        - Answer ONLY using provided context.
        - If context is insufficient, say information is unavailable.
        - Provide structured, detailed explanations.
        - Use bullet points and clear sections.
        """

    user_prompt = f"""
        Context:
        {SAFE_CONTEXT}

        Question:
        {question}
        """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
            max_tokens=800
        )

        if not response.choices:
            return "⚠️ No response generated."

        return response.choices[0].message.content or "⚠️ Empty response."

    except Exception as e:
        print("LLM Connection Error:", e)
        return "⚠️ AI service temporarily unavailable. Please try again."