const darkMode = document.getElementById('darkMode');
const body = document.body;
const logo = document.getElementById('logo');

darkMode.addEventListener('click', function() {
    body.classList.toggle('dark')
    
    if (body.classList.contains('dark')) {
        logo.src = 'byui-logo_dark.png';
    }
    else {
        logo.src = 'byui-logo.webp';
    }
});