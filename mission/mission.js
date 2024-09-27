const darkMode = document.getElementById('darkMode');
const body = document.body;

darkMode.addEventListener('click', function() {
    body.classList.toggle('dark')
});