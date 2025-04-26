"""Backend code for the FastAPI application."""
import os
from code.app import find_matching_hotels
from fastapi import FastAPI
from models import MessageRequest


app = FastAPI()

# POST endpoint to receive and store messages
@app.post("/query")
def add_message(message: MessageRequest):
    
   find_matching_hotels(message.query, message.hotels)
    

    return {}