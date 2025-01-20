const apiKey = '5d3cb5c5';
const movieDetailsContainer = document.getElementById('movie-details');
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

async function fetchMovieDetails(id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
    return response.json();
}

function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <h1>${movie.Title}</h1>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p>${movie.Plot}</p>
        <p><strong>Genre :</strong> ${movie.Genre}</p>
        <p><strong>Acteurs :</strong> ${movie.Actors}</p>
        <p><strong>Notes :</strong> ${movie.Ratings.map(r => `${r.Source}: ${r.Value}`).join(', ')}</p>
        <p><strong>Date de sortie DVD :</strong> ${new Date(movie.DVD).toLocaleDateString('fr-FR')}</p>
    `;
}

if (movieId) {
    fetchMovieDetails(movieId).then(displayMovieDetails);
}