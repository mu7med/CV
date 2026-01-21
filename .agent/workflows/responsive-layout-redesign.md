---
description: Workflow for redesigning layouts to be fully responsive
---

# Responsive Layout Redesign Workflow

## 1. Mobile First Analysis (0px - 768px)
- **Constraint**: Design for the vertical stack first.
- **Action**: defining the content flow without complex Grid areas.
- **Rule**: No fixed widths. Use `min()`, `max()`, or `%`.

## 2. Tablet / Hybrid (768px - 1024px)
- **Constraint**: Introduce column splitting where space permits.
- **Action**: Use Grid/Flex wrapping.
- **Check**: Ensure touch targets remain large (finger vs mouse).

## 3. Desktop / Ultra-Wide (1024px +)
- **Constraint**: Avoid "stretched" content lines (max-width ~60-70ch for text).
- **Action**: Use extra space for decoration, side navigation, or glass effects.
- **Rule**: Container Queries preferred over Media Queries for component-centric layouts.

## 4. Stability Check
- Resize window rapidly. Does the layout "jitter"?
- Check font scaling at extreme widths.
