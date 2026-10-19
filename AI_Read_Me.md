# AI Knowledge Base: Mohammed Abdullah — Portfolio (`mu7med.org`)

> **Purpose of this Document:**
> This file is the single source of truth for AI coding agents and developers working on this repository. Read this file first to understand the entire architecture, DOM structure, design tokens, JavaScript modules, testing setup, deployment pipeline, and owner preferences **without needing to rescan the codebase**.

---

## 1. Project & Owner Overview

- **Owner:** Mohammed Abdullah — **DevOps Engineer | Agentic AI & AgentOps** (15+ years of enterprise infrastructure experience + production autonomous agents, LLM routing, and MCP tooling).
- **Location:** Qurtubah, Riyadh, Kingdom of Saudi Arabia (KSA).
- **Contact:** `mu7med@outlook.com` | `+966 50 172 0250` | [GitHub (`mu7med`)](https://github.com/mu7med) | [LinkedIn](https://www.linkedin.com/in/mohammed--abdullah)
- **Live URL:** [https://mu7med.org/](https://mu7med.org/) (configured via root `CNAME` file).
- **GitHub Repository:** `https://github.com/mu7med/CV` (default branch: `master`).
- **Deployment:** Automated GitHub Actions workflow (`.github/workflows/main.yml`) deploying static assets to GitHub Pages on push to `master` or `main`.

### Non-Negotiable Content & Security Guardrails
1. **No Metric Inflation:** Never invent or inflate metrics. Use only numbers already present in the repo (`15+` years, `35%` faster release cycles, `100%` Tier-2/3 SLA compliance, `23` global certifications, `10+` model providers, `11` Telegram channels).
2. **Sanitized Enterprise Descriptions:** Never include employer-internal details (RBAC schemas, internal repo counts, business line names, or internal tooling specifics). Enterprise work is described strictly via sanitized one-liners.
3. **No Tool-Name Padding:** Only list technologies demonstrated in public repos (e.g., MCP, OpenAI-compatible LLM gateways, Tavily MCP, A2A, Tailscale, Python/Bash automation). Do not pad with frameworks not demonstrated in public repos.
4. **Zero Hardcoded Secrets:** Never print, commit, or log any API key (`AIza`, `sk-`, `ghp_`, `eyJ`, `password=`, `token=`).

---

## 2. Complete Repository Structure

```text
CV-master/
├── index.html                  # Single-page application entry point (~1,645 lines)
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
│   │   ├── styles.css          # Primary stylesheet (~5,500 lines: base template + Dark/Light + Spatial 3D + Agentic UI)
│   │   ├── responsive.css      # Breakpoint media queries (max-width: 1400px, 991px, 768px, 575px, 420px)
│   │   └── colors/             # Legacy color stylesheets (defauld.css loaded by default)
│   ├── js/
│   │   ├── spatial-3d.js       # 3D Cloud/AgentOps Hero Topology Canvas, AR/VR Tilt, Spotlight, Scroll HUD & Cert Accordion
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
├── DevOps_and_cloud/           # 11 DevOps, Kubernetes (CKA/CKS), Prometheus (PCA), OCI, AWS, Azure, ArgoCD, Terraform cert images
├── System/                     # 5 RedHat (RHCSA), VMware (VCP6), Microsoft (MCP, MCSA 2012, MCITP 2008) cert images
├── Network_Certificates/       # 7 Cisco (CCNP Enterprise, CCNP R&S, Specialist, CCNA R&S, CCNA Security), FortinetNSE2, Avaya cert images
└── tests/
    └── theme-toggle.spec.js    # 7 Playwright E2E tests covering themes, security, 3D canvas, Agentic Systems, Skills, Certs Accordion, Experience
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
- **`--font-display` (`'Space Grotesk', 'Roboto', sans-serif`)**: Section headings (`h2`, `h3`, `h4`), counter values, and skill/system card titles.
- **`--font-mono` (`'JetBrains Mono', monospace`)**: Dates (`.mh-eduyear`), technology badges (`.tech-badge`, `.agentic-stack-badges`), certificate filter counts (`.filter-count`), floating 3D badges (`.spatial-float-badge`), and action cues (`.card-action-cue`).
- **`--font-body` (`'Roboto', sans-serif`)**: Body paragraphs and bullet lists.

### 3.3 Spatial 3D & AR/VR Motion System (`assets/js/spatial-3d.js`)
- **3D Perspective Card Tilt**: Pointer movement over interactive cards (`.experience-card`, `.skill-bento-card`, `.agentic-system-card`, `.in-progress-cert-card`, `.agentops-guardrails-callout`, `.mh-address-footer-item`, `.impact-metric-card`, `.mh-project-gallery .grid-item figure`) sets `--rotate-x` and `--rotate-y` (`±5.5deg` max) for hardware-accelerated `perspective(900px) rotateX(...) rotateY(...)`.
- **Cursor Spotlight Border Illumination (`.hud-bracket`)**: Sets `--mouse-x` and `--mouse-y` in pixels, rendering a radial glow (`380px circle`) via `.hud-bracket::before`.
- **Accessibility & GPU Guardrails**:
  - Automatically disabled on touch-only devices (`window.matchMedia('(hover: none)')`) and when `prefers-reduced-motion: reduce` is active.
  - `@media (prefers-contrast: high)` strips `backdrop-filter` and enforces solid 2px borders.

---

## 4. Section-by-Section DOM & Component Reference

### 4.1 Header & Top Scroll HUD (`#mh-header`)
- `#scroll-progress-bar`: Fixed top 3px bar scaled via compositor-only `transform: scaleX(...)` on scroll.
- `.mh-header`: Has `z-index: 1000 !important` so desktop/mobile navigation (`Home`, `About`, `Agentic Systems`, `Skills`, `Experiences`, `Certificates`, `Contact`) and `#theme-toggle` always sit above `#mh-home`.
- `#theme-toggle`: Switches between Dark Mode (`fa-sun-o`) and Light Mode (`fa-moon-o`) and dispatches `window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }))`.

### 4.2 Hero Section (`#mh-home`)
- **SEO Title & Meta**:
  - `<title>`: `Mohammed Abdullah | DevOps Engineer — Agentic AI & AgentOps`
  - `<meta name="description">`: `DevOps Engineer in Riyadh specializing in agentic AI, MCP servers, multi-agent orchestration, and production Kubernetes & cloud infrastructure automation.` (154 chars).
- **Background 3D Canvas (`#hero-3d-canvas`)**: Interactive 3D perspective-projected infrastructure & AgentOps node mesh (`K8s (CKA/CKS)`, `MCP`, `AgentOps`, `LLM Gateway`, `RAG`, `OCI`, `AWS`, `Azure`, `ArgoCD`, `Terraform`, `Prometheus`, `Helm`, `Docker`, `CI/CD`) with live data packet pulses along edges. Pauses automatically via `IntersectionObserver` when scrolled out of view.
- **Left Column (`.mh-header-info`)**:
  - Greeting badge (`Hello I'm`), `h1` (`Mohammed Abdullah`), `h4` (`DevOps Engineer | Agentic AI & AgentOps`), contact list (`mailto:`, `tel:`, `Qurtubah, Riyadh, KSA`), and social links.
  - *Owner Preference Note:* Do **NOT** add a green status box (`"SYSTEMS ONLINE · RIYADH, KSA"`) above the greeting badge—it was explicitly removed by user request.
- **Right Column (`.hero-orb-stage`)**:
  - 3D orb frame (`.img-border`) with 4 Z-translated floating badges (`.spatial-float-badge`):
    - Top-left: `CKS & CKA` (`fa-shield`)
    - Top-right: `Agentic AI & MCP` (`fa-microchip`)
    - Bottom-left: `15+ Yrs Exp` (`fa-cubes`)
    - Bottom-right: `GitOps & IaC` (`fa-code-fork`)

### 4.3 About Me Section (`#mh-about`)
- **Centered Full-Width Layout**:
  - Uses `.row.section-separator.vertical-middle-content.justify-content-center` with `.col-sm-12.col-lg-10` and `.mh-about-inner` centered (`padding-left: 0 !important; max-width: 880px; margin: 0 auto !important; text-align: center;`).
  - *Owner Preference Note:* Side images (`About_me.png` / `About_me_blue.png`) were explicitly deleted and removed from `#mh-about`. Do **NOT** re-introduce side images in `#mh-about`.
- **Positioning Copy**:
  - First-person summary (88 words) combining 15+ years of mission-critical enterprise infrastructure across Oracle, Cerner, and insurance enterprise DevOps in Riyadh with daily production operations of autonomous agents, multi-agent systems, LLM routing, and Model Context Protocol (MCP) tooling.
  - Includes verbatim positioning statement: *"I build autonomous systems on top of production-grade infrastructure discipline — the part of AI projects that usually kills them."*
- **Skill Tag Pills (`.mh-about-tag`)**: `Agentic AI & MCP`, `Multi-Agent Orchestration`, `Kubernetes (CKA/CKS)`, `OCI / AWS / Azure`, `Terraform & GitOps`, `Prometheus (PCA) & AgentOps`.
- **Executive Impact Metrics Bar (`.impact-metrics-row`)**:
  - 4 glassmorphic `.impact-metric-card.hud-bracket` cards (`15+` Years Enterprise Exp, `35%` Faster Release Cycles, `100%` Tier-2/3 SLA Compliance, `23` Global Certifications).

### 4.4 Featured Agentic Systems Section (`#mh-agentic-systems`)
Inserted between `#mh-about` and `#mh-skills`. Renders 4 `.agentic-system-card.hud-bracket` cards in a 2x2 responsive grid (`.agentic-systems-grid`):
1. **Multi-Provider LLM Gateway with Cost FinOps** (`#agentic-card-gateway`, `fa-exchange`): OpenAI-compatible gateway routing across 10+ model providers with health-probed fallback chains, complexity-aware escalation, and per-model token/cost accounting.
2. **Autonomous Web-Intelligence Research Agent** (`#agentic-card-research`, `fa-globe`): Tavily MCP-powered deep-research agent that discovers emerging tech, extracts structured telemetry, and maintains a machine-readable knowledge vault.
3. **24/7 Telegram Monitoring & Alerting Agent** (`#agentic-card-telegram`, `fa-telegram`): Multi-channel monitoring (11 channels), scheduled sweeps, voice-note transcription (Arabic/English STT), and filtered alerting running continuously on edge hardware (Android/Termux).
4. **Cross-Device Agent Fleet (A2A + MCP)** (`#agentic-card-fleet`, `fa-sitemap`): Self-hosted multi-agent system coordinating agents across Termux, Windows, and WSL over agent-to-agent protocols with SSH/Tailscale fallbacks.
- Each card includes stack badges (`.agentic-stack-badges`) and clearly marked placeholder links (`GitHub Repo [TODO]`, `Architecture Writeup [TODO]`).

### 4.5 Skills Section (`#mh-skills`)
- **Left Column (`col-sm-12 col-md-7`) — Technical Skills (`.skills-bento-grid`)**:
  - **6** `.skill-bento-card.hud-bracket` items.
  - Each item uses `.skill-bento-icon` containing a direct, unboxed FontAwesome icon (`.fa`) colored to match the active theme (`#ffc107` in Dark Mode, `#00B9FF` in Light Mode):
    1. `fa-microchip` — **Agentic AI & Orchestration:** MCP Server Architecture, Multi-Agent Workflows, LLM Gateways & Fallback Routing, Agentic Search / RAG, Tool Calling, Agent Observability, Python & Bash Automation
    2. `fa-terminal` — **Operation:** Advanced System Administration, Monitoring, Incident Management, Workflow Automation
    3. `fa-cloud` — **Cloud:** OCI, AWS, Azure, Hybrid Architectures
    4. `fa-cubes` — **Orchestration:** Kubernetes (CKA/CKS), Docker, Helm
    5. `fa-cogs` — **IaC & Automation:** Terraform, Ansible, Jenkins, ArgoCD, Python Automation
    6. `fa-shield` — **Security:** DevSecOps, Sandboxed Runtime Governance, Network Security
- **Right Column (`col-sm-12 col-md-5`) — Professional Skills**:
  - 4 radial SVG circle progress bars (`.mh-progress-circle`): `Communication (95%)`, `Team Work (92%)`, `Project Management (90%)`, `Creativity (88%)`.

### 4.6 Work Experience Section (`#mh-experience`)
Managed by `assets/js/experience.js` using a **Master-Detail Pattern**:
- **Master Grid (`.experience-grid`)**: 5 `.experience-card.hud-bracket` cards:
  1. `#card-malath` (`data-id="malath"`): **DevOps Engineer** — *Malath Insurance | Riyadh, KSA* (`June 2025 – Present`). Includes sanitized enterprise CI/CD workflow automation and branch governance bullet across a large Azure DevOps estate.
  2. `#card-oracle` (`data-id="oracle"`): **Operations Engineer (Cloud & Infra)** — *Oracle | Dubai, UAE* (`May 2022 – Jan 2025`).
  3. `#card-cerner` (`data-id="cerner"`): **Senior System Engineer** — *Cerner Middle East | Dubai, UAE* (`Dec 2019 – May 2022`).
  4. `#card-etisalat` (`data-id="etisalat"`): **Application Support Engineer** — *Etisalat | UAE* (`Feb 2016 – Dec 2019`).
  5. `#card-du` (`data-id="du"`): **System & Network Administrator** — *du Telecom | UAE* (`May 2012 – Jan 2016`).

### 4.7 Certificates Gallery (`#mh-portfolio`)
- **Filter Tabs (`#filter-button`)**:
  - **All Categories (`18`)** (`data-filter="*"`)
  - **AI & Agentic (`2`)** (`data-filter=".ai-agentic"`):
    - **NVIDIA NCP-AAI** (`Agentic AI LLMs Professional`) — `.in-progress-cert-card` with `IN PROGRESS · 2026` badge.
    - **Microsoft Azure AI Engineer (AI-102)** (`Azure AI Solutions, RAG & Agentic Workflows`) — `.in-progress-cert-card` with `IN PROGRESS · 2026` badge.
  - **DevOps and cloud (`10`)** (`data-filter=".user-interface"`): CKS, CKA, PCA (Prometheus), OCI DevOps Professional, OCI Architect Associate, OCI Foundations, ArgoCD/GitOps, Terraform, AWS Partner, Azure Admin.
  - **System (`1`)** (`data-filter=".branding"`): RedHat Certified System Administrator (RHCSA).
  - **Network Certificates (`5`)** (`data-filter=".mockup"`): CCNP Enterprise, Cisco Enterprise Advanced Infrastructure, Cisco Enterprise Core, Junos, Palo Alto ACE.
- **AgentOps & Guardrails Callout (`.agentops-guardrails-callout`)**:
  - Positioned directly below `.mh-project-gallery`, explaining how **CKS** maps directly to sandboxed agent execution and runtime isolation, while **PCA (Prometheus)** maps to LLM/agent observability, token telemetry, and latency SLOs.
- **Earlier Certifications (Pre-2016) Accordion (`#earlier-certs-accordion`)**:
  - Accessible toggle button (`#earlier-certs-toggle`, `aria-expanded="false"`, `aria-controls="earlier-certs-panel"`) handled by `initCertAccordion()` in `assets/js/spatial-3d.js`.
  - Contains all **7** pre-2016 foundational certifications without deleting any of them (`MCP`, `MCSA 2012`, `MCITP 2008`, `VMware VCP6`, `CCNA R&S`, `CCNA Security`, `CCNP R&S`), preserving their Fancybox modal links (`#Sys2`–`#Sys5`, `#Cisco1`–`#Cisco3`).

### 4.8 Contact Section (`#mh-contact`) & OpenWidget ChatBot
- 3 glassmorphic `.mh-address-footer-item.hud-bracket` cards (Address: `Qurtubah, Riyadh, KSA`; Email: `mu7med@outlook.com`; Phone: `+966 50 172 0250`).
- OpenWidget customer chat script (`organizationId: "33fe7295-2937-4ca7-b200-4f5701bd5ab6"`).

---

## 5. Security, Testing & Known Technical Gotchas

### 5.1 Security Guardrail — No Hardcoded API Keys
- **Never** embed a Google Maps API key (`AIzaSy...`) or any secret (`sk-`, `ghp_`, `eyJ`) in `index.html` or any committed JS file.
- `assets/js/map-init.js` checks if `#mh-map` exists and only loads Google Maps dynamically if `window.__ENV__.GOOGLE_MAPS_API_KEY` or `data-maps-api-key` is provided at runtime.

### 5.2 Running Playwright E2E Verification Tests
- Always run Playwright directly via Node:
  ```powershell
  node .\node_modules\@playwright\test\cli.js test
  ```
- `tests/theme-toggle.spec.js` runs **7** E2E tests verifying Dark/Light mode, persistence, absence of leaked secrets, centered `#mh-about` typography, 6 theme-colored `.skill-bento-icon .fa` icons, the 4 Featured Agentic Systems cards, the In-Progress AI certifications + AgentOps callout + Earlier Certifications accordion toggle, Experience Master-Detail switching, and zero browser console errors.
