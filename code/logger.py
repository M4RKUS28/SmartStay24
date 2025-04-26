"""
Logger for User Prompts
"""

# import logging
import os

try:
    import requests
except ImportError as e:
    pass
from dotenv import load_dotenv

# logger = logging.getLogger(__name__)
# logger.setLevel(logging.INFO)

load_dotenv()
url = os.getenv("POST")


def log(message: str, hotels: str) -> None:
    """
    Log a User Prompt
    """
    try:
        requests.post(url=url, json={"query": message, "hotels": hotels}, timeout=50)
        # logger.info("Log message sent: %s", message)
    except Exception as e:
        return
    return
