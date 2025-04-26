If there are any errors during the 4pm testing, please contact us on discord (lucabzt#7943). Our function should work but we are not sure about python path and imports, modules etc.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/uIYE-hOq)
# CHECK24 Hotel Recommender

## Table of Contents
- [Challenge](#challenge)
  - [Background](#background)
  - [Task](#task)
  - [Data](#data)
  - [Requirements](#requirements)
  - [Resources](#resources)
  - [Evaluation criteria](#evaluation-criteria)
- [System Specification](#system-specification)
  - [System components](#system-components)
  - [Main Function](#main-function)
- [Development Setup](#development-setup)
  - [Azure OpenAI Configuration](#azure-openai-configuration)
- [Submission](#submission)

## Challenge

### Background
Finding the perfect hotel can be challenging when travelers have specific preferences, such as pet-friendliness, free parking, or proximity to city attractions. AI-driven solutions can help streamline the process by understanding user requests and matching them with the most suitable options.

### Task
Your challenge is to build an AI-based hotel recommendation system that takes a user's natural language prompt describing their preferences and returns a sorted list of the most relevant hotels.

### Data
You are provided with a dataset containing:
* Lists of hotels with detailed attributes such as price, rating, amenities, etc. for 3 different destinations. Feature sets and feature names may vary across locations.
* Several examples of user queries. Feel free to put yourself in our customers' shoes and create your own test inputs.

### Requirements
Build a system which takes a list of hotels at one destination with available features and a user query as an input and returns a list of recommended hotels.

Your system should be able to handle the following cases:
* If there are **hotels that fully or partially fit the user input**, return maximum 10 hotels sorted in descending order of relevance.
* There are **no hotels** matching the user input.
* User **input is irrelevant** to hotel search.

The system should be designed efficiently to ensure the fastest possible response time. Required system structure and the main function specification are described in the [System Specification](#system-specification) section.

At the end, think of a **creative name** for your system and make a **short presentation** summarizing your approach, model selection, and key findings.

### Resources
You are provided with an **Azure OpenAI API endpoint** which you can use to complete the task. The key gives you access to several OpenAI models, and you can choose which model to use.

If OpenAI models are used, the cost of predictions should be minimized, including optimization of token usage while maintaining accuracy.

### Evaluation criteria
Your implementation will be run in our evaluation system on approximately 50 test cases, covering a variety of locations and user prompts. In addition to performance, the creativity of your solution and the clarity of your presentation are highly valued! Consider including a hands-on demonstration to showcase your application in action.

* **Accuracy (70%)**: Correctness of predictions.
    * For cases recommending hotels: **average NDCG@k**, depending on the number of relevant hotels but maximum 10 (high weight – 50%).
    * For cases with no recommendations: **classification accuracy** (low weight – 10%).
    * For invalid prompts: **classification accuracy** (low weight – 10%).
* **Runtime (10%)**: Average response time of prediction. The score decreases linearly with slower response times.
* **Creativity (10%)**: Originality and elegance of the solution handling various situations as well as edge cases.
* **Presentation (10%)**: Clarity and structure of the presentation. Including a short demo is encouraged.

Each dimension is scored from **0 to 1**. The final score is the weighted average of these individual scores.

Good luck, and happy coding! 🚀


## System Specification

Python version 3.12 must be used for this project.

### System components
To ensure proper evaluation, you need to have these essential components in your submission:

1. `code/app.py`
   - Contains the main function `find_matching_hotels` for making individual predictions which will be used in the evaluation.
   - Implementation should be in the `code` folder and allow importing the function as
      ```python
      from code.app import find_matching_hotels
      ```
   - The system should not contain any print statements.

2. `requirements.txt`
   - Located in the project root directory.
   - Lists all external dependencies needed to run the system.
   - Should specify exact versions for reproducibility.

3. `.env`
   - Contains Azure OpenAI credentials.
   - Necessary for using Azure OpenAI models.

### Main Function

#### Signature
```python
def find_matching_hotels(query: str, hotels: dict[str, dict[str, object]]) -> list[str] | None
```

#### Overview
The `find_matching_hotels` function is the core implementation that should be provided. It takes a user query and a dictionary of hotels as input, and returns a ranked list of hotel names that best match the query.

#### Parameters

- **query** (`str`): The user's search query describing their hotel preferences. Example: "luxury hotel with pool near the beach".

- **hotels** (`dict[str, dict[str, object]]`): A dictionary of hotels for one destination with features, where keys are `hotel_name` strings and values are dictionaries mapping feature names to feature values. Example:
```python
hotels = {
    "Grand Hotel": {
        "name": "Grand Hotel",
        "pricepernight": 112.36,
        "rating": 4.5,
        "Innenpool": 0
    },
    "Budget Inn": {
        "name": "Budget Inn",
        "pricepernight": 83.65,
        "rating": 3.0,
        "Innenpool": 0
    },
    "Spa Resort": {
        "name": "Spa Resort",
        "pricepernight": 152.20,
        "rating": 4.2,
        "Innenpool": 1
    }
}
```

#### Return Value
`list[str] | None`:
- **If query is valid and matches are found:** A list of `hotel_name`s, ordered by relevance. Return maximum 10 hotels. If there are fewer than 10 hotels that match the query at least to some extent, return only the relevant ones. If several hotels have the same relevance, sort them by `ltr_score` attribute in descending order as this represents hotel's general relevance.
- **If query is valid but no matches:** Empty list `[]`.
- **If query is invalid:** `None`.

## Development Setup
To get started with your solution, follow these steps:
1. Make sure Python 3.12 is installed.
2. Clone your team’s repository from GitHub.
3. Create and activate a virtual environment:
   ```bash
   # Unix/macOS
   python3.12 -m venv venv
   source venv/bin/activate

   # Windows
   python3.12 -m venv venv
   .\venv\Scripts\activate
   ```
4. Install pre-commit hooks to automatically check your code before each commit to ensure your solution is compatible with our evaluation setup:
   ```bash
   pip install -r requirements.txt
   pre-commit install
   ```
   The pre-commit hooks will help you catch common issues early by automatically checking:
      - Python version (must be 3.12)
      - Required files and folders (`code/`, `code/app.py`, `requirements.txt`)
      - `find_matching_hotels` function signature (`query`, `hotels`)
      - `find_matching_hotels` function return type (`list[str] | None`)
      - Importability and execution of the main function
      - Code formatting
      - Basic linting

### Azure OpenAI Configuration
To utilize Azure OpenAI models in your solution, follow these steps:

1. Install and use the `openai` Python package.
2. Your Azure OpenAI endpoint and API key are provided in the `.env` file.
3. Load these credentials as environment variables in your code using the `python-dotenv` package, and use them to authenticate your model calls.

The following Azure OpenAI models are available for your use:

| Deployment Name      | Base Model   | API Version          |
|---------------------|--------------|---------------------|
| o3-mini-0131-eu     | o3-mini      | 2025-01-01-preview |
| gpt-4o-mini-0718-eu | gpt-4o-mini  | 2025-01-01-preview |
| gpt-4o-0806-eu      | gpt-4o       | 2025-01-01-preview |

## Submission

To submit your solution, simply push your code to the `main` branch of the GitHub repository that was automatically created when you accepted the assignment.

We’ll clone all repositories on **Sunday, April 27 at 10:00 AM** and begin the final evaluation. Please note that any code changes made after this time will not be considered.

There will also be an intermediate evaluation on **Saturday, April 26 at 4:00 PM**. Evaluation scores will be published afterwards, giving you a chance to verify that your system runs correctly in our evaluation environment and to see how your solution compares so far.
