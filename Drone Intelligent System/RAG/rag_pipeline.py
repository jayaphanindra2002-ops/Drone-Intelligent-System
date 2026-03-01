from RAG.retriever import get_retriever
from RAG.llm import generate_answer


def ask_question(question):

    retriever = get_retriever()

    docs = retriever.invoke(question)

    # ---------- Build Context ----------
    context = "\n\n".join([doc.page_content for doc in docs])

    # ---------- Collect Citations ----------
    sources = list(
        set(
            doc.metadata.get("source", "unknown")
            for doc in docs
        )
    )

    # ---------- Generate Answer ----------
    answer = generate_answer(question, context)

    # ---------- Attach Citations ----------
    citation_text = "\n\nSources:\n"
    for i, src in enumerate(sources, start=1):
        citation_text += f"{i}. {src}\n"

    final_response = answer + citation_text

    return final_response


if __name__ == "__main__":
    query = "What are drone regulations in India?"

    response = ask_question(query)

    print("\n🧠 AI Answer:\n")
    print(response)