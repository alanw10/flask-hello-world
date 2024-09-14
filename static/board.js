// Base URL for the API
const baseUrl = 'https://api.jikan.moe/v4/anime';

// Function to fetch characters
function getCharacters() {
    const animeId = 21; // One Piece Anime ID

    fetch(`${baseUrl}/${animeId}/characters`)
        .then(response => response.json())
        .then(data => {
            const cA = data?.data || [];

            // Filter characters with over 100 member favorites
            const charactersArray = cA.filter(
                (character) => character.favorites > 100
            );

            // Shuffle and select 20 characters
            const shuffledCharacters = shuffleArray(charactersArray).slice(0, 20);

            // Map to the desired format for displaying
            const mappedCharacters = shuffledCharacters.map((character) => ({
                name: character.character.name,
                imageUrl: character.character.images.jpg.image_url,
            }));

            displayCharacters(mappedCharacters);
        })
        .catch(error => {
            console.error('Error fetching characters:', error);
        });
}

// Function to shuffle the array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to display characters on the page
function displayCharacters(characters) {
    const container = document.querySelector('.container');

    // Clear any previous content
    container.innerHTML = '';

    characters.forEach((character, index) => {
        // Create a div for each character
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';

        // Create a paragraph for the character's name
        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = character.name;

        // Create an img element for the character's image
        const characterImage = document.createElement('img');
        characterImage.src = character.imageUrl;
        characterImage.alt = character.name;
        characterImage.className = 'character-image';

        // Append the name and image to the character card
        characterCard.appendChild(nameParagraph);
        characterCard.appendChild(characterImage);

        // Append the character card to the container
        container.appendChild(characterCard);
    });
}

// Initialize the app on page load
document.addEventListener('DOMContentLoaded', function() {
    getCharacters();
});
