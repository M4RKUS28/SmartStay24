from code.app import find_matching_hotels
import pandas as pd
import csv



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

    data = []
    with open('your_file.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            text = row[0]
            number = int(row[1])
            data.append((text, number))

    points = 0
    for querie, is_valid in data:
        result = find_matching_hotels(querie, hotels_dict)
        if (result is None and is_valid == 0) or (result is not None and is_valid == 1):
            points += 1
    score = points / len(data)