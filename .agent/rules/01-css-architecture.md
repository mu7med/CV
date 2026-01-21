# Immutable Rule: CSS Architecture & Engineering Systems

## 1. Core Mandate
**CSS-First Principle**: Javascript must NOT be used for styling, layout, or state-driven visual changes where CSS Custom Properties (Variables), Pseudo-classes (`:has`, `:not`, `:focus-visible`), or Container Queries can achieve the same result.

## 2. Architecture Layers
All styles must adhere to the following composition layers. Leaking concerns between layers is prohibited.
1.  **Tokens**: Raw values (colors, spacing, timing) in `:root`.
2.  **Primitives**: Fluid typography (`clamp()`), resets, and atomic utilities.
3.  **Layout**: Grid/Flex systems, Container Queries - strictly macro structure.
4.  **Components**: BEM-like or similar encapsulated styling.
5.  **Utilities**: Single-purpose helpers for extreme overrides only.

## 3. Typography Systems
- **Fluidity Required**: Fixed pixel sizes (`px`) for font-size are **FORBIDDEN** for body text and headings.
- **Implementation**: Use `clamp(min, preferred, max)` or viewport units mixed with logic.
- **Scale**: Hierarchy must be mathematically defined (e.g., Major Third or Perfect Fourth scales).

## 4. Framework Policy
- **Zero-Dependency Default**: Do not suggest or install generic CSS libraries (Bootstrap, generic Tailwind configs) unless explicitly requested.
- **Tailwind Exception**: If Tailwind is mandated, it must be configured heavily to match the specific "Premium/Glassmorphic" constraints (custom theme extensions, not default colors).

## 5. Maintainability Gates
- **Complexity Cap**: CSS Selectors must not exceed a Specificity Depth of 3 (e.g., `.card .content h2` is max).
- **Naming**: Use semantic, purpose-driven names (`.btn--primary`, not `.blue-button`).
- **Comments**: Complex calculations (e.g., `calc()`) require inline explanation.
