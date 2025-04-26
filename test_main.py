from typing import Any, Dict, List, Tuple
from code.app import find_matching_hotels

import pandas as pd
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


test_data = load_test_data('./data/messages.json')


if __name__ == "__main__":

    for query, hotels in test_data:
        print(query)
        print(hotels)

    # Step 1: Load the parquet file.
    df = pd.read_parquet("./data/hotels/resultlist_Kopenhagen.parquet")

    # Step 2: Convert it to the desired dict format.
    hotels_dict = {}

    for _, row in df.iterrows():
        hotel_name = row["hotel_name"]
        # Drop the 'name' from the values dictionary if you don't want it repeated
        row_dict = row.to_dict()
        hotels_dict[hotel_name] = row_dict

    # hotels_dict is now in your format
    example_queries = [
        "I'm travelling with a dog and need a parking space.",
        "I'm looking for a hotel with a breathtaking view and a luxurious wellness center where I can truly relax.",
        "I'd love to find a family-friendly hotel surrounded by nature, perfect for a peaceful getaway, that also allows an extra bed for children.",
        "Stylish, modern hotel that not only offers great design but also serves an good breakfast.",
        "Find me a hotel with rating at least 9.3 and cheaper than 40 EUR per night.",
        "I want to make a vacation on the beach.",
        "What is a good recipe for pancakes?",
    ]
    hotels = find_matching_hotels(example_queries[4], hotels_dict)
    print(hotels)
    if hotels is not None:
        print(f"Amount of Hotels found: {len(hotels)}")
