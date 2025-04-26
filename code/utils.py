"""
!!!Types for the hotels:

A) What we get from Check24
dict[str, dict[str, object]]
Ein dictionary, welches name des Hotels auf ein weiteres dict mapped, welches feature name auf feature value mapped.
Beispiel: {
    "hotel1": {
        "bathrooms": 4
        }
}

B) What we get from ChatGPT
dict[str, object] with the following keys:
    status: str,
    features: Dict[str, dict[str, object]]

features is a dict with the following keys:
    value: object
    importance: int

Example:
    {
    "status": "success",
    "features":
        {
            'rating':
                {'value': '>9.3', 'importance': 100},
            'price':
                {'value': '<40', 'importance': 70}
        }
    }
"""

def check24_to_list(dict_input: dict[str, dict[str, object]]):
    """
    Formats the hotel dict from check24 to a list of dicts
    and sorts them by their ltr_score

    Args:
        dict_input (dict): Input as dict.

    Returns:
        hotel_list (list): List of hotels as dicts.
    """
    hotel_list = []
    for hotel in dict_input.values():
        hotel_list.append(hotel)
    hotel_list.sort(key=lambda x: x.get("ltr_score"), reverse=True)
    return hotel_list


def chatGPT_to_list(dict_input: dict[str, object]):
    """
    Formats the dict from check24 to one of two list of tuples,
    depending on whether its a hard or soft requirement
    Args:
        dict_input (dict): Input as dict.

    Returns:
        hard_list: List of attributes with importance = 10.
        soft_list: List of remaining attributes ordered by importance.
    """
    soft_list = []
    hard_list = []

    dict_input = dict_input.get("features")
    dict_input = {key: (value['value'], value['importance']) for key, value in dict_input.items()}

    for name, (value, importance) in dict_input.items():
        if (importance == 10):
            hard_list.append((name, value))
        else:
            soft_list.append((name, value, importance))

    return hard_list, soft_list
