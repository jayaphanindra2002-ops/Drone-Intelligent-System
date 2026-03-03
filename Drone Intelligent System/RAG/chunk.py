import sys
sys.path.append(".")

from langchain_text_splitters import RecursiveCharacterTextSplitter
from RAG.document_loader import load_documents


def chunk_documents():
    print("Loading documents...")
    documents = load_documents()

    print(f"Loaded {len(documents)} documents")

    if not documents:
        print("⚠️ No documents found for chunking.")
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        length_function=len
    )

    try:
        chunks = splitter.split_documents(documents)
    except Exception as e:
        print(f"❌ Chunking failed: {e}")
        return []

    print(f"Created {len(chunks)} chunks")

    return chunks


if __name__ == "__main__":
    chunks = chunk_documents()
    print("\n✅ Chunking completed successfully\n")