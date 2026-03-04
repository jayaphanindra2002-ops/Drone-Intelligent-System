import sys
sys.path.append(".")
import os
from RAG.vector_store import build_vector_store
from RAG.retriever import get_retriever
from RAG.llm import generate_answer

# ------------------------------------------------
# GLOBAL RETRIEVER CACHE
# ------------------------------------------------
retriever = None



CHROMA_PATH = "RAG/chroma_db"

if not os.path.exists(CHROMA_PATH):
    print("Vector DB not found. Rebuilding...")
    build_vector_store()

def get_cached_retriever():
    global retriever

    if retriever is None:
        print("Loading vector database...")
        retriever = get_retriever()

    return retriever


def ask_question(question):

    # ---------- Retrieve Documents ----------
    retriever_instance = get_cached_retriever()

    if retriever_instance is None:
        return {
            "answer": "Retriever is not available. Please check vector database initialization.",
            "sources": []
        }

    docs = retriever_instance.invoke(question)

    # ---------- Empty Retrieval Protection ----------
    if not docs:
        return {
            "answer": "I couldn't find relevant drone information. Please try rephrasing your question.",
            "sources": []
        }

    # ---------- Build Context ----------
    MAX_CONTEXT_DOCS = 5
    context = "\n\n".join(
        doc.page_content for doc in docs[:MAX_CONTEXT_DOCS]
    )

    # ---------- Collect Citations ----------
    sources = list(
        set(
            (doc.metadata or {}).get("source", "unknown")
            for doc in docs
        )
    )

    # ---------- Generate Answer ----------
    answer = generate_answer(question, context)

    # ---------- Structured Response ----------
    return {
        "answer": answer,
        "sources": sources
    }