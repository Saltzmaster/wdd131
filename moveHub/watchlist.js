const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function loadWatchlist() {
    const watchlistContainer = document.getElementById('watchlistContainer');
    const emptyMessage = document.getElementById('emptyWatchlist');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        emptyMessage.style.display = 'block';
        watchlistContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        watchlistContainer.style.display = 'grid';

        watchlist.forEach(movie => {
            const watchlistItem = document.createElement('div');
            watchlistItem.classList.add('watchlistItem');

            watchlistItem.innerHTML = `
                <img src="${IMG_BASE_URL + movie.posterPath}" alt="${movie.title} Poster">
                <h4>${movie.title}</h4>
                <button onclick="removeFromWatchlist('${movie.id}')">Remove</button>
            `;

            watchlistContainer.appendChild(watchlistItem);
        });
    }
}

function removeFromWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const updatedWatchlist = watchlist.filter(movie => movie.id !== id);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));

    alert('Movie removed from watchlist.');
    location.reload(); // Refresh to update the list
}

document.addEventListener('DOMContentLoaded', loadWatchlist);
