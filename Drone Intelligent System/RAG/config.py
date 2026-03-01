# =========================
# DATA PATHS
# =========================

DATA_PATHS = [
    "Data/Structured",
    "Data/Synthetic"
]

# =========================
# VECTOR DATABASE
# =========================

CHROMA_PATH = "RAG/chroma_db"

# =========================
# EMBEDDING SETTINGS
# =========================

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# =========================
# RETRIEVAL SETTINGS
# =========================

TOP_K_RESULTS = 4

# =========================
# LLM SETTINGS
# =========================

GROQ_MODEL = "llama-3.1-8b-instant"
TEMPERATURE = 0.2