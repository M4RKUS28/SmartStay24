import json
import time
from typing import List

from gpt_utils import system_message_user_prompt_to_standard_json, HotelFeatures


def query_to_dict(client, user_query: str, att_list: List[str]) -> dict[str, str]:
    """
    Convert user message to standard JSON format.
    """
    #gpt-4o-mini-0718-eu
    #o3-mini-0131-eu
    #gpt-4o-0806-eu

    start = time.time()
    response = client.beta.chat.completions.parse(
        model="gpt-4o-0806-eu",
        messages=[
            system_message_user_prompt_to_standard_json(att_list),
            { "role": "user", "content": user_query }
        ],
        response_format = HotelFeatures,
    )
    end = time.time()

    print(f"ChatGPT thought for {end-start} seconds.")

    try:
        # Parse the response to extract the JSON content
        json_response = json.loads(response.choices[0].message.content)
        if json_response.get("status") == "success":
            return json_response.get("features", {})
        else:
            # Handle the case where the response indicates an error
            return {
                "status": "error",
                "features": {
                    "message": "This is not a valid hotel request"
                }
            }
    except json.JSONDecodeError:
        # Handle the case where the response is not valid JSON
        return {
            "status": "error",
            "data": {
                "message": "Invalid JSON response from OpenAI."
            }
        }

