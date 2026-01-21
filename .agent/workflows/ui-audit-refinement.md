---
description: Standard procedure for auditing and refining User Interfaces
---

# UI Audit & Refinement Workflow

## 1. Structure Audit
- [ ] Check HTML semantics (Heading hierarchy, Landmarks).
- [ ] Verify responsive behavior (Does it break at 320px?).
- [ ] Identify hardcoded values that should be tokens/variables.

## 2. Accessibility Check
- [ ] Colors: Run contrast check (WCAG AA).
- [ ] Iteraction: Check tab order and `:focus-visible` states.
- [ ] Media: Ensure images have `alt` or `role="presentation"`.

## 3. Aesthetic Refinement (The Polish)
- [ ] Spacing: Convert loose px values to system variables (`--space-md`).
- [ ] Typography: Ensure fluid clamping is active.
- [ ] Depth: Apply glass/shadow layers according to Rule #02.

## 4. Performance Check
- [ ] Animation: Remove layout-triggering properties (`left`, `top`, `width`) from transitions.
- [ ] Bloat: Remove unused classes or redundant overrides.

## 5. Proposal
- Generate a summary of changes.
- "Before/After" description of visual impact.
