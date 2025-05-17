document.addEventListener('DOMContentLoaded', function() {
    const wordInput = document.getElementById('word-input');
    const checkButton = document.getElementById('check-button');
    const suggestionsList = document.getElementById('suggestions-list');
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // Function to check spelling
    async function checkSpelling() {
        const word = wordInput.value.trim();
        
        if (!word) {
            showError('Please enter a word to check');
            return;
        }

        // Show loading indicator
        loadingIndicator.classList.remove('hidden');
        suggestionsList.innerHTML = '';
        errorMessage.classList.add('hidden');

        try {
            const response = await fetch('/api/correct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: word }),
            });

            const data = await response.json();
            
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');

            if (response.ok) {
                if (data.suggestions && data.suggestions.length > 0) {
                    displaySuggestions(data.suggestions, word);
                } else {
                    showError('No suggestions found for this word');
                }
            } else {
                showError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            loadingIndicator.classList.add('hidden');
            showError('Failed to connect to the server');
        }
    }

    // Function to display suggestions
    function displaySuggestions(suggestions, originalWord) {
        suggestionsList.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            
            // Add click event to copy suggestion to input
            li.addEventListener('click', function() {
                wordInput.value = suggestion;
            });
            
            suggestionsList.appendChild(li);
        });
    }

    // Function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Event listeners
    checkButton.addEventListener('click', checkSpelling);
    
    // Allow pressing Enter key in the input field
    wordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkSpelling();
        }
    });
});
