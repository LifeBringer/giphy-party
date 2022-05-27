// Global Constants
const api_key = "aeLJsRPjrsrjzdyd75vFxXwPx22ofB7K";
const limit = 10;
const rating = 'g';
const trending = 'trending';

// Global Variables
var currentPage = 0;
var currentSearchTerm = '';

// Page elements
const gifContainer  = document.querySelector('#container');
const trendingButton = document.querySelector('#trending-btn');
const loadMoreBtn = document.querySelector('#load-more-btn');


async function getResults(searchTerm) {
    const offset = currentPage * limit;
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&lang=en&limit=${limit}&rating=${rating}&offset=${offset}`);
    const JSONdata = await response.json();
    return JSONdata
    
}

// Display results function
function displayResults(JSONdata) {
    try {
        const newGIFs = JSONdata.data.map(gifImage => `
        <div class="bg-image hover-zoom">
            <img 
                src="${gifImage.images.original.url}"
                title="${gifImage.title}"
                alt="${gifImage.title}"
            />
        </div>
        `).join('');

        gifContainer.innerHTML = gifContainer.innerHTML + newGIFs;

    } catch (error) {
        console.log(error);
        alert('No GIFs found');
    }

    // let randomIndex = Math.floor(Math.random() * data.data.length);

    // try {
    //     const gifImage = data.data[randomIndex];
    //     const gifImageUrl = gifImage.images.original.url;
    //     const image = document.createElement('img');
    //     image.src = gifImageUrl;
    //     image.alt = gifImage.title; // accessibility feature + color sensitive choices
    //     gifContainer.appendChild(image);
    // } catch (error) {
    //     console.log(error);
    //     alert('No GIFs found');
    // }

    // :hover items
    $("img").wrap('<div class="alt-wrap"/>');

    $("img").each(function () {
        $(this).after('<p class="alt">' + $(this).attr('alt') + '</p>');
    })
}

// Clear images
function clearGIF() {
    const images = document.querySelectorAll('img');
    for (let img of images) {
        img.parentNode.removeChild(img);
    }
}


// Event Listeners
const searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    handleFormSubmit();
});

async function handleFormSubmit () {
    const searchTerm = document.querySelector('#search-term').value;
    if (searchTerm !== currentSearchTerm) {
        clearGIF();
        currentPage = 0;
        currentSearchTerm = searchTerm;
    } 
    const data = await getResults(currentSearchTerm);
    displayResults(data);
    currentPage++;
    loadMoreBtn.classList.remove('hidden');
    currentSearchTerm = searchTerm;
    
}

trendingButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#search-term').value = trending;
    handleFormSubmit();
});

loadMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleFormSubmit();
});

window.onload = function() {
    document.querySelector('#search-term').value = trending;
    handleFormSubmit();
}