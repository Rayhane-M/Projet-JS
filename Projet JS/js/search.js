const apiKey = '5d3cb5c5';
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const loadMoreButton = document.getElementById('load-more-search');
let currentPage = 1;
let currentQuery = '';

async function fetchSearchResults(query, page = 1) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie&page=${page}`);
    const data = await response.json();
    return data.Search || [];
}

function displayResults(results) {
    results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'movie-card';
        resultCard.innerHTML = `
            <img src="${result.Poster}" alt="${result.Title}">
            <h2>${result.Title}</h2>
            <a href="movie.html?id=${result.imdbID}">En savoir plus</a>
        `;
        searchResults.appendChild(resultCard);
    });
}

searchBar.addEventListener('input', async (e) => {
    const query = e.target.value;
    currentQuery = query;
    currentPage = 1;
    searchResults.innerHTML = '';
    if (query) {
        const results = await fetchSearchResults(query);
        displayResults(results);
    }
});

loadMoreButton.addEventListener('click', async () => {
    if (currentQuery) {
        currentPage++;
        const results = await fetchSearchResults(currentQuery, currentPage);
        displayResults(results);
    }
});