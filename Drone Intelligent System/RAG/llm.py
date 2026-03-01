import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_answer(question, context):

   prompt = f"""
You are an expert AI assistant for India's Drone Intelligence System.

Use ONLY the provided context to answer the question.

Instructions:
- Give a COMPLETE and DETAILED explanation.
- Organize answer using bullet points or sections.
- Include regulations, requirements, permissions, and restrictions if available.
- Do NOT give short answers.
- If multiple rules exist, explain them clearly.

Context:
{context}

Question:
{question}

Detailed Answer:
"""
   response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
   return response.choices[0].message.content