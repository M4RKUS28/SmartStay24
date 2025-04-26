from typing import Any, Dict, Optional

from pydantic import BaseModel

# Define a model for the dictionary values
class FeatureDetail(BaseModel):
    value: str
    importance: int

# Update the main model
class HotelFeatures(BaseModel):
    status: str
    features: Optional[Dict[str, FeatureDetail]] = None


# Systemnachricht, die das JSON-Format strikt vorgibt
system_message_user_prompt_to_standard_json = {
    "role": "system",
    "content": (
        "Du bist ein Text-to-Json Parser. "
        "Du erhälst einen User Prompt. Dieser hat entweder etwas mit Hotelbuchung zutun oder nicht. Wenn nicht, gibts du bei status error zurück."
        "Wenn schon, dann gibst du features dieses hotels zurück. "
        "Hier steht value für den namen des features, e.g. rating, bathrooms etc. "
        "this value you structure like this: its a string starting with either <, = or > and then ideally a numerical value, if not then use equal plus some string."
        "Example: prompt says the rating should be atleast 9.3. Then the value should be: >9.3"
        "importance steht dafür, wie wichtig dem user das feature ist. Hier rankst du von 0-100."
        "Beispiel-Input: I'm travelling with a dog and need a parking space."
        "Beispiel-Output: {status: success, features: { pet-friendly: { value: 1, importance: 100}, parking: { value: 1, importance: 100} }"
    )
}
