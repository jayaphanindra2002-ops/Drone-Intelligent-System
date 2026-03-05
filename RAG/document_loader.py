import os
import json
from langchain_core.documents import Document


DATA_PATHS = [
    "Data/Structured",
    "Data/Synthetic"
]


def load_documents():
    documents = []

    for data_path in DATA_PATHS:
        if not os.path.exists(data_path):
            continue

        for root, _, files in os.walk(data_path):
            for file in files:

                if not file.endswith(".json"):
                    continue

                file_path = os.path.join(root, file)

                with open(file_path, "r", encoding="utf-8") as f:
                    try:
                        data = json.load(f)
                    except Exception as e:
                        print(f"⚠️ Skipping invalid JSON: {file_path} | {e}")
                        continue

                metadata = {
                    "source": file,
                    "path": file_path,
                    "category": os.path.basename(root) or "unknown"
                }

                if isinstance(data, list):
                    for record in data:
                        documents.append(
                            Document(
                                page_content=json.dumps(record, indent=2),
                                metadata=metadata
                            )
                        )
                else:
                    documents.append(
                        Document(
                            page_content=json.dumps(data, indent=2),
                            metadata=metadata
                        )
                    )

    if not documents:
        print("⚠️ No documents loaded for RAG.")

    return documents


if __name__ == "__main__":
    docs = load_documents()
    print(f"\n✅ Loaded {len(docs)} documents into RAG\n")