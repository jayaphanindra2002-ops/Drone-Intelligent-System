import sys
sys.path.append(".")

import os
from langchain_community.vectorstores import Chroma
from RAG.embeddings import create_embeddings

CHROMA_PATH = "RAG/chroma_db"


def build_vector_store():
    print("Preparing embeddings and chunks...")

    embeddings, chunks = create_embeddings()

    if not chunks:
        print("❌ No chunks available. Vector DB not created.")
        return

    os.makedirs(CHROMA_PATH, exist_ok=True)

    print("Creating vector database...")

    db = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_PATH
    )

    db.persist()

    print("\n✅ Vector database created successfully\n")


if __name__ == "__main__":
    build_vector_store()