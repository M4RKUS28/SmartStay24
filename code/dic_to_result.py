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
    if (filter_value[:1] == "<"):
        if (float(hotel_dict.get(filter_attribute)) > float(filter_value[1:])):
            return False
    elif (filter_value[:1] == ">"):
        if (float(hotel_dict.get(filter_attribute)) < float(filter_value[1:])):
            return False
    else:
        if (str(hotel_dict.get(filter_attribute)) != filter_value[1:]):
            return False
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
        for (filter_attribute, filter_value) in hard_list:
            if not fulfills_attribute(hotel_dict, filter_attribute, filter_value):
                hotels_to_remove.append(hotel_dict)
                break

    #for hotel in hotels_to_remove:
        #print(hotel)

    for hotel in hotels_to_remove:
        hotels.remove(hotel)

    return hotels




def rank_hotels(hotels: list[dict[str, object]], soft_list: list[(str, object)]):
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
        for (filter_attribute, filter_value, filter_importance) in soft_list:
            if fulfills_attribute(hotel_dict, filter_attribute, filter_value):
                hotel_importance += filter_importance
        result_list.append((hotel_dict.get("name"), hotel_importance))

    result_list.sort(key=lambda x: x[1])
    result_list = [x[0] for x in result_list]
    return result_list


hotels = [
    {'name': 'Seaside Escape', 'stars': '5', 'location': 'beach', 'price': '300', 'pool': 'yes'},
    {'name': 'Urban Nest', 'stars': '4', 'location': 'city', 'price': '180', 'pool': 'no'},
    {'name': 'Budget Inn', 'stars': '2', 'location': 'highway', 'price': '60', 'pool': 'no'},
    {'name': 'Mountain Lodge', 'stars': '3', 'location': 'mountains', 'price': '150', 'pool': 'yes'},
    {'name': 'Luxury Palace', 'stars': '5', 'location': 'city', 'price': '500', 'pool': 'yes'},
    {'name': 'Beach Bliss', 'stars': '4', 'location': 'beach', 'price': '220', 'pool': 'yes'},
    {'name': 'Country Comfort', 'stars': '3', 'location': 'countryside', 'price': '120', 'pool': 'no'},
    {'name': 'Sky High Hotel', 'stars': '5', 'location': 'city', 'price': '350', 'pool': 'yes'},
    {'name': 'Eco Stay', 'stars': '3', 'location': 'forest', 'price': '100', 'pool': 'no'},
    {'name': 'The Grand Bay', 'stars': '5', 'location': 'beach', 'price': '450', 'pool': 'yes'},
]

hard_list = [
    ('stars', '>4'),
    ('location', '=beach'),
    ('pool', '=yes'),
    ('price', '<400')
]

hotels = filter_hotels(hotels, hard_list)
for hotel in hotels:
    print(hotel)
# Expected: [{'stars': 5, 'location': 'beach'}]