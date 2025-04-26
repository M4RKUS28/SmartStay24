def fulfills_attribute(hotel_dict, filter_attribute, filter_value):
    """
    Checks whether the given hotel satisfies the filter_attribute

    Args:
        hotels_dict (dict): The hotels to be filtered.
        filter_attribute (str): The attribute to filter by.
        filter_value (str): The value the attribute should hold

    Returns:
        Boolean: True, if the hotel satisfies the attribute.
    """
    if hotel_dict.get(filter_attribute) is None:
        return False
    if filter_value[:1] == "<":
        if float(hotel_dict.get(filter_attribute)) > float(filter_value[1:]):
            return False
    elif filter_value[:1] == ">":
        if float(hotel_dict.get(filter_attribute)) < float(filter_value[1:]):
            return False
    else:
        if isinstance(hotel_dict.get(filter_attribute), (int, float)):
            return float(hotel_dict.get(filter_attribute)) == float(filter_value[1:])
        else:
            return str(hotel_dict.get(filter_attribute)) == str(filter_value[1:])
    return True


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
            print(f"Filter Attribute: {hotel_dict.get(filter_attribute)}, Filter Value: {filter_value}")
            # Print if fullfuls_attribute is True or False
            print(f"Fulfills Attribute: {fulfills_attribute(hotel_dict, filter_attribute, filter_value)}")
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
