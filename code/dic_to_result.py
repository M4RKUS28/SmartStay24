import math


def fulfills_attribute(hotel_dict, filter_attribute, filter_value):
    """
    Checks whether the given hotel satisfies the filter_attribute.

    Args:
        hotel_dict (dict): The hotel data.
        filter_attribute (str): The attribute to filter by.
        filter_value (str): The value the attribute should hold (e.g., "<5", ">9.0", "=Pool", "Restaurant").

    Returns:
        Boolean: True, if the hotel satisfies the attribute.
    """
    hotel_value = hotel_dict.get(filter_attribute)

    # --- Basic Checks --- and     # Handle NaN explicitly if it occurs in your data
    if hotel_value is None or (isinstance(hotel_value, float) and math.isnan(hotel_value)):
        return False

    # --- Parse Operator and Target Value ---
    operator = ""
    target_value_str = filter_value

    if filter_value and filter_value[:1] in ('<', '>', '='):
        operator = filter_value[:1]
        target_value_str = filter_value[1:]

    # --- Perform Comparison ---
    if operator in ("<", ">"):
        try:
            # Numeric comparison required for < and >
            hotel_val_numeric = float(hotel_value)
            target_val_numeric = float(target_value_str)

            if operator == "<":
                return hotel_val_numeric < target_val_numeric
            else: # operator == ">"
                return hotel_val_numeric > target_val_numeric

        except (ValueError, TypeError):
            # If either value isn't a valid float, '<' or '>' comparison fails
            return False

    else: # Operator is '=' or empty (treat empty as '=')
        # Try numeric comparison first, if possible and sensible
        try:
            # Attempt conversion - will raise error if not possible
            hotel_val_numeric = float(hotel_value)
            target_val_numeric = float(target_value_str)

            # If both successfully converted, compare numerically
            # Use tolerance for float equality if needed, but direct == is often ok here
            return hotel_val_numeric == target_val_numeric

        except (ValueError, TypeError):
            # If numeric conversion/comparison fails, fall back to string comparison.
            # This handles cases like amenity="Pool", name="Hotel ABC", or even distance="Near"
            return str(hotel_value) == str(target_value_str)


def filter_hotels(hotels: list[dict[str, object]], hard_list: list[(str, str)]):
    """
    Filters the hotels based on the hard_list

    Args:
        hotels (list): The hotels to be filtered.
        hard_list (list): The specified hard filters.

    Returns:
        list: The filtered hotel list.
    """

    hotels_to_remove = []

    for hotel_dict in hotels:
        for filter_attribute, filter_value in hard_list:
            #print(f"Filter Attribute: {hotel_dict.get(filter_attribute)}, Filter Value: {filter_value}")
            #Print if fullfuls_attribute is True or False
            #print(f"Fulfills Attribute: {fulfills_attribute(hotel_dict, filter_attribute, filter_value)}")
            if not fulfills_attribute(hotel_dict, filter_attribute, filter_value):
                hotels_to_remove.append(hotel_dict)
                break

    for hotel in hotels_to_remove:
        hotels.remove(hotel)

    return hotels


def rank_hotels(hotels: list[dict[str, object]], soft_list: list[(str, object, int)]):
    """
    Ranks the hotels based on the soft_list

    Args:
        hotels (list): The hotels to be ranked.
        soft_list (list): The specified soft filters.

    Returns:
        list: The ranked list of hotels.
    """
    result_list = []
    for hotel_dict in hotels:
        hotel_importance = 0
        for filter_attribute, filter_value, filter_importance in soft_list:
            if fulfills_attribute(hotel_dict, filter_attribute, filter_value):
                hotel_importance += filter_importance
        result_list.append((hotel_dict.get("name") if hotel_dict.get("name") is not None else hotel_dict.get("hotel_name"), hotel_importance))
    result_list.sort(key=lambda x: x[1], reverse=True)
    result_list = [x[0] for x in result_list]
    return result_list[:10]
