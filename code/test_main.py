from code.app import find_matching_hotels

import pandas as pd

if __name__ == "__main__":
    # Step 1: Load the parquet file
    df = pd.read_parquet("./data/hotels/resultlist_Kopenhagen.parquet")

    # Step 2: Convert it to the desired dict format
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
