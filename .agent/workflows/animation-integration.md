---
description: Workflow for safe and performant animation integration
---

# Animation Integration Workflow

## 1. Purpose Definition
- **Question**: What is the utility? (Education, Orientation, Delight).
- **Reject**: If the answer is "to look cool" without a specific user flow benefit, REJECT or minimize.

## 2. Technical Constraint Check
- **Properties**: Are we animating `transform` or `opacity`? (YES/NO).
- **Trigger**: Is it scroll-linked? Convert to `IntersectionObserver` or Scroll-Timeline if strictly decorative.
- **Cost**: Will this trigger a paint on a large glass element? -> Forbidden.

## 3. Implementation
- **Step 1**: Define keyframes / transition state.
- **Step 2**: Apply `will-change` conservatively (only if jank is observed).
- **Step 3**: Wrap in `@media (prefers-reduced-motion: no-preference)`.

## 4. Verification
- Open DevTools "Rendering" tab.
- Turn on "Paint Flashing".
- **Pass Condition**: The animated element is on its own layer (green flash on start/end only).
- **Fail Condition**: The whole page flashes green (Layout Thrashing).
