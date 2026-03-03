import sys
sys.path.append(".")

from RAG.retriever import get_retriever
from RAG.llm import generate_answer


def generate_tool_response(question, tool_result):
    """
    Combines tool output with RAG knowledge.
    """

    retriever = get_retriever()

    if retriever is None:
        return "Knowledge system unavailable to explain results."

    docs = retriever.invoke(question) or []

    MAX_CONTEXT_DOCS = 5
    context = "\n\n".join(
        doc.page_content for doc in docs[:MAX_CONTEXT_DOCS]
    )

    tool_result = str(tool_result)

    prompt_question = f"""
The system calculated the following result:

{tool_result}

Using the drone knowledge context below,
explain this result clearly for the user.

Provide:
- Meaning of the result
- Business interpretation
- Practical insights

User Question:
{question}
"""

    return generate_answer(prompt_question, context)