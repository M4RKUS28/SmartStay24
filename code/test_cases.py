from code.app import find_matching_hotels
import pandas as pd


if __name__ == "__main__":

    # Step 1: Load the parquet file
    df = pd.read_parquet("../data/hotels/resultlist_Kopenhagen.parquet")

    # Step 2: Convert it to the desired dict format
    hotels_dict = {}

    for _, row in df.iterrows():
        hotel_name = row["hotel_name"]
        # Drop the 'name' from the values dictionary if you don't want it repeated
        row_dict = row.to_dict()
        hotels_dict[hotel_name] = row_dict

    is_valid_queries = [
        ("I'm travelling with a dog and need a parking space.", 1),
        ("I'm looking for a hotel with a breathtaking view and a luxurious wellness center where I can truly relax.", 0),
    ]

    points = 0
    for querie, is_valid in is_valid_queries:
        result = find_matching_hotels(querie, hotels_dict)
        if (result is None and is_valid == 0) or (result is not None and is_valid == 1):
            points += 1
    score = points / len(is_valid_queries)