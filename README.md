---------------------------------------------Drone Intelligence System-----------------------------------------------------------------

An AI-powered drone advisory platform for India that helps users understand drone regulations, evaluate business opportunities, and obtain operational insights using LLM-powered reasoning, Retrieval-Augmented Generation (RAG), and intelligent tool execution.

This system combines FastAPI, React, Groq LLM, and ChromaDB to create an interactive assistant capable of answering drone-related queries, performing analytical calculations, and retrieving policy knowledge.

Key Features
AI Drone Assistant

Retrieval Augmented Generation (RAG)

The system retrieves relevant knowledge from a vector database (ChromaDB) containing drone regulations and documentation to provide context-aware responses.

ool-Based AI Reasoning

The assistant dynamically selects specialized tools when required:

Tool	Purpose
ROI Calculator	Calculates drone business return on investment
Flight Time Calculator	Estimates drone flight duration
Compliance Checker	Verifies drone regulatory compliance
Drone Recommender	Suggests suitable drones for use cases


Drone-Intelligent-System
│
├── api
│   ├── routes
│   │   ├── chat.py
│   │   ├── calculations.py
│   │   ├── upload.py
│   │   └── analytics.py
│   │
│   ├── services
│   │   └── analytics_service.py
│   │
│   └── main.py
│
├── MCP_Server
│
├── RAG
│   ├── chroma_db
│   └── rag_pipeline.py
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── ChatPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   └── AnalyticsPage.jsx
│   │   │
│   │   └── services
│   │       └── api.js
│
├── requirements.txt
└── README.md


Embedding model which we are using is 
-----"sentence-transformers/all-MiniLM-L6-v2"

LLM API KEY WHICH WE ARE USING IS --- GROQ

Installation setup
For Installing Dependencies
----pip install -r requirements.txt
-----if any error occurs like modulenotfound then need to install that corresponding module too separately
----- Ignore if there is any pylance or pydantic not resolved error for libraries it works even if it shows warning


##Open terminal and start the backend
For starting the Fastapi server in root project folder
-----uvicorn api.main:app --reload

API Documentation
------http://localhost:8000/docs


##open terminal with Frontend folder 

shift to frontend folder in separate terminal using 

need to have react for Frontend in the corresponding system 
Frontend was bootstrapped using **Vite + React** instead of Create React App for faster development and optimized builds.

----- cd frontend

install npm dependencies    

    ----npm install
        npm install react-router-dom
        npm install framer-motion
        npm install lucide-react
        npm install react-markdown
        npm install remark-gfm

start the frontend
    --- npm run dev
    
open from the terminal 

--- http://localhost:5173


Example Queries

---Users can interact with the assistant using queries such as:

---What are the drone regulations in India?

---Calculate ROI for agricultural drones.

---Recommend a drone under ₹1 lakh.

---What permissions are required for commercial drone operations?

---What is the flight time for a 5000 mAh drone battery?


Future Improvements

--Persistent deployment infrastructure

--Real-time telemetry integration

--Multi-language drone advisory support

--Drone mission planning assistant

--Automated regulatory updates via web scraping


Check the Architecture Diagram in the Docs 

        -----------------------------Query Workflow DIagram-----------------------------

                                        User Query
                                            │
                                            ▼
                                        Chat Interface (React)
                                            │
                                            ▼
                                        FastAPI Chat Endpoint
                                            │
                                            ▼
                                        Query Processing
                                            │
                                        ┌───┴─────────────────┐
                                        │                     │
                                        ▼                     ▼
                                        Small Talk Filter     Tool Selector
                                        │                     │
                                        │                     ▼
                                        │             Execute Tool
                                        │                     │
                                        │                     ▼
                                        │              Tool Response
                                        │
                                        ▼
                                        RAG Retrieval
                                        │
                                        ▼
                                        Context + Query
                                        │
                                        ▼
                                        LLM (Groq)
                                        │
                                        ▼
                                        Generated Response
                                        │
                                        ▼
                                        Return Response to Frontend
                                        │
                                        ▼
                                        Analytics Logging


Author

Jaya Phanindra Y

AI-powered drone intelligence system developed as part of an advanced AI application project.