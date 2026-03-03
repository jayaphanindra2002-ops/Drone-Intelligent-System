import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from pypdf import PdfReader

CHROMA_PATH = "RAG/chroma_db"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

router = APIRouter()


@router.post("/upload/")
async def upload_document(file: UploadFile = File(...)):

    try:
        if not file.filename.endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files supported in professional upload mode."
            )

        # -------------------------
        # Extract text from PDF
        # -------------------------
        reader = PdfReader(file.file)
        full_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"

        if not full_text.strip():
            raise HTTPException(
                status_code=400,
                detail="PDF contains no extractable text."
            )

        # -------------------------
        # Convert to LangChain Document
        # -------------------------
        document = Document(
            page_content=full_text,
            metadata={"source": file.filename}
        )

        # -------------------------
        # Chunk the document
        # -------------------------
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )

        chunks = splitter.split_documents([document])

        # -------------------------
        # Load existing Chroma DB
        # -------------------------
        embeddings = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL
        )

        db = Chroma(
            persist_directory=CHROMA_PATH,
            embedding_function=embeddings
        )

        # -------------------------
        # Add new documents
        # -------------------------
        db.add_documents(chunks)
        db.persist()

        return {
            "message": "PDF processed and injected into vector DB successfully.",
            "chunks_added": len(chunks)
        }

    except HTTPException:
        raise

    except Exception as e:
        print("UPLOAD ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail="Upload failed"
        )