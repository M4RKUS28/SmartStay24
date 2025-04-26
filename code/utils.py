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

def dict_to_list(dict_input: dict[str, (str, int)]):
    """
    Filters the JSON data based on ...

    Args:
        dict_input (dict): Input as dict.

    Returns:
        hard_list: List of attributes with importance = 100.
        soft_list: List of remaining attributes ordered by importance.
    """
    soft_list = []
    hard_list = []
    for name, (value, importance) in dict_input.items():
        if (importance == 100):
            hard_list.append((name, value))
        else:
            soft_list.append((name, value, importance))
    #soft_list.sort(key = lambda x: x[2])
    #soft_list = [(name, value) for name, value, _ in soft_list]

    return hard_list, soft_list


attribute_dict = {
    'attr1': ('value1', 100),
    'attr2': ('value2', 50),
    'attr3': ('value3', 20),
    'attr4': ('value4', 100),
    'attr5': ('value5', 75)
}

hard_list, soft_list = dict_to_list(attribute_dict)
for i in hard_list:
    print(i)
print("----------")
for i in soft_list:
    print(i)