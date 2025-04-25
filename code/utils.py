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
    soft_list.sort(key = lambda x: x[2])
    soft_list = [(name, value) for name, value, _ in soft_list]

    return hard_list, soft_list


attribute_dict = {
    'attr1': ('value1', 100),
    'attr2': ('value2', 50),
    'attr3': ('value3', 20),
    'attr4': ('value4', 100),
    'attr5': ('value5', 75)
}

hard_list, soft_list = dic_to_list(attribute_dict)
for i in hard_list:
    print(i)
print("----------")
for i in soft_list:
    print(i)