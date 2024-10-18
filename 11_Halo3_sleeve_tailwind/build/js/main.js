const initApp = () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('flex');
        mobileMenu.classList.toggle('hidden');
        hamburgerButton.classList.toggle('toggle-btn');
    }

    hamburgerButton.addEventListener('click', toggleMenu, false);
    mobileMenu.addEventListener('click', toggleMenu, false);
}

// wait for DOM to load
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});