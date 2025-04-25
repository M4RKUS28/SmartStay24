
import json

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
            if (filter_value[:1] == "<"):
                if (float(hotel_dict.get(filter_attribute)) > float(filter_value[1:])):
                    hotels_to_remove.append(hotel_dict)
                    break
            elif (filter_value[:1] == ">"):
                if (float(hotel_dict.get(filter_attribute)) < float(filter_value[1:])):
                    hotels_to_remove.append(hotel_dict)
                    break
            else:
                if (str(hotel_dict.get(filter_attribute)) != filter_value[1:]):
                    hotels_to_remove.append(hotel_dict)
                    break

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
    for filter in soft_list:
        print("Test")
    return hotels