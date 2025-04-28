import json
import time
from code.gpt_utils import HotelFeatures, system_message_user_prompt_to_standard_json
from typing import List
from typing import Any, Dict, Optional, List

from code.gpt_utils import FeatureDetail


from google import generativeai as genai # Use alias for clarity
from google.generativeai.types import GenerationConfig


def query_to_dict(model: genai.GenerativeModel, user_query: str, att_list: List[str]) -> Optional[Dict[str, FeatureDetail]]:
    """
    Convert user message to a dictionary of extracted features using Gemini.
    """
    start = time.time()
    try:
        schema = HotelFeatures.model_json_schema()
    except Exception as e:
        print(f"Error generating JSON schema from Pydantic model: {e}")
        return None

    system_prompt = system_message_user_prompt_to_standard_json(att_list)
    full_prompt = f"System Prompt:\n{system_prompt}\n\nUser Query:\n{user_query}"

    try:
        # *** Use the 'model' object passed in ***
        response = model.generate_content(
            contents=full_prompt,
            generation_config=GenerationConfig(
                response_mime_type='application/json',
                response_schema=schema
            ),
        )
        # ... (rest of the function remains the same as the previous correct version) ...

        end = time.time()
        print(f"Gemini API call took {end - start:.2f} seconds.")
        print("Raw Gemini response text:", response.text)

        try:
            raw_json = json.loads(response.text)
            print("Raw JSON parsed:", raw_json)
            parsed_response = HotelFeatures.model_validate(raw_json)
            print("Pydantic validated response:", parsed_response)

            if parsed_response.status == "success":
                return parsed_response.features
            else:
                print(f"Extraction status was '{parsed_response.status}'. No features returned.")
                return None

        except json.JSONDecodeError as e:
            print(f"Failed to decode Gemini response into JSON: {e}")
            print("Raw response was:", response.text)
            return None
        except Exception as pydantic_error:
             print(f"Gemini response did not match Pydantic schema: {pydantic_error}")
             print("Raw JSON was:", raw_json)
             return None

    except Exception as e:
        print(f"An error occurred during the Gemini API call or processing: {e}")
        return None