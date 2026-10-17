---
name: graphic-web-design
description: Master of high-impact visual design, typography, brand aesthetics, and graphic craft for developer portfolios and tech platforms. Use when designing, redesigning, or refining visual layouts, color harmony, typography hierarchies, icon systems, graphic assets, HUD/terminal micro-aesthetics, and high-tech branding.
---

# Graphic & Web Design Mastery

This skill elevates web applications and portfolios from standard templates into bespoke, unforgettable digital experiences through graphic craft, visual hierarchy, and cohesive art direction.

---

## 1. Aesthetic Direction: High-Tech DevOps & Cloud Identity

For a Senior DevOps Engineer & Cloud Architect portfolio, avoid both generic Bootstrap templates and overdone "neon slop." Instead, execute an authentic **Precision Engineering / Modern Cyber-Architect** visual identity:

- **Dominant Base (Obsidian & Deep Graphite):**
  - Dark Canvas: `#0c0d12` to `#16171f` (rich dark obsidian, not flat `#000000` or washed-out grey).
  - Surface Glass: `rgba(255, 255, 255, 0.03)` with specular borders `rgba(255, 255, 255, 0.08)` to `rgba(255, 193, 7, 0.3)`.
- **Primary Energy Accents (Controlled Luminescence):**
  - Dark Theme: Cyber Amber Gold (`#ffc107` / `rgba(255, 193, 7, 0.95)`).
  - Light Theme: Electric Malibu Cyan (`#00B9FF` / `rgba(0, 185, 255, 0.95)`).
  - Auxiliary Accents: Terminal Emerald (`#10b981`) for uptime/status, High-frequency Violet (`#8b5cf6`) for multi-cloud synergy.
- **Micro-Graphic Details (The "DevOps HUD"):**
  - Grid lines, subtle dot matrices, coordinate stamps (`LAT/LONG`, server node IDs), hairline dividers.
  - Active status badges (e.g. glowing pulsing green dot for "Open to Architect Roles" or "Live Systems Operating").

---

## 2. Typography & Typographic Scale

- **Display & Monospace Contrast:**
  - Headings: Bold, architectural sans-serif (e.g., `Space Grotesk`, `Syne`, or modern weights of `Cabinet Grotesk` / `Outfit`).
  - Monospace Accents: Code tokens, stats, metrics, dates, and labels styled in high-readability monospace (`JetBrains Mono`, `Fira Code`, or `SF Mono`).
  - Body: Flawless neutral grotesque (`Plus Jakarta Sans`, `Inter`, `Roboto`) optimized for legibility.
- **Fluid Scale (`clamp`):**
  - Never use rigid static font sizes for major headings. Use fluid clamping:
    ```css
    --font-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);
    --font-h2: clamp(1.8rem, 3vw + 0.8rem, 2.75rem);
    --font-h3: clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem);
    ```

---

## 3. Visual Depth & Surface Architecture

1. **Layer 0 (Infinite Depth):** Dynamic deep gradient mesh or WebGL particle/starfield canvas.
2. **Layer 1 (Macro Grid):** Structural layout containers with hairline borders (`1px solid rgba(255, 255, 255, 0.06)`).
3. **Layer 2 (Interactive Floating Glass):** Cards, modals, preview containers featuring multi-stop linear gradients:
   ```css
   background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%);
   backdrop-filter: blur(20px);
   -webkit-backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.12);
   box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
   ```
4. **Layer 3 (Overlays & Glows):** Contextual radial glow that tracks user focus, highlighting active skills or cards.

---

## 4. Graphic Assets & Iconography

- **Sharp Vector SVGs:** Always prefer clean, inline SVGs with crisp viewBoxes over dated bitmap icons.
- **Duotone & Glowing Badge Accents:** Tech badges (e.g., Kubernetes, OCI, AWS, ArgoCD) should have dedicated brand accents and subtle luminous glow on hover.
- **Negative Space & Focus:** Group related information tightly and give key achievements (e.g. "15+ Years", "35% Faster CI/CD", "100% SLA") large typographic prominence.
