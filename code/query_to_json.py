import json
import time
from code.gpt_utils import HotelFeatures, system_message_user_prompt_to_standard_json
from typing import List
from google import genai
from google.generativeai.types import GenerationConfig # For explicit schema passing

def query_to_dict(client: genai.GenerativeModel, user_query: str, att_list: List[str]) -> Optional[Dict[str, FeatureDetail]]:
    """
    Convert user message to a dictionary of extracted features using Gemini.
    """
    start = time.time()

    # 1. Generate the JSON schema explicitly from the Pydantic model
    try:
        schema = HotelFeatures.model_json_schema()
        # Optional: Print the schema to debug if needed
        # print("--- Generated JSON Schema ---")
        # print(json.dumps(schema, indent=2))
        # print("-----------------------------")
    except Exception as e:
        print(f"Error generating JSON schema from Pydantic model: {e}")
        return None

    # 2. Construct the prompt
    system_prompt = system_message_user_prompt_to_standard_json(att_list)
    full_prompt = f"System Prompt:\n{system_prompt}\n\nUser Query:\n{user_query}"


    try:
        # 3. Call the Gemini API with the explicit schema
        response = client.generate_content(
            # Combine system and user prompts as per Gemini's recommended format for structured output
            contents=full_prompt,
            generation_config=GenerationConfig(
                response_mime_type='application/json',
                response_schema=schema # Pass the generated schema dictionary
            ),
            # Consider adding safety_settings if needed
            # safety_settings=...
        )

        end = time.time()
        print(f"Gemini API call took {end - start:.2f} seconds.")

        # Debug: Print raw response text
        print("Raw Gemini response text:", response.text)

        # 4. Parse the response using Pydantic (which automatically validates against the schema)
        # The library should ideally parse based on the schema provided.
        # Accessing response.parts[0].function_call is typical for function calling,
        # but for schema enforcement, response.text should contain the JSON.
        # Let's try parsing the text directly first.

        try:
            # The library *should* have parsed based on the schema if possible,
            # but let's handle the raw text robustly.
            raw_json = json.loads(response.text)
            print("Raw JSON parsed:", raw_json)

            # Validate the raw JSON with our Pydantic model
            parsed_response = HotelFeatures.model_validate(raw_json)
            print("Pydantic validated response:", parsed_response)


            if parsed_response.status == "success":
                return parsed_response.features # Return the features dictionary directly
            else:
                print(f"Extraction status was '{parsed_response.status}'. No features returned.")
                return None # Return None if status is not 'success'

        except json.JSONDecodeError as e:
            print(f"Failed to decode Gemini response into JSON: {e}")
            print("Raw response was:", response.text) # Print again for context
            return None
        except Exception as pydantic_error: # Catch Pydantic validation errors
             print(f"Gemini response did not match Pydantic schema: {pydantic_error}")
             print("Raw JSON was:", raw_json) # Print the JSON that failed validation
             return None


    except Exception as e:
        print(f"An error occurred during the Gemini API call or processing: {e}")
        # You might want to log the full traceback here for debugging
        # import traceback
        # traceback.print_exc()
        return None