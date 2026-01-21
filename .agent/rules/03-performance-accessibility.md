# Immutable Rule: Performance & Accessibility Thresholds

## 1. The Performance Budget
Visual novelty must NEVER come at the cost of the following metrics:
-   **CLS (Cumulative Layout Shift)**: Must be **0.05** or less. Animations must be `transform` based, not `width/height/top/left`.
-   **LCP (Largest Contentful Paint)**: Core UI elements cannot depend on heavy Javascript hydration.
-   **Paint Operations**: Avoid `box-shadow` on scrolling elements if it causes constant repaints.

## 2. Animation Constraints
-   **Trigger**: Animations must serve a UX purpose (Orientation, Feedback, Status).
-   **Duration**: Micro-interactions < 200ms. Transitions < 400ms.
-   **Properties**: Only animate `opacity` and `transform`.
    -   *Exception*: `filter` or `backdrop-filter` on small, non-scrolling elements.

## 3. Accessibility (a11y) Gates
-   **Interactive Targets**: Buttons/Links must be at least 44x44px (touch target).
-   **Focus States**: Custom `:focus-visible` styles are MANDATORY. Default browser outline is unacceptable if it clashes with the design.
-   **Motion preferences**:
    ```css
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    ```

## 4. Semantic Integrity
-   **Structure**: Use `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` appropriately.
-   **Headings**: Hierarchy (h1 -> h2 -> h3) is structural, not aesthetic. Do not skip levels.
-   **Buttons vs Anchors**:
    -   Goes somewhere? -> `<a>`
    -   Does something? -> `<button>`
