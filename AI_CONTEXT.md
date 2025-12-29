# Project Context: G.T. Metalworks

## Tech Stack
- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6).
- **Hosting**: GitHub Pages (Static hosting compatibility is required).
- **Forms**: Formspree (No backend server).

## Directory Structure
- **Root (`/`)**: Main entry point (`index.html`) and review page (`leave-review.html`).
- **`pages/`**: Organized by feature (e.g., `projects/`, `services/`, `about/`, `contact/`).
  - *Note: Sub-pages link to assets using `../../assets/`.*
- **`assets/`**:
  - `css/`: `styles.css` (Main variables & layout), `review.css` (Specific to review page).
  - `js/`: `main.js` (Global logic), `partials.js` (Key for navigation).
  - `img/`: All site images (flat structure).
- **`partials/`**: Contains `header.html` and `footer.html` for reuse.

## Key Mechanisms (Crucial for AI)
1. **Navigation & Partials**:
   - The Header and Footer are **injected via JavaScript** (`assets/js/partials.js`).
   - **IMPORTANT**: If you change the valid HTML in `partials/header.html`, you **MUST ALSO** update the fallback string `const NAV_HTML` inside `assets/js/partials.js`. If you don't, changes won't show up on GitHub Pages sometimes due to pathing fallbacks.
2. **CSS System**:
   - Uses CSS Variables (`var(--primary-color)`, `var(--bg-dark)`, etc.) defined in `styles.css`.
   - Dark mode is the absolute default.
3. **Project Content**:
   - Projects are hardcoded HTML cards in `pages/projects/projects.html`.
   - Filtering is done via `data-category` attributes + JS.

## Recent Updates
- "Leave a Review" feature added (`leave-review.html`) linked to Formspree.
- Services pages expanded with image galleries.
- "Chi Siamo" updated with team photo.

## Tip for Acting as a Developer
If asking an AI to change the menu, always say: *"Update both the header.html file AND the partials.js string."*
