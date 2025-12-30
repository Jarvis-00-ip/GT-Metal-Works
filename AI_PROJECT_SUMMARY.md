# G.T. METALWORKS - PROJECT STRUCTURE & ARCHITECTURE
> **Generated for AI Context Analysis**
> **Date:** December 2025
> **Stack:** Vanilla HTML5, CSS3, JavaScript (ES6)

## 1. PROJECT OVERVIEW
**G.T. Metalworks** is a high-end automotive workshop website behaving like a Single Page Application (SPA) feel but built with static files.
- **Aesthetic:** "Dark Premium", Automotive, Minimalist, High-Contrast (Red/Dark Grey).
- **Core Goal:** Showcase high-end restoration and tuning engineering.

## 2. FILE SYSTEM ARCHITECTURE

### Root Directory
- `index.html`: Main landing page (Hero, Services Grid, Zig-Zag Projects, Testimonials).
- `AI_CONTEXT.md`: (Optional) Context file for agent sessions.

### Assets (`/assets`)
#### CSS (`/assets/css`)
- `styles.css`: **GLOBAL STYLESHEET**. Contains:
  - **Variables (`:root`)**: Colors (`--bg-dark`, `--accent-red`), Spacing, Shadows.
  - **Reset & Typography**: Global font definitions (Oswald, Inter).
  - **Components**: `.btn`, `.card`, `.hero-fullscreen`.
  - **Layouts**: `.container`, `.grid`, `.featured-row` (Zig-Zag).
  - **Animations**: `.reveal-left`, `.reveal-right`, `.visible`.
  - **Media Queries**: Mobile responsiveness (< 900px).

#### JS (`/assets/js`)
- `main.js`: **CORE LOGIC**.
  - **DOM Ready**: Initializes all modules.
  - **IntersectionObserver**: Handles scroll animations (`initScrollAnimations`).
  - **Theme Toggle**: Manages Dark/Light mode logic (localStorage).
  - **Carousels**: Logic for testimonials or gallery sliders.
- `partials.js`: **COMPONENT INJECTION**.
  - Stores `NAV_HTML` and `FOOTER_HTML` as strings.
  - Injects specific HTML into `<header>` and `<footer>` tags on every page invocation to simulate extensive templating without a backend.
- `nav-scroll.js`: Handles sticky header behavior on scroll.

#### Images (`/assets/img`)
- Stores project images (`mitsubishi.jpg`, `corvette.jpg`, etc.) and icons.

### Partials (`/partials`)
*Source files for `partials.js`. Do not link properly in production, used for dev reference.*
- `header.html`: Source code for the Navigation Bar.
- `footer.html`: Source code for the Footer.

### Pages (`/pages`)
- Subdirectories for specific projects or services (e.g., `projects/projects.html`, `contact/contact.html`).

## 3. KEY DESIGN PATTERNS

### CSS Variables (Theming)
The site relies heavily on CSS variables for consistent theming.
```css
:root {
    --bg-dark: #0a0a0a;       /* Main Background */
    --bg-card: #141414;       /* Card/Section Background */
    --accent-red: #e31b23;    /* Primary Action Color */
    --text-heading: #ffffff;  /* Headings */
    --text-body: #b0b0b0;     /* Body Text */
}
```

### Component Injection System
Instead of repeating Header/Footer HTML on every page, `partials.js` injects them:
```javascript
// assets/js/partials.js
const NAV_HTML = `...`;
document.querySelector('#main-header').innerHTML = NAV_HTML;
```

### Scroll Animation System
Elements animate correctly using a class-based observer system:
1.  **HTML**: Add class `.reveal-left` or `.reveal-right`.
2.  **JS**: `IntersectionObserver` triggers when element enters viewport.
3.  **CSS**: Transforms element from `translateX(-100px)` to `0`.

### Featured Engineering Layout (Zig-Zag)
A specific layout pattern for the homepage showcase:
- **Container**: `.featured-row` (Flexbox).
- **Columns**: `.text-col` and `.img-col`.
- **Alternation**: CSS `nth-child(even)` sets `flex-direction: row-reverse`.
- **Mobile**: Stacks vertically via Media Query.

## 4. CRITICAL CLASSES & ID
- `section`: Standard padding container.
- `container`: Center max-width wrapper.
- `btn btn-primary / btn-accent`: Standard button styles (No underlines!).
- `tech-card`: Service items in the "Workshop" grid.
- `reveal-on-scroll` (Deprecating) / `reveal-left/right`: Animation triggers.

## 5. RECENT CHANGES (Context)
- **Header**: Fixed z-index overlap with Hero.
- **Featured Section**: Implemented Zig-Zag layout with "Side-In" animations.
- **Cleanups**: Removed underlines from generic links, fixed brace syntax errors in CSS.
