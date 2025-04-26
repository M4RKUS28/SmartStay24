from tqdm import tqdm

from code.app import find_matching_hotels
from test.load_data import load_test_data
import pandas as pd
import csv
import time

if __name__ == "__main__":
    # Step 1: Load the parquet file
    print("Start data loading")
    start = time.time()
    data = load_test_data("../data/messages.json")
    end = time.time()
    print(f"Data loading finished! Took {end - start} seconds")

    # Step 2: Convert it to the desired dict format
    hotels_dict = data[0][1]

    data = []
    with open('./valid_check.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            text = row[0]
            number = int(row[1])
            data.append((text, number))

    points = 0
    for querie, is_valid in data:
        result = find_matching_hotels(querie, hotels_dict)
        if (result is None and is_valid == 0) or (result is not None and is_valid == 1):
            points += 1
        else:
            print(querie, is_valid)
    score = points / len(data)
    print(score)