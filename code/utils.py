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

import sys
from typing import List, Dict, Any, Tuple, Set, Optional

# --- Type Definitions based on your description ---

# Type A: Data structure from Check24
# Dict mapping hotel name (str) to its feature dictionary (Dict[str, Any])
Check24HotelData = Dict[str, Dict[str, Any]]

# Type representing the inner 'features' dictionary from the Gemini/ChatGPT response,
# AFTER Pydantic validation. It maps feature name (str) to a FeatureDetail-like object.
# We use 'Any' here for the value object type if FeatureDetail class isn't imported/available,
# but we know it *must* have '.value' and '.importance' attributes.
GptFeaturesDict = Dict[str, Any] # Or Dict[str, FeatureDetail] if the class is imported

# Represents a single hotel's data dictionary
HotelDict = Dict[str, Any]

# Represents the hard requirements list: [(feature_name, feature_value), ...]
HardRequirementsList = List[Tuple[str, Any]]

# Represents the soft requirements list: [(feature_name, feature_value, importance), ...]
SoftRequirementsList = List[Tuple[str, Any, int]]


# --- Corrected Functions ---

def check24_to_list(dict_input: Optional[Check24HotelData]) -> List[HotelDict]:
    """
    Extracts hotel data dictionaries from the Check24 input structure,
    formats them into a list, and sorts the list by 'ltr_score' (descending).

    Args:
        dict_input: Input dictionary mapping hotel names to their feature dictionaries,
                    or None.

    Returns:
        A list of hotel data dictionaries, sorted by 'ltr_score' in descending
        order. Returns an empty list if input is None or empty.
    """
    hotel_list: List[HotelDict] = []
    if not dict_input:
        return hotel_list

    for hotel_data in dict_input.values():
        # Ensure the value is actually a dictionary before appending
        if isinstance(hotel_data, dict):
            hotel_list.append(hotel_data)
        else:
            # Optional: Log a warning or handle unexpected data structure
            print(f"Warning: Unexpected data type found in check24_to_list input values: {type(hotel_data)}", file=sys.stderr)


    # Sort by 'ltr_score'. Use get() for safety; hotels without the score
    # will have None, typically sorting to the beginning (or end if reverse=True).
    # Define a default value (e.g., negative infinity or 0) if specific handling
    # for missing scores is needed beyond default None sorting.
    try:
        hotel_list.sort(key=lambda x: x.get("ltr_score", -1), reverse=True) # Using -1 as default if score missing
    except TypeError:
        # Handle cases where ltr_score values are not comparable (e.g., mixing numbers and strings)
        print(f"Warning: Could not sort hotels by 'ltr_score' due to incompatible types.", file=sys.stderr)
        # Optionally return the unsorted list or try a different sorting approach
        # return hotel_list # Return unsorted if sorting fails

    return hotel_list


def chatGPT_to_list(dict_input: Optional[GptFeaturesDict]) -> Tuple[HardRequirementsList, SoftRequirementsList]:
    """
    Separates features from a Gemini/ChatGPT features dictionary (post-validation)
    into hard (importance=10) and soft requirements lists.

    Assumes the input dictionary maps feature names (str) to objects
    that have '.value' and '.importance' attributes (like the FeatureDetail Pydantic model).

    Args:
        dict_input: The dictionary containing extracted feature details (feature_name -> feature_object),
                     or None. This is typically the value of the 'features' key from
                     the validated Gemini/ChatGPT response.

    Returns:
        A tuple containing:
        - hard_list: List of tuples `(key, value)` for features with importance = 10.
        - soft_list: List of tuples `(key, value, importance)` for other features.
        Returns ([], []) if input is None or empty.
    """
    soft_list: SoftRequirementsList = []
    hard_list: HardRequirementsList = []

    if not dict_input:
        return hard_list, soft_list

    for key, feature_detail in dict_input.items():
        # Use dot notation to access attributes of the feature_detail object
        try:
            importance = int(feature_detail.importance) # Ensure importance is int
            value = feature_detail.value

            if importance == 10:
                hard_list.append((key, value))
            else:
                soft_list.append((key, value, importance))
        except AttributeError:
            print(f"Warning: Item '{key}' in chatGPT_to_list input dictionary is missing 'value' or 'importance' attribute.", file=sys.stderr)
        except (ValueError, TypeError):
             print(f"Warning: Could not convert importance ('{feature_detail.importance}') to int for key '{key}'.", file=sys.stderr)


    return hard_list, soft_list


def check24_to_attribute_list(dict_input: Optional[Check24HotelData]) -> List[str]:
    """
    Extracts a unique list of all attribute names present across all hotels
    in the Check24 data structure.

    Args:
        dict_input: Input dictionary mapping hotel names to their feature dictionaries,
                    or None.

    Returns:
        A list of unique attribute names found in the hotel data.
        Returns an empty list if input is None or empty.
    """
    attributes: Set[str] = set()
    if not dict_input:
        return []

    for hotel_name, hotel_data in dict_input.items():
         # Ensure the value associated with the hotel name is a dictionary
        if isinstance(hotel_data, dict):
             attributes.update(hotel_data.keys())
        else:
            # Optional: Log a warning or handle unexpected data structure
            print(f"Warning: Unexpected data type for hotel '{hotel_name}' in check24_to_attribute_list: {type(hotel_data)}", file=sys.stderr)


    return sorted(list(attributes)) # Return sorted list for consistency