/**
 * G.T. METALWORKS - MAIN SCRIPT
 * Projects Filter & Accessible Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initProjects();
    initCarousels();
    initScrollAnimations();
});

// Wait for partials to be injected
document.addEventListener('partialsLoaded', () => {
    initThemeToggle();
});

function initProjects() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    // FILTERING
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class
                filterTabs.forEach(t => t.classList.remove('active', 'btn-primary'));
                filterTabs.forEach(t => t.classList.add('btn-outline'));

                // Add active
                tab.classList.remove('btn-outline');
                tab.classList.add('active', 'btn-primary');

                const filter = tab.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // MODAL
    const modal = document.querySelector('.modal');
    if (modal) {
        const modalImg = modal.querySelector('.modal-img');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-desc');
        const closeBtn = modal.querySelector('.modal-close');

        // Open
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.project-img').src;
                const title = card.querySelector('.project-title').textContent;
                const desc = card.getAttribute('data-details') || "Dettagli non disponibili.";

                modalImg.src = img;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;

                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                closeBtn.focus();

                // Prevent background scroll
                document.body.style.overflow = 'hidden';
            });
        });

        // Close
        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);

        // Click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

function initCarousels() {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((container, carouselIndex) => {
        const track = container.querySelector(".carousel-track");
        const slides = Array.from(track.children);
        const indicatorsContainer = container.querySelector(".carousel-indicators");

        if (!track || slides.length === 0) return;

        // CRITICAL FIX: Prevent Horizontal Scroll Hijacking
        container.addEventListener("wheel", (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
            }
        }, { passive: false });

        // Create Navigation Arrows
        const prevBtn = document.createElement("button");
        prevBtn.classList.add("carousel-btn", "carousel-prev");
        prevBtn.innerHTML = "&#10094;";
        prevBtn.setAttribute("aria-label", "Precedente");

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("carousel-btn", "carousel-next");
        nextBtn.innerHTML = "&#10095;";
        nextBtn.setAttribute("aria-label", "Successivo");

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);

        // Create indicators if container exists
        if (indicatorsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement("button");
                dot.classList.add("carousel-dot");
                dot.setAttribute("aria-label", `Vai alla slide ${index + 1}`);
                if (index === 0) dot.classList.add("active");

                dot.addEventListener("click", () => {
                    goToSlide(index);
                    stopAutoPlay();
                    startAutoPlay();
                });

                indicatorsContainer.appendChild(dot);
            });
        }

        const dots = indicatorsContainer ? Array.from(indicatorsContainer.children) : [];
        let currentIndex = 0;
        let autoPlayTimer;

        function goToSlide(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove("active"));
                if (dots[index]) dots[index].classList.add("active");
            }
            currentIndex = index;
        }

        function nextSlide() {
            let index = currentIndex + 1;
            if (index >= slides.length) index = 0;
            goToSlide(index);
        }

        function prevSlide() {
            let index = currentIndex - 1;
            if (index < 0) index = slides.length - 1;
            goToSlide(index);
        }

        function startAutoPlay() {
            autoPlayTimer = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
        }

        // Event Listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        container.addEventListener("mouseenter", stopAutoPlay);
        container.addEventListener("mouseleave", startAutoPlay);

        // Initial Start
        startAutoPlay();
    });
}

/**
 * THEME TOGGLE
 * Dark/Light mode with localStorage persistence
 */
function initThemeToggle() {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    if (toggleBtns.length === 0) return;

    const body = document.body;

    // Helper to update all icons
    const updateIcons = (isLight) => {
        toggleBtns.forEach(btn => {
            const icon = btn.querySelector('.icon');
            if (icon) icon.textContent = isLight ? '☀' : '🌙';
        });
    };

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        updateIcons(true);
    } else {
        updateIcons(false);
    }

    // Attach listeners
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');

            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateIcons(isLight);
        });
    });
}

/**
 * SCROLL REVEAL ANIMATION
 * Simple IntersectionObserver for fade-in elements
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Changed slightly over 0.2 for better mobile trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));
}
