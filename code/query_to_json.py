import json
from system_messages import system_message_user_prompt_to_standard_json



def get_standard_json_from_user_message(client, user_query: str) -> dict[str, str]:
    """
    Convert user message to standard JSON format.
    """
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            system_message_user_prompt_to_standard_json,
            { "role": "user", "content": user_query }
        ],
        stream=False,
    )
    try:
        # Parse the response to extract the JSON content
        json_response = json.loads(response.choices[0].message.content)
        if json_response.get("status") == "success":
            return json_response.get("data", {})
        else:
            # Handle the case where the response indicates an error
            return {
                "status": "error",
                "data": {
                    "message": "Error in response from OpenAI."
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

