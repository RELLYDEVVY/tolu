# Yoruba Spelling Corrector

A web application that suggests the top 3 closest correct Yoruba spellings for a given word.

## Features

- Accepts a single-word input from the user
- Suggests the top 3 closest correct Yoruba spellings
- Clean and responsive UI
- Flask backend with HTML/CSS/JS frontend

## Setup Instructions

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Make sure the CSV file with Yoruba words is in the same directory as app.py:
   - The application expects a file named `all_yoruba_words_words.csv` in the root directory

3. Run the application:
   ```
   python app.py
   ```

## How It Works

1. The application loads a dataset of Yoruba words from the CSV file
2. When a user enters a word, the backend uses Python's difflib to find the closest matches
3. The top 3 suggestions are returned to the frontend and displayed to the user
4. Users can click on any suggestion to replace their input with the selected word

## Technologies Used

- Backend: Flask (Python)
- Frontend: HTML, CSS, JavaScript
- Data Processing: Pandas
- String Matching: Python's difflib library
