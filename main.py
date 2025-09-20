#!/usr/bin/env python3
"""
Main runner for the OMR FastAPI application.
Run this file to start the server.
"""

import uvicorn
import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

if __name__ == "__main__":
    print("Starting OMR FastAPI Server...")
    print("Server will be available at: http://127.0.0.1:8000")
    print("API documentation at: http://127.0.0.1:8000/docs")
    print("Press Ctrl+C to stop the server")
    
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        reload_dirs=["src"]
    )
