import json

from tqdm import tqdm

from code.app import find_matching_hotels
from code.query_to_json import query_to_dict
from code.utils import check24_to_attribute_list, check24_to_list, chatGPT_to_list
from test.load_data import load_test_data
import os
import csv
import time

from dotenv import load_dotenv
from openai import AzureOpenAI

# Load the environment variables from .env file..
load_dotenv(dotenv_path="../.env")

# Initialize the Azure OpenAI client
client = AzureOpenAI(
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
    api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
    api_version="2025-01-01-preview",  # As specified in your project description
)

def get_NaN_accuracy():
    # Step 1: Load the data
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

def create_hard_soft_file():
    # Step 1: Load the data
    print("Start data loading")
    start = time.time()
    data = load_test_data("../data/messages.json")
    end = time.time()
    print(f"Data loading finished! Took {end - start} seconds")

    writer = csv.writer(open("./current_output.csv", 'w'))

    for query, hotels in tqdm(data[1:]):
        writer.writerow("")
        att_list = check24_to_attribute_list(hotels)
        dream_hotel = query_to_dict(client, query, att_list)
        if dream_hotel is None:
            writer.writerow([query, "None"])
            continue
        hard_list, soft_list = chatGPT_to_list(dream_hotel)
        writer.writerow([
            query,
            json.dumps(hard_list),
            json.dumps(soft_list)
        ])


if __name__ == "__main__":
    get_NaN_accuracy()
    #create_hard_soft_file()