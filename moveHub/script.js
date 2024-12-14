const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWEwNjYwNDNiYWU2ZDkxMmE0YjRmNjA3NWEzYmQ5OSIsIm5iZiI6MTczNDA1MDE4OC45OCwic3ViIjoiNjc1YjgxOGNmOTMyZGM3NzE2MjZjOWMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0oZfxn-bJDovmtn54ExXzgEzFXjMnmrdE7y02X0mA3I';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const popularMoviesButton = document.getElementById('popularTab');
const popularTVShowsButton = document.getElementById('newTab');
const searchButton = document.getElementById('searchButton');
const searchBar = document.getElementById('searchBar');
const moviesContainer = document.getElementById('movies');

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

// Fetch popular TV shows
async function fetchPopularTVShows() {
    try {
        const response = await fetch(`${BASE_URL}/tv/popular?language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        displayTVShows(data.results);
    } catch (error) {
        console.error('Error fetching popular TV shows:', error);
    }
}

// Search for movies
async function searchMovies(query) {
    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    try {
        // Clear active styles from category buttons
        popularMoviesButton.classList.remove('active');
        popularTVShowsButton.classList.remove('active');

        // Fetch search results
        const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        if (data.results.length === 0) {
            alert('No results found. Try a different search term.');
        } else {
            displayMovies(data.results);
        }
    } catch (error) {
        console.error('Error searching movies:', error);
    }

    searchBar.value = ''; // Clear search bar after search
}

// Display movies in the grid
function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');

        movieCard.innerHTML = `
            <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title} Poster">
            <h3>${movie.title}</h3>
            <p>${movie.release_date?.split('-')[0] || 'N/A'}</p>
            <button class="watchlistButton" data-id="${movie.id}" data-title="${movie.title}" data-poster="${movie.poster_path}">Add to Watchlist</button>
        `;

        moviesContainer.appendChild(movieCard);
    });

    // Add event listeners to dynamically generated buttons
    const watchlistButtons = document.querySelectorAll('.watchlistButton');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const title = button.getAttribute('data-title');
            const posterPath = button.getAttribute('data-poster');
            addToWatchlist(id, title, posterPath);
        });
    });
}


// Display TV shows in the grid
function displayTVShows(tvShows) {
    moviesContainer.innerHTML = '';

    tvShows.forEach(show => {
        const showCard = document.createElement('div');
        showCard.classList.add('movieCard');

        showCard.innerHTML = `
            <img src="${IMG_BASE_URL + show.poster_path}" alt="${show.name} Poster">
            <h3>${show.name}</h3>
            <p>${show.first_air_date?.split('-')[0] || 'N/A'}</p>
            <button class="watchlistButton" data-id="${show.id}" data-title="${show.name}" data-poster="${show.poster_path}">Add to Watchlist</button>
        `;

        moviesContainer.appendChild(showCard);
    });

    // Add event listeners to dynamically generated buttons
    const watchlistButtons = document.querySelectorAll('.watchlistButton');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const title = button.getAttribute('data-title');
            const posterPath = button.getAttribute('data-poster');
            addToWatchlist(id, title, posterPath);
        });
    });
}


// Toggle category
function toggleCategory(category) {
    if (category === 'movies') {
        popularMoviesButton.classList.add('active');
        popularTVShowsButton.classList.remove('active');
        fetchPopularMovies();
    } else if (category === 'tvShows') {
        popularTVShowsButton.classList.add('active');
        popularMoviesButton.classList.remove('active');
        fetchPopularTVShows();
    }
}

// Add to watchlist
function addToWatchlist(id, title, posterPath) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.some(item => item.id === id)) {
        showAlert(`${title} is already in your watchlist!`);
    } else {
        watchlist.push({ id, title, posterPath });
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        showAlert(`${title} has been added to your watchlist!`);
    }
}

// Alert message
function showAlert(message) {
    const alertBox = document.getElementById('alert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertBox.classList.add('visible');
}

document.getElementById('closeAlert').addEventListener('click', () => {
    const alertBox = document.getElementById('alert');
    alertBox.classList.remove('visible');
});


// Event listeners
popularMoviesButton.addEventListener('click', () => toggleCategory('movies'));
popularTVShowsButton.addEventListener('click', () => toggleCategory('tvShows'));
searchButton.addEventListener('click', () => searchMovies(searchBar.value.trim()));
searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchMovies(searchBar.value.trim());
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies(); // Default to popular movies
});
