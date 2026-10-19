# AI Knowledge Base: Mohammed Abdullah — Portfolio (`mu7med.org`)

> **Purpose of this Document:**
> This file is the single source of truth for AI coding agents and developers working on this repository. Read this file first to understand the entire architecture, DOM structure, design tokens, JavaScript modules, testing setup, deployment pipeline, and owner preferences **without needing to rescan the codebase**.

---

## 1. Project & Owner Overview

- **Owner:** Mohammed Abdullah — Senior DevOps Engineer & Cloud Architect (15+ years of enterprise experience).
- **Location:** Qurtubah, Riyadh, Kingdom of Saudi Arabia (KSA).
- **Contact:** `mu7med@outlook.com` | `+966 50 172 0250` | [GitHub (`mu7med`)](https://github.com/mu7med) | [LinkedIn](https://www.linkedin.com/in/mohammed--abdullah)
- **Live URL:** [https://mu7med.org/](https://mu7med.org/) (configured via root `CNAME` file).
- **GitHub Repository:** `https://github.com/mu7med/CV` (default branch: `master`).
- **Deployment:** Automated GitHub Actions workflow (`.github/workflows/main.yml`) deploying static assets to GitHub Pages on push to `master` or `main`.

---

## 2. Complete Repository Structure

```text
CV-master/
├── index.html                  # Single-page application entry point (~1,418 lines)
├── CNAME                       # Custom domain binding: mu7med.org
├── Resume.pdf                  # Current downloadable CV linked from #mh-about
├── Old_Resume.pdf              # Legacy CV archive
├── AI_Read_Me.md               # This comprehensive AI architectural knowledge base
├── package.json                # Dev dependencies (@playwright/test)
├── playwright.config.js        # Playwright E2E configuration (Chrome channel + static server on :8000)
├── .gitignore                  # Ignores node_modules, test-results, playwright-report, .env*, env-config.js
├── .github/
│   └── workflows/
│       └── main.yml            # GitHub Pages CI/CD workflow (triggers on push to ["main", "master"])
├── .agent/
│   ├── rules/                  # Workspace engineering & design rules
│   │   ├── 01-css-architecture.md
│   │   ├── 02-glassmorphism-ux.md
│   │   └── 03-performance-accessibility.md
│   └── skills/                 # Installed AI agent skills (UI/UX, 3D/WebGL, Spatial AR/VR, Playwright, etc.)
├── assets/
│   ├── css/
│   │   ├── styles.css          # Primary stylesheet (~5,055 lines: base template + Dark/Light + Spatial 3D UI)
│   │   ├── responsive.css      # Breakpoint media queries (max-width: 1400px, 991px, 768px, 575px, 420px)
│   │   └── colors/             # Legacy color stylesheets (defauld.css loaded by default)
│   ├── js/
│   │   ├── spatial-3d.js       # 3D Cloud/K8s Hero Topology Canvas, AR/VR Pointer Tilt, Spotlight & Scroll HUD
│   │   ├── theme-toggle.js     # Dark/Light theme switcher, localStorage persistence, hero image swap, custom event
│   │   ├── experience.js       # Master-Detail controller for Work Experience (auto-opens latest role)
│   │   ├── map-init.js         # Security-hardened Google Maps loader (reads key from runtime env config only)
│   │   └── custom-scripts.js   # jQuery plugin initialization (WOW.js, Isotope, CircleProgress, Fancybox, Nav)
│   ├── images/
│   │   ├── profile-hero.webp   # Hero profile image (Dark Mode)
│   │   ├── profile-hero-w.png  # Hero profile image (Light Mode)
│   │   ├── home-bg-img.jpg     # Hero background texture
│   │   └── map-color-overlay.png # Contact footer background map texture
│   ├── icons/
│   │   └── font-awesome-4.7.0/ # Local FontAwesome 4.7.0 icon font & CSS
│   └── plugins/                # Third-party CSS/JS plugins (Bootstrap 4, jQuery, Owl, Fancybox, Isotope, WOW)
├── DevOps_and_cloud/           # 10 DevOps, Kubernetes (CKA/CKS), OCI, AWS, Azure, ArgoCD, Terraform cert images
├── System/                     # 5 RedHat (RHCSA, OpenShift, Ansible), Linux, ITIL cert images
├── Network_Certificates/       # 8 Cisco (CCNP Enterprise, R&S, Specialist, CCNA), Junos, Palo Alto cert images
└── tests/
    └── theme-toggle.spec.js    # 6 Playwright E2E tests covering themes, security, 3D canvas, About, Skills, Experience
```

---

## 3. Design System & Dual-Theme Architecture

The portfolio uses a **"Cloud Command Center & Spatial Glass"** aesthetic supporting two synchronized themes toggled via `#theme-toggle` and persisted in `localStorage` under `user-prefs`:

### 3.1 Theme Tokens (`assets/css/styles.css` lines 4546–4562)

| Token / Property | Dark Mode (`body.dark-vertion.black-bg` — Default) | Light Mode (`body.white-vertion`) |
| :--- | :--- | :--- |
| **Background** | `#100e17` / `#202026` | `#ffffff` / `#f8fafc` |
| **`--accent-primary`** | `#ffc107` (Cyber Gold) | `#00B9FF` (Malibu Azure Blue) |
| **`--accent-rgb`** | `255, 193, 7` | `0, 185, 255` |
| **`--surface-glass-bg`** | `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))` | `linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.45))` |
| **`--surface-glass-border`** | `rgba(255, 255, 255, 0.12)` | `rgba(0, 185, 255, 0.25)` |
| **Hero Portrait Image** | `assets/images/profile-hero.webp` | `assets/images/profile-hero-w.png` |
| **3D Topology Canvas Palette** | Gold (`#ffc107`) & Emerald (`#10b981`) nodes/pulses | Azure (`#00B9FF`) & Deep Blue (`#0077b5`) nodes/pulses |

### 3.2 Typography
Loaded via HTTPS from Google Fonts in `index.html`:
- **`--font-display` (`'Space Grotesk', 'Roboto', sans-serif`)**: Section headings (`h2`, `h3`, `h4`), counter values, and skill category labels.
- **`--font-mono` (`'JetBrains Mono', monospace`)**: Dates (`.mh-eduyear`), technology badges (`.tech-badge`), certificate filter counts (`.filter-count`), floating 3D badges (`.spatial-float-badge`), and action cues (`.card-action-cue`).
- **`--font-body` (`'Roboto', sans-serif`)**: Body paragraphs and bullet lists.

### 3.3 Spatial 3D & AR/VR Motion System (`assets/js/spatial-3d.js`)
- **3D Perspective Card Tilt**: Pointer movement over interactive cards sets `--rotate-x` and `--rotate-y` (`±5.5deg` max) for hardware-accelerated `perspective(900px) rotateX(...) rotateY(...)`.
- **Cursor Spotlight Border Illumination (`.hud-bracket`)**: Sets `--mouse-x` and `--mouse-y` in pixels, rendering a radial glow (`380px circle`) via `.hud-bracket::before`.
- **Accessibility & GPU Guardrails**:
  - Automatically disabled on touch-only devices (`window.matchMedia('(hover: none)')`) and when `prefers-reduced-motion: reduce` is active.
  - `@media (prefers-contrast: high)` strips `backdrop-filter` and enforces solid 2px borders.

---

## 4. Section-by-Section DOM & Component Reference

### 4.1 Header & Top Scroll HUD (`#mh-header`)
- `#scroll-progress-bar`: Fixed top 3px bar scaled via compositor-only `transform: scaleX(...)` on scroll.
- `.mh-header`: Has `z-index: 1000 !important` so desktop/mobile navigation and `#theme-toggle` always sit above `#mh-home`.
- `#theme-toggle`: Switches between Dark Mode (`fa-sun-o`) and Light Mode (`fa-moon-o`) and dispatches `window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }))`.

### 4.2 Hero Section (`#mh-home`)
- **Background 3D Canvas (`#hero-3d-canvas`)**: Interactive 3D perspective-projected infrastructure node mesh (`K8s (CKA/CKS)`, `OCI`, `AWS`, `Azure`, `ArgoCD`, `Terraform`, `Prometheus`, `Helm`, `Docker`, `DevSecOps`, `Linux`, `CI/CD`) with live data packet pulses along edges. Pauses automatically via `IntersectionObserver` when scrolled out of view.
- **Left Column (`.mh-header-info`)**:
  - Greeting badge (`Hello I'm`), `h2` (`Mohammed Abdullah`), `h4` (`Senior DevOps Engineer & Cloud Architect`), contact list (`mailto:`, `tel:`, `Qurtubah, Riyadh, KSA`), and social links.
  - *Owner Preference Note:* Do **NOT** add a green status box (`"SYSTEMS ONLINE · RIYADH, KSA"`) above the greeting badge—it was explicitly removed by user request.
- **Right Column (`.hero-orb-stage`)**:
  - 3D orb frame (`.img-border`) with 4 Z-translated floating badges (`.spatial-float-badge`):
    - Top-left: `CKS & CKA` (`fa-shield`)
    - Top-right: `Multi-Cloud` (`fa-cloud`)
    - Bottom-left: `15+ Yrs Exp` (`fa-cubes`)
    - Bottom-right: `GitOps & IaC` (`fa-code-fork`)

### 4.3 About Me Section (`#mh-about`)
- **Centered Full-Width Layout**:
  - Uses `.row.section-separator.vertical-middle-content.justify-content-center` with `.col-sm-12.col-lg-10` and `.mh-about-inner` centered (`padding-left: 0 !important; max-width: 880px; margin: 0 auto !important; text-align: center;`).
  - *Owner Preference Note:* The side images (`assets/images/About_me.png` and `assets/images/About_me_blue.png`) were explicitly deleted and removed from `#mh-about` and `theme-toggle.js`. Do **NOT** re-introduce side images in `#mh-about`.
- **Enhanced Typography**:
  - Heading `h2`: `clamp(2.15rem, 3.2vw, 2.75rem)`
  - Summary `p`: `clamp(1.15rem, 1.45vw, 1.35rem)`, `line-height: 1.8`, centered (`max-width: 820px`)
  - Skill Tag Pills (`.mh-about-tag`): Centered flex list with `15px` font size (`Kubernetes (CKA/CKS)`, `OCI / AWS / Azure`, `Terraform & Ansible`, `ArgoCD & GitOps`, `DevSecOps`, `Prometheus & Grafana`).
  - CTA Button: `Download CV` linking to `Resume.pdf`.
- **Executive Impact Metrics Bar (`.impact-metrics-row`)**:
  - 4 glassmorphic `.impact-metric-card.hud-bracket` cards with `IntersectionObserver` count-up animations (`.impact-counter-value[data-count]`):
    1. `15+` — Years Enterprise Exp
    2. `35%` — Faster Release Cycles
    3. `100%` — Tier-2/3 SLA Compliance
    4. `23` — Global Certifications

### 4.4 Skills Section (`#mh-skills`)
- **Left Column (`col-sm-12 col-md-7`) — Technical Skills (`.skills-bento-grid`)**:
  - 5 `.skill-bento-card.hud-bracket` items.
  - Each item uses `.skill-bento-icon` containing a direct, unboxed FontAwesome icon (`.fa`) colored to match the active theme (`#ffc107` in Dark Mode, `#00B9FF` in Light Mode) with `font-size: 24px` and subtle drop-shadow glow:
    1. `fa-terminal` — **Operation:** Advanced System Administration, Monitoring, Incident Management
    2. `fa-cloud` — **Cloud:** OCI, AWS, Azure, Hybrid Architectures
    3. `fa-cubes` — **Orchestration:** Kubernetes (CKA/CKS), Docker, Helm
    4. `fa-cogs` — **IaC & Automation:** Terraform, Ansible, Jenkins, ArgoCD
    5. `fa-shield` — **Security:** DevSecOps, Compliance, Network Security
  - *CSS Gotcha:* Line 1635 of `assets/css/styles.css` originally had `.mh-skills .work-responsibility li .fa { display: none; }` which hid the icons. It is now set to `display: inline-block;`, and `.skill-bento-icon` has `background: transparent; border: none;` so no empty rounded squares appear.
- **Right Column (`col-sm-12 col-md-5`) — Professional Skills**:
  - 4 radial SVG circle progress bars (`.mh-progress-circle`): `Communication (95%)`, `Team Work (92%)`, `Project Management (90%)`, `Creativity (88%)`.

### 4.5 Work Experience Section (`#mh-experience`)
Managed by `assets/js/experience.js` using a **Master-Detail Pattern**:
- **Master Grid (`.experience-grid`)**: 5 `.experience-card.hud-bracket` cards:
  1. `#card-malath` (`data-id="malath"`): **DevOps Engineer** — *Malath Insurance | Riyadh, KSA* (`June 2025 – Present`). Stack: `Azure DevOps`, `Liquibase`, `Oracle DB`, `SonarQube`, `IIS`.
  2. `#card-oracle` (`data-id="oracle"`): **Operations Engineer (Cloud & Infra)** — *Oracle | Dubai, UAE* (`May 2022 – Jan 2025`). Stack: `OCI`, `Kubernetes (OKE)`, `Terraform`, `Ansible`, `Prometheus`, `Grafana`, `Jenkins`, `GitLab CI`.
  3. `#card-cerner` (`data-id="cerner"`): **Senior System Engineer** — *Cerner Middle East | Dubai, UAE* (`Dec 2019 – May 2022`). Stack: `AWS`, `RHEL`, `HP-UX`, `Ansible`, `Shell Scripting`, `Citrix`.
  4. `#card-etisalat` (`data-id="etisalat"`): **Application Support Engineer** — *Etisalat | UAE* (`Feb 2016 – Dec 2019`). Stack: `Linux`, `Oracle SQL`, `PL/SQL`, `Java Apps`, `SOAP/REST`, `Nagios`.
  5. `#card-du` (`data-id="du"`): **System & Network Administrator** — *du Telecom | UAE* (`May 2012 – Jan 2016`). Stack: `Cisco IOS`, `Windows Server`, `Linux`, `VMware`, `Active Directory`.
- **Detail Container (`#experience-preview`)**:
  - Automatically opens `#card-malath` on page load (`showPreview(cards[0], false)`) without scrolling the viewport.
  - Supports mouse click and keyboard navigation (`tabindex="0"`, `role="button"`, `aria-expanded`, `Enter`/`Space` keys).

### 4.6 Certificates Gallery (`#mh-portfolio`)
- Filterable Isotope grid (`.mh-project-gallery`) with live counts in `.filter-count`:
  - **All Categories (`23`)** (`data-filter="*"`)
  - **DevOps & Cloud (`10`)** (`data-filter=".user-interface"`): CKS, CKA, ArgoCD/GitOps, OCI Architect Associate, OCI Foundations, Terraform, AWS Partner, Azure Admin, Aviatrix, DevOps Foundations.
  - **Systems (`5`)** (`data-filter=".ui"`): RHCSA, RedHat OpenShift, RedHat Ansible, Linux Foundation, ITIL v3.
  - **Networking (`8`)** (`data-filter=".branding"`): CCNP Enterprise, CCNP R&S, Cisco Enterprise Advanced Infrastructure, Cisco Enterprise Core, CCNA R&S, CCNA Security, Junos, Palo Alto ACE.
- Clicking any certificate opens its corresponding Fancybox modal (`#sk1`–`#sk10`, `#Sys1`–`#Sys5`, `#Cisco1`–`#Cisco8`).

### 4.7 Contact Section (`#mh-contact`) & OpenWidget ChatBot
- 3 glassmorphic `.mh-address-footer-item.hud-bracket` cards (Address: `Qurtubah, Riyadh, KSA`; Email: `mu7med@outlook.com`; Phone: `+966 50 172 0250`).
- OpenWidget customer chat script (`organizationId: "33fe7295-2937-4ca7-b200-4f5701bd5ab6"`).

---

## 5. Security, Testing & Known Technical Gotchas

### 5.1 Security Guardrail — No Hardcoded API Keys
- **Never** embed a Google Maps API key (`AIzaSy...`) in `index.html` or any committed JS file.
- `assets/js/map-init.js` checks if `#mh-map` exists and only loads Google Maps dynamically if `window.__ENV__.GOOGLE_MAPS_API_KEY` or `data-maps-api-key` is provided at runtime.
- `.env`, `.env.*`, and `assets/js/env-config.js` are listed in `.gitignore`.

### 5.2 WOW.js Visibility Override
- `WOW.js` sets `visibility: hidden` on `.wow` elements below the fold until scroll events fire.
- To ensure interactive elements and below-the-fold sections remain immediately accessible to users, screen readers, and automated tests, `assets/css/styles.css` enforces:
  ```css
  .mh-professional-skill.wow,
  .mh-professional-skills.wow,
  .mh-about .wow,
  .experience-card,
  .experience-card.wow {
    visibility: visible !important;
  }
  ```

### 5.3 Running Playwright E2E Verification Tests
- On Windows PowerShell, `npx.ps1` may be blocked by execution policy. Always run Playwright directly via Node:
  ```powershell
  node .\node_modules\@playwright\test\cli.js test
  ```
- `playwright.config.js` automatically starts a static HTTP server on `http://localhost:8000` and runs 6 E2E tests in `tests/theme-toggle.spec.js` using system Chrome (`channel: 'chrome'`).
- The 6 tests verify:
  1. Default Dark Mode initialization & `localStorage` state.
  2. Light Mode toggle (`body.white-vertion` & moon icon).
  3. Theme persistence across page reloads.
  4. Toggle back to Dark Mode.
  5. Absence of leaked `AIzaSy` keys, absence of `.hud-status-pill` and `About_me` images, centered `#mh-about` typography (`>= 18px`), and visibility + theme-color transitions (`rgb(255, 193, 7)` in Dark Mode &rarr; `rgb(0, 185, 255)` in Light Mode) of the 5 `.skill-bento-icon .fa` icons.
  6. Experience Master-Detail auto-open on `#card-malath` and dynamic switching to `#card-oracle`.
