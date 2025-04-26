"""Backend code for the FastAPI application."""
import os
from typing import List, Any, Tuple, Set
from code.app import find_matching_hotels_extended
from fastapi import FastAPI
from backend.models import MessageRequest
import pandas as pd

import math


def build_allowed_keys(list1: List[Tuple[str, Any]], list2: List[Tuple[str, Any, Any]]) -> Set[str]:
    return {k for k, _ in list1} | {k for k, _, _ in list2} | {"name", "price", "rating"}


def clean_nan(obj, allowed_keys: Set[str]):
    if isinstance(obj, dict):
        cleaned = {}
        for k, v in obj.items():
            if k not in allowed_keys:
                continue  # Skip attributes not in allowed set
            cleaned_v = clean_nan(v, allowed_keys)
            cleaned[k] = cleaned_v
        return cleaned
    elif isinstance(obj, list):
        return [clean_nan(v, allowed_keys) for v in obj]
    elif isinstance(obj, float) and math.isnan(obj):
        return None
    else:
        return obj


app = FastAPI()
df_c = pd.read_parquet("./data/hotels/resultlist_Kopenhagen.parquet")
df_m = pd.read_parquet("./data/hotels/resultlist_Mallorca.parquet")
df_n = pd.read_parquet("./data/hotels/resultlist_New York.parquet")

   
# Step 2: Convert it to the desired dict format.
hotels_dict_c = {}
hotels_dict_m = {}
hotels_dict_n = {}


for _, row in df_c.iterrows():
    hotel_name = row["hotel_name"]
    # Drop the 'name' from the values dictionary if you don't want it repeated
    row_dict = row.to_dict()
    hotels_dict_c[hotel_name] = row_dict

for _, row in df_m.iterrows():
    hotel_name = row["hotel_name"]
    # Drop the 'name' from the values dictionary if you don't want it repeated
    row_dict = row.to_dict()
    hotels_dict_m[hotel_name] = row_dict

for _, row in df_n.iterrows():
    hotel_name = row["hotel_name"]
    # Drop the 'name' from the values dictionary if you don't want it repeated
    row_dict = row.to_dict()
    hotels_dict_n[hotel_name] = row_dict


# POST endpoint to receive and store messages
@app.post("/api/query")
def add_message(message: MessageRequest):
    """
    Endpoint to receive a message and return matching hotels.
    """
    hotels_dict = {}
    if message.city == "Copenhagen":
        hotels_dict = hotels_dict_c
    elif message.city == "Mallorca":
        hotels_dict = hotels_dict_m
    elif message.city == "New York":
        hotels_dict = hotels_dict_n

    # hotels_dict is now in your format
    hotels, hard, soft = find_matching_hotels_extended(message.query, hotels_dict)
    # print("Hard:", hard)
    # print("Soft:", soft)

    allowed_keys = build_allowed_keys(hard, soft)
    # print(f"Allowed keys: {allowed_keys}")

    if hotels is not None:
        print(f"Amount of Hotels found: {len(hotels)}")

    if hotels is None:
        print("No hotels found.")
        return {"recommendations": []}
    
    # Return the hotels found

    recom = { "recommendations": [
            clean_nan({
                **hotels_dict.get(name, {}),
                "name": name,  # force this at the end to overwrite
                "price": hotels_dict.get(name).get("pricepernight", -1),
            }, allowed_keys)
            for name in hotels
        ]
    }
    # print(f"Recommendations: {recom}")
    return recom


@app.get("/api/health/")
def read_root():
    """
    Root endpoint to check if the server is running.
    """
    return {"status": "ok"}

