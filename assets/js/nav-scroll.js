/**
 * G.T. METALWORKS - SMART NAV SCROLL
 * Hides nav on down scroll, reveals on up scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for nav to be injected
    setTimeout(initScroll, 100);
});

function initScroll() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return; // Not yet injected or error

    let lastScrollY = window.scrollY;
    let isHidden = false;
    let scrollTimer = null;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Debounce / Stop scrolling detection
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // User stopped scrolling - Reveal
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
            isHidden = false;
        }, 300);

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // SCROLL DOWN
            if (!isHidden) {
                nav.classList.add('nav-hidden');
                nav.classList.remove('nav-visible');
                isHidden = true;
            }
        } else if (currentScrollY < lastScrollY) {
            // SCROLL UP
            if (isHidden) {
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
                isHidden = false;
            }
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}
