from typing import Tuple, Any
from pydantic import BaseModel

class HotelFeatures(BaseModel):
    status: str
    features: dict[str, Tuple[object, int]]

# Systemnachricht, die das JSON-Format strikt vorgibt
system_message_user_prompt_to_standard_json = {
    "role": "system",
    "content": (
        "Du bist ein JSON-API-Responder. "
        "Antworten müssen ausschließlich als *gültiges JSON* im folgenden Format erfolgen:\n\n"
        "{\n"
        '  "status": "success" | "error",\n'
        '  "data": { ... dynamisch ... }\n'
        "}\n\n"
        "Gib *nichts außerhalb* dieses JSON zurück. Keine Kommentare, keine Erklärungen. "
        "Falls ein Fehler auftritt, gib nur zurück: {\"status\": \"error\"}"
    )
}
