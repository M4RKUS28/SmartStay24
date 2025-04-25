def dic_to_list(dic_input):
    """
    Filters the JSON data based on ...

    Args:
        dic_input (dic): Input as dic.

    Returns:
        hard_list: List of attributes with importance = 100.
        soft_list: List of remaining attributes ordered by importance.
    """
    soft_list = []
    hard_list = []
    for name, (value, importance) in dic_input.items():
        if (importance == 100):
            hard_list.append((name, value))
        else:
            soft_list.append((name, value, importance))
    soft_list.sort(key = lambda x: x[2], reverse=True)
    soft_list = [(name, value) for name, value, _ in soft_list]

    return hard_list, soft_list
