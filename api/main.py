import sys
import matplotlib
sys.path.append(".")

matplotlib.use("Agg")

from fastapi import FastAPI
from api.routes.chat import router as chat_router
from api.routes.calculations import router as calc_router
from api.routes.upload import router as upload_router
from api.routes.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Drone Intelligence System API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev mode
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(calc_router)
app.include_router(upload_router)
app.include_router(analytics_router)


@app.get("/")
def root():
    return {"message": "Drone Intelligence System API Running"}