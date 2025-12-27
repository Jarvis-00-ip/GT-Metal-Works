/**
 * G.T. METALWORKS - MAIN SCRIPT
 * Projects Filter & Accessible Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initProjects();
    initTestimonials();
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

function initTestimonials() {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    
    if (!track || slides.length === 0) return;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        dot.setAttribute("aria-label", `Vai alla recensione ${index + 1}`);
        if(index === 0) dot.classList.add("active");
        
        dot.addEventListener("click", () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
        
        indicatorsContainer.appendChild(dot);
    });
    
    const dots = Array.from(indicatorsContainer.children);
    let currentIndex = 0;
    let autoPlayTimer;

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        currentIndex = index;
    }

    function nextSlide() {
        let index = currentIndex + 1;
        if(index >= slides.length) index = 0;
        goToSlide(index);
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Event Listeners for Pause on Hover
    const container = document.querySelector(".carousel-container");
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);

    // Initial Start
    startAutoPlay();
}
