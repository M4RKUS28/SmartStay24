"""
Logger for User Prompts
"""
import logging
import os
import requests
from dotenv import load_dotenv

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

load_dotenv()
url = os.getenv("POST")

def log(message: str, hotels: dict[str, dict[str, object]]):
    """
    Log a User Prompt
    """
    requests.post(url=url, json={"query": message, "hotels": hotels}, timeout=50)
    logger.info("Log message sent: %s", message)
    return
