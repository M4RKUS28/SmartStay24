import json
import time
from code.gpt_utils import HotelFeatures, system_message_user_prompt_to_standard_json
from typing import List


def query_to_dict(client, user_query: str, att_list: List[str]) -> dict[str, str]:
    """
    Convert user message to standard JSON format.
    """
    # gpt-4o-mini-0718-eu
    # o3-mini-0131-eu
    # gpt-4o-0806-eu

    start = time.time()
    try:
        #response = client.beta.chat.completions.parse(
        #    model="gpt-4o-0806-eu",
        #    messages=[
        #        system_message_user_prompt_to_standard_json(att_list),
        #        {"role": "user", "content": user_query},
        #    ],
        #    response_format=HotelFeatures,
        #    temperature=0,
        #)

        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents="system_message: " + str( system_message_user_prompt_to_standard_json(att_list)) + "\n" + "user_message: " + user_query,
            config={
                'response_mime_type': 'application/json',
                'response_schema': HotelFeatures,
            },
        )
    except Exception as e:
        print(e)
        return None
    end = time.time()

    # print(f"ChatGPT thought for {end-start} seconds.")

    try:
        # Parse the response to extract the JSON content
        # openai: json_response = json.loads(response.choices[0].message.content)
        # gemni
        json_response = response.text
        if json_response.get("status") == "success":
            return json_response.get("features", {})
        else:
            # Handle the case where the response indicates an error
            return None
    except json.JSONDecodeError:
        # Handle the case where the response is not valid JSON
        return None
