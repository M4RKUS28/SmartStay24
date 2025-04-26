from typing import List, Tuple, Dict, Any
import json
import ast

def load_test_data(json_file_path: str) -> List[Tuple[str, Dict[str, Dict[str, Any]]]]:
    with open(json_file_path, 'r', encoding='utf-8') as f:
        json_data = json.load(f)

    # Find the "messages" table
    messages_table = next((item for item in json_data if item.get("name") == "messages"), None)
    if not messages_table:
        return []

    data = messages_table.get("data", [])
    test_data = []

    for entry in data:
        query = entry["query"]
        hotels_str = entry["hotels"]
        # Safely parse the hotels dictionary from the string
        hotels_dict = ast.literal_eval(hotels_str)
        test_data.append((query, hotels_dict))

    return test_data