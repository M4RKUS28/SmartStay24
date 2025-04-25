from openai import OpenAI
import json
from system_messages import system_message_user_prompt_to_standard_json

client = OpenAI() 

# Beispielhafte Nutzeranfrage
user_message = {
    "role": "user",
    "content": (
        "Gib mir Informationen über drei Programmiersprachen mit Beispielen. "
        "Antworte ausschließlich als JSON gemäß obigem Format."
    )
}

def get_standard_json_from_user_message(user_query: str) -> dict[str, str]:    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            system_message_user_prompt_to_standard_json,
            { "role": "user", "content": user_query }
        ],
        stream=False,
    )

    print(response.choices[0].message.content)


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
                    "distance_to_beach": float,
                    ...
                },
                ...
            }

    Returns:
        list[str] | None: List of hotel_names that match the query, or None if the query is not hotel related.
    """
    # TODO: Implement the logic to find matching hotels based on the query.

    # ( Step 1: Check if the query is related to hotels. Do this in Step 2 )
    # Step 2: Convert user query to standard JSON format.
    # Step 3: Use Information to filter hotels.
    # Step 4: Use AI to rank existing hotels.
    # Step 5: Return the list of hotel names that match the query.
