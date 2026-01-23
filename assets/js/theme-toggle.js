document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const userPref = localStorage.getItem('user-prefs');
    const icon = toggleButton.querySelector('i');

    function setLightMode() {
        body.classList.remove('dark-vertion');
        body.classList.remove('black-bg'); // Ensure this is removed if it conflicts
        body.classList.add('white-vertion');
        icon.classList.remove('fa-sun-o');
        icon.classList.add('fa-moon-o');
        localStorage.setItem('user-prefs', 'light');
    }

    function setDarkMode() {
        body.classList.remove('white-vertion');
        body.classList.add('dark-vertion');
        body.classList.add('black-bg'); // Restore black-bg for dark mode
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
        localStorage.setItem('user-prefs', 'dark');
    }

    // Initialization
    if (userPref === 'light') {
        setLightMode();
    } else {
        // Default to dark mode
        setDarkMode();
    }

    // Toggle event
    toggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-vertion')) {
            setLightMode();
        } else {
            setDarkMode();
        }
    });
});
