# AI Knowledge Base: Developer Portfolio Project

## 1. Project Overview
This project is a high-performance personal portfolio website for a Senior DevOps Engineer. It highlights professional experience, technical skills, and certifications through a modern, responsive, and interactive interface.

**Core Technologies:**
- **HTML5:** Semantic structure including `section`, `header`, `nav`.
- **CSS3:** Custom styling with a specific focus on **Dark Mode** and **Glassmorphism**.
- **JavaScript (Vanilla):** Custom logic for Master-Detail interactions (`experience.js`).
- **Libraries:** Bootstrap 4 (Grid/Layout), jQuery (Legacy plugins support), Owl Carousel (Sliders), Fancybox (Modals), WOW.js (Reveal animations).

## 2. Architecture & File Structure
```
/root
├── index.html              # Main entry point (One-page application)
├── Resume.pdf              # Downloadable CV asset
├── assets/
│   ├── css/
│   │   ├── styles.css      # MAIN stylesheet (Design System & Overrides)
│   │   ├── responsive.css  # Media queries for mobile/tablet
│   │   └── colors/         # Color theme definitions (Yellow is active)
│   ├── js/
│   │   ├── experience.js   # Custom Master-Detail logic for Work Experience
│   │   ├── custom-scripts.js # General template scripts (Nav, Preloader)
│   │   └── map-init.js     # Google Maps initialization
│   ├── images/             # Static assets (Profile, Backgrounds)
│   └── icons/              # FontAwesome & Glyphicons
└── [Certificate Folders]   # Subdirectories for certificate images (e.g., DevOps_and_cloud)
```

## 3. Design System
The visual identity is built on a "Cyberpunk/DevOps" aesthetic, defined by dark backgrounds, neon accents, and transparency effects.

### 3.1 Color Palette
- **Background:** `#202026` (Dark Gray/Black)
- **Primary Accent:** `rgba(255, 193, 7, 0.9)` (Yellow `#ffc107` matching the 'yellow' theme file).
- **Text Body:** `#999999` (Light Gray)
- **Text Headings:** `#ffffff` (White)
- **Glass Border:** `rgba(255, 255, 255, 0.2)`

### 3.2 Typography
- **Primary Font:** `Roboto` (Google Fonts).
- **Headings:** Bold weights (700).
- **Body:** Standard weight (400/500).

### 3.3 UI Patterns
- **Glassmorphism:** Used extensively on cards and borders to create depth.
  - *CSS Implementation:* `backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);`
  - *Locations:* Profile Image Border, Contact Cards (`.mh-address-footer-item`), Experience Preview Container.

## 4. Component Deep Dive

### 4.1 Header & Navigation
- **Fixed Top Nav:** `.mh-header` with `.black-bg`.
- **Responsive:** Collapses into a hamburger menu on generic mobile screens (Bootstrap standard).

### 4.2 Hero Section (`#mh-home`)
- **Profile Image:** (`.hero-img .img-border`) wrapped in a 3D-style glass border.
- **Animations:** Elements slide up using WOW.js (`fadeInUp`).

### 4.3 Experience Section (`#mh-experience`) - *Highly Customized*
This section implements a **Master-Detail Pattern** instead of a static list.
- **Grid Layout:** `.experience-grid` contains summaries (`.experience-card`).
- **Hidden Content:** Each card contains a `.card-details.hidden-content` div holding the detailed description and tech stack.
- **Preview Container:** `#experience-preview` is a dynamic container injected below the grid.
- **Interaction:**
  1. User clicks a card.
  2. `experience.js` extracts data (Role, Company, Date, Core Focus, Details).
  3. Pre-formatted HTML from `.card-details` is cloned into `#experience-preview`.
  4. The container expands and scrolls into view.

### 4.4 Portfolio/Certificates (`#mh-portfolio`)
- **Structure:** Grid of `.grid-item` elements sorted by category classes (`.user-interface`, `.branding`, etc.).
- **Hover Effect:**
  - **Selector:** `.mh-project-gallery .grid-item figure:hover figcaption`
  - **Visuals:** Background becomes **Yellow** (`rgba(255, 193, 7, 0.9)`).
  - **Typography:** Text remains **White** (`#fff`) with NO shadow/outline.
- **Modal:** Uses Fancybox (`data-fancybox`) to show full-size certificate images.

### 4.5 Contact Section (`#mh-contact`)
- **Layout:** Standard two-column (Form + Contact Info).
- **Contact Cards:** `.mh-address-footer-item`
  - **Style:** 3D Glass visuals, rounded corners (`15px`), hover lift effect.
  - **Address:** "Qurtubah, Riyadh, KSA".

## 5. Operational Logic (JavaScript)
**File:** `assets/js/experience.js`
- **Toggle Logic:** Clicking an active card closes the preview (`fadeOut`).
- **Data Extraction:** Uses `textContent` for text and `innerHTML` for complex blocks (lists/badges).
- **Normalization:** Cleans up whitespace from extracted text (`replace(/\s+/g, ' ').trim()`).
- **Smooth Scroll:** Automatically centers the preview container if it falls out of the viewport.

## 6. Maintenance Guide

### How to Update Experience
1. **Open** `index.html`.
2. **Locate** `.experience-grid` inside `#mh-experience`.
3. **Duplicate** a `.card-wrapper` block to add a new role.
4. **Update IDs:** Change `id="card-..."` and `data-id="..."` to be unique.
5. **Content:**
   - Modify the visible summary in `.header-content`.
   - Update the detailed bullets and tech stack in `.card-details`.

### How to Update Certificates
1. **Open** `index.html` to `#mh-portfolio`.
2. **Add** a new `div` with class `grid-item` and the appropriate category class (e.g., `user-interface` for DevOps).
3. **Update Paths:** Set `src` for the thumbnail and `href` for the Fancybox modal.
4. **Caption:** Update `.title` and `.sub-title`.

### CSS Customization
1. **Global Styles:** Edit `assets/css/styles.css`.
2. **Theme Color:** Search for `#ffc107` or `rgba(255, 193, 7, ...)` references or update `assets/css/colors/yellow.css` if strictly using the switcher dynamics (though inline styles currently use hardcoded yellow).

