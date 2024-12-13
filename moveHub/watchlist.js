document.addEventListener('DOMContentLoaded', () => {
    const watchlistContainer = document.getElementById('watchlistContainer');
    const emptyWatchlist = document.getElementById('emptyWatchlist');

    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        emptyWatchlist.style.display = 'block';
        return;
    }

    emptyWatchlist.style.display = 'none';

    watchlist.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.posterPath}" alt="${movie.title} Poster">
            <h3>${movie.title}</h3>
            <button onclick="removeFromWatchlist('${movie.id}')">Remove from Watchlist</button>
        `;

        watchlistContainer.appendChild(movieCard);
    });
});

function removeFromWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const updatedWatchlist = watchlist.filter(movie => movie.id !== id);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    location.reload(); // Reload the page to update the UI
}
