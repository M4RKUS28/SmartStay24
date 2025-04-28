import json
import os
import sys
from code.dic_to_result import filter_hotels, rank_hotels
from code.query_to_json import query_to_dict
from code.utils import chatGPT_to_list, check24_to_attribute_list, check24_to_list

import pandas as pd
from dotenv import load_dotenv
#from openai import AzureOpenAI
import google.generativeai as genai
from google.generativeai.types import GenerationConfig # For explicit schema passing


# Load the environment variables from .env file..
load_dotenv(dotenv_path=".env")
load_dotenv(dotenv_path="../.env")

# Initialize the Azure OpenAI client
#client = AzureOpenAI(
#    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
#    api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
#    api_version="2025-01-01-preview",  # As specified in your project description
#)


genai.configure(api_key=os.environ.get("API_KEY"))
model_name = "models/gemini-2.5-flash-preview-04-17"
print(f"Using model: {model_name}")

try:
    # *** Get the GenerativeModel instance ***
    client = genai.GenerativeModel(model_name)
except Exception as e:
    print(f"Error initializing model '{model_name}': {e}")
    sys.exit()

def find_matching_hotels_extended(
    query: str, hotels: dict[str, dict[str, object]]
) -> tuple[list[str] | None, list[str], list[str]]:
    """Extended function to find matching hotels based on the given query."""
    att_list = check24_to_attribute_list(hotels)
    dream_hotel = query_to_dict(client, query, att_list)
    if dream_hotel is None:
        return None, None, None

    hotel_list = check24_to_list(hotels)
    hard_list, soft_list = chatGPT_to_list(dream_hotel)
    filtered_hotels = filter_hotels(hotel_list, hard_list)

    ranked_hotels = rank_hotels(filtered_hotels, soft_list)
    return ranked_hotels, hard_list, soft_list


def find_matching_hotels(
    query: str, hotels: dict[str, dict[str, object]]
) -> list[str] | None:
    """
    Find matching hotels based on the given query.

    Args:
        query (str): The search query from the user.
        hotels (dict[str, dict[str, object]]): Dictionary containing hotel information.
            Format: {
                "hotel_name": {
                    "name": str,
                    "rating": float,
                    "distance_to_beach": float,ltr_score
                    ...
                },
                ...
            }

    Returns:
        list[str] | None: List of hotel_names that match the query, or None if the query is not hotel related.
    """
    # check commit
    # Get attribute list
    att_list = check24_to_attribute_list(hotels)
    dream_hotel = query_to_dict(client, query, att_list)
    if dream_hotel is None:
        return None
    #print(dream_hotel)
    hotel_list = check24_to_list(hotels)
    hard_list, soft_list = chatGPT_to_list(dream_hotel)
    #print(f"Hard_List: {hard_list}\n Soft_List: {soft_list}")
    filtered_hotels = filter_hotels(hotel_list, hard_list)
    #print(f"Length of Filtered List: {len(filtered_hotels)}")
    #for hotel in filtered_hotels:
        #print(f"Hotel Name: {hotel['hotel_name']}")
    ranked_hotels = rank_hotels(filtered_hotels, soft_list)
    #print(f"Ranked List: {ranked_hotels}")
    return ranked_hotels

    # TODO: Implement the logic to find matching hotels based on the query.

    # ( Step 1: Check if the query is related to hotels. Do this in Step 2 )
    # Step 2: Convert user query to standard JSON format.
    # Step 3: Use Information to filter hotels.
    # Step 4: Use AI to rank existing hotels.
    # Step 5: Return the list of hotel names that match the query.


if __name__ == "__main__":
    # Step 1: Load the parquet file
    df = pd.read_parquet("./data/hotels/resultlist_Mallorca.parquet")

    # Step 2: Convert it to the desired dict format
    hotels_dict = {}

    for _, row in df.iterrows():
        hotel_name = row["hotel_name"]
        # Drop the 'name' from the values dictionary if you don't want it repeated
        row_dict = row.to_dict()
        hotels_dict[hotel_name] = row_dict

    # hotels_dict is now in your format
    example_queries = [
        "I'm travelling with a dog and need a parking space.",
        "I'm looking for a hotel with a breathtaking view and a luxurious wellness center where I can truly relax.",
        "I'd love to find a family-friendly hotel surrounded by nature, perfect for a peaceful getaway, that also allows an extra bed for children.",
        "Stylish, modern hotel that not only offers great design but also serves an good breakfast.",
        "Find me a hotel with rating at least 9.3 and cheaper than 40 EUR per night.",
        "I want to make a vacation on the beach.",
        "Show me a 5 star hotel",
    ]
    hotels = find_matching_hotels(example_queries[-1], hotels_dict)
    print(hotels)
    if hotels is not None:
        print(f"Amount of Hotels found: {len(hotels)}")
    else:
        print("No hotel query")
