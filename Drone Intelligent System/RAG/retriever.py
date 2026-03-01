from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

CHROMA_PATH = "RAG/chroma_db"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


def get_retriever():
    print("Loading embedding model...")

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    print("Loading vector database...")

    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )

    retriever = db.as_retriever(
        search_kwargs={"k": 8}
    )

    print("✅ Retriever ready")

    return retriever


def test_retrieval(query):
    retriever = get_retriever()

    print(f"\nQuery: {query}\n")

    results = retriever.invoke(query)

    for i, doc in enumerate(results):
        print(f"\n--- Result {i+1} ---")
        print(doc.page_content[:400])


if __name__ == "__main__":
    test_retrieval("What are drone regulations in India?")