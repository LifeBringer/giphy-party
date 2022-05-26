// Global Constants
const api_key = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC";
const limit = 10;
const rating = 'g';


async function getResults(searchTerm) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&lang=en&limit=${limit}&rating=${rating}`);
    const data = await response.json();
    
    let randomIndex = Math.floor(Math.random() * data.data.length);

    try {
        const gifImage = data.data[randomIndex];
        const gifImageUrl = gifImage.images.original.url;
        const container = document.querySelector('#container');
        const image = document.createElement('img');
        image.src = gifImageUrl;
        image.alt = gifImage.title; // accessibility feature + color sensitive choices
        container.appendChild(image);
    } catch (error) {
        console.log(error);
        alert('No GIFs found');
    }
}

// Clear images
function clearGIF() {
    const images = document.querySelectorAll('img');
    for (let img of images) {
        img.parentNode.removeChild(img);
    }
}


// Event Listeners
var currentSearchTerm = '';
const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector('#search-term').value;
    if (searchTerm !== currentSearchTerm) {
        clearGIF();
        currentSearchTerm = searchTerm;
    }
    getResults(searchTerm);
});

const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', (e) => {
    document.querySelector('form').reset();
    e.preventDefault();
    clearGIF();
});