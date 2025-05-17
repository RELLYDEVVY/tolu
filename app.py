import pandas as pd
from flask import Flask, request, jsonify, render_template
import re
from difflib import get_close_matches

app = Flask(__name__)

# Load the Yoruba words dataset
def load_yoruba_words():
    df = pd.read_csv('all_yoruba_words_words.csv')
    # Extract only successful words
    valid_words = df[df['status'] == 'success']['word'].tolist()
    # Clean the words (remove any potential whitespace)
    valid_words = [word.strip() for word in valid_words if isinstance(word, str)]
    return valid_words

# Global variable to store the words
yoruba_words = load_yoruba_words()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/correct', methods=['POST'])
def correct_spelling():
    data = request.get_json()
    
    if not data or 'word' not in data:
        return jsonify({'error': 'No word provided'}), 400
    
    word = data['word'].strip().lower()
    
    if not word:
        return jsonify({'error': 'Empty word provided'}), 400
    
    # Find closest matches
    suggestions = get_close_matches(word, yoruba_words, n=3, cutoff=0.6)
    
    # If no matches found with the default cutoff, try with a lower cutoff
    if not suggestions and len(word) > 2:
        suggestions = get_close_matches(word, yoruba_words, n=3, cutoff=0.4)
    
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(debug=True)
