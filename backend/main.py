"""Backend code for the FastAPI application."""
import os
from code.app import find_matching_hotels
from fastapi import FastAPI
from backend.models import MessageRequest
import pandas as pd



app = FastAPI()
df = pd.read_parquet("./data/hotels/resultlist_Kopenhagen.parquet")



# POST endpoint to receive and store messages
@app.post("/query")
def add_message(message: MessageRequest):
    """
    Endpoint to receive a message and return matching hotels.
    """
   
    # Step 2: Convert it to the desired dict format.
    hotels_dict = {}

    for _, row in df.iterrows():
        hotel_name = row["hotel_name"]
        # Drop the 'name' from the values dictionary if you don't want it repeated
        row_dict = row.to_dict()
        hotels_dict[hotel_name] = row_dict

    # hotels_dict is now in your format
    hotels = find_matching_hotels(message.query, hotels_dict)

    if hotels is not None:
        print(f"Amount of Hotels found: {len(hotels)}")

    if hotels is None:
        print("No hotels found.")
        return {"message": "No hotels found."}
    
    # Return the hotels found
    print("Hotels found.")
    return {"message": hotels}


@app.get("/")
def read_root():
    """
    Root endpoint to check if the server is running.
    """
    return {"Hello": "World"}

