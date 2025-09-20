from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uuid
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from omr_pipeline import process_image_bytes

app = FastAPI(title="OMR Hackathon PoC")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

@app.get("/")
async def read_index():
    return FileResponse('static/index.html')

@app.post("/upload")
async def upload(image: UploadFile = File(...)):
    data = await image.read()
    sheet_id = str(uuid.uuid4())
    result = process_image_bytes(data, sheet_id=sheet_id)
    return JSONResponse(result)

# For local dev: uvicorn src.app:app --reload --host 0.0.0.0 --port 8000