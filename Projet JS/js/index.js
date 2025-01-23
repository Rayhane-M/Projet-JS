const apiKey = '5d3cb5c5';
const moviesContainer = document.getElementById('movies');
const loadMoreButton = document.getElementById('load');
let currentPage = 1;

async function fetchMovies(page = 1) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=2024&type=movie&page=${page}`);
    const data = await response.json();
    return data.Search || [];
}

function displayMovies(movies) {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <a href="movie.html?id=${movie.imdbID}">En savoir plus</a>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    const movies = await fetchMovies(currentPage);
    displayMovies(movies);
});

fetchMovies().then(displayMovies);