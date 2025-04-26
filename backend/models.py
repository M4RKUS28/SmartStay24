from pydantic import BaseModel


# Pydantic model for request validation
class MessageRequest(BaseModel):
    """ Pydantic model for the request body """
    query: str
    city: str
