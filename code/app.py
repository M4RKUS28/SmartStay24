from openai import AzureOpenAI
import json
import os
from query_to_json import query_to_dict
from dotenv import load_dotenv

# Load the environment variables from .env file
load_dotenv(dotenv_path="../.env")

# Initialize the Azure OpenAI client
client = AzureOpenAI(
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
    api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
    api_version="2025-01-01-preview"  # As specified in your project description
)


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
    dream_hotel = query_to_dict(client, query)
    print(dream_hotel)

    # TODO: Implement the logic to find matching hotels based on the query.

    # ( Step 1: Check if the query is related to hotels. Do this in Step 2 )
    # Step 2: Convert user query to standard JSON format.
    # Step 3: Use Information to filter hotels.
    # Step 4: Use AI to rank existing hotels.
    # Step 5: Return the list of hotel names that match the query.

if __name__ == '__main__':
    find_matching_hotels("Find me a hotel with rating at least 9.3 and should ideally be cheaper than 40 EUR per night.", None)
