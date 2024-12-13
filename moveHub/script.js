const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWEwNjYwNDNiYWU2ZDkxMmE0YjRmNjA3NWEzYmQ5OSIsIm5iZiI6MTczNDA1MDE4OC45OCwic3ViIjoiNjc1YjgxOGNmOTMyZGM3NzE2MjZjOWMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0oZfxn-bJDovmtn54ExXzgEzFXjMnmrdE7y02X0mA3I';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Fetch popular movies
async function fetchPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

// Display movies in the grid
function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');

        movieCard.innerHTML = `
            <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title} Poster">
            <h3>${movie.title}</h3>
            <p>${movie.release_date.split('-')[0]}</p>
            <button onclick="addToWatchlist('${movie.id}', '${movie.title}', '${movie.poster_path}')">Add to Watchlist</button>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

// Add a movie to the watchlist
function addToWatchlist(id, title, posterPath) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const movie = { id, title, posterPath };

    if (!watchlist.some(item => item.id === id)) {
        watchlist.push(movie);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie successfully added to your watchlist!');
    } else {
        alert('This movie is already in your watchlist.');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchPopularMovies);
