document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const userPref = localStorage.getItem('user-prefs');
    const icon = toggleButton.querySelector('i');

    // Image swap configuration
    const imageSwaps = [
        {
            selector: 'img[src*="profile-hero"]',
            dark: 'assets/images/profile-hero.webp',
            light: 'assets/images/profile-hero-w.png'
        },
        {
            selector: 'img[src*="About_me"]',
            dark: 'assets/images/About_me.png',
            light: 'assets/images/About_me_blue.png'
        }
    ];

    function swapImages(mode) {
        imageSwaps.forEach(swap => {
            const img = document.querySelector(swap.selector);
            if (img) {
                img.src = mode === 'light' ? swap.light : swap.dark;
            }
        });
    }

    function setLightMode() {
        body.classList.remove('dark-vertion');
        body.classList.remove('black-bg');
        body.classList.add('white-vertion');
        icon.classList.remove('fa-sun-o');
        icon.classList.add('fa-moon-o');
        localStorage.setItem('user-prefs', 'light');
        swapImages('light');
    }

    function setDarkMode() {
        body.classList.remove('white-vertion');
        body.classList.add('dark-vertion');
        body.classList.add('black-bg');
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
        localStorage.setItem('user-prefs', 'dark');
        swapImages('dark');
    }

    // Initialization
    if (userPref === 'light') {
        setLightMode();
    } else {
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
