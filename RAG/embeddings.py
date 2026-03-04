import sys
sys.path.append(".")

from langchain_community.embeddings import HuggingFaceEmbeddings
from RAG.chunk import chunk_documents

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


def create_embeddings():
    print("Creating embeddings model...")

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    print("Loading chunks...")
    chunks = chunk_documents() or []

    if not chunks:
        print("⚠️ No chunks generated. Check chunking pipeline.")

    print(f"Total chunks ready for embedding: {len(chunks)}")

    return embeddings, chunks


if __name__ == "__main__":
    embeddings, chunks = create_embeddings()
    print("\n✅ Embedding model ready\n")