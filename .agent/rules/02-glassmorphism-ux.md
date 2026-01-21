# Immutable Rule: Glassmorphism & Visual Aesthetics

## 1. The Glassmorphism Contract
Glassmorphism (frosted glass) is a high-cost visual effect. It is permitted **ONLY** if the following conditions are met:
1.  **Backdrop-Filter Support**: The target browser must support `backdrop-filter`.
2.  **Fallback Strategy**: A solid, semi-opaque color fallback is MANDATORY for browsers lacking support or low-power modes.
3.  **Content Legibility**: The blur must never compromise text readability.

## 2. Visual Hierarchy Rules
- **Depth Limit**: Maximum of 3 levels of "glass" depth (Background -> Base Layer -> Floating Glass -> Popover Glass).
- **Border Light**: Glass elements must include a subtle 1px border with localized opacity (e.g., `rgba(255,255,255,0.2)`) to verify edges.
- **Shadows**: Shadows must be diffuse and colored (not pure black) to enhance the floating effect without muddying the background.

## 3. GPU Safety Protocol
- **Constraint**: `backdrop-filter: blur()` is expensive.
- **Limit**: Do not apply to more than 5 distinct large surface areas simultaneously on a single viewport.
- **Animation**: Do not animate `backdrop-filter` values (e.g., transitioning blur amount) continuously. It will cause frame drops.

## 4. Accessibility Overrides
- **High Contrast Mode**: In `media(prefers-contrast: high)`, glass effects must degrade to solid, high-contrast borders and backgrounds.
- **Dark Mode**: Glass in dark mode must behave as "smoked glass" (darkening background) rather than "frosted ice" (lightening) to prevent eye strain.

## 5. Prohibited Aesthetics
- **Neumorphism**: Strictly prohibited.
- **Flat Design**: Bare flat design without depth is prohibited unless explicitly requested as a "minimalist" refactor.
- **Generic Shadows**: "Dirty" grey shadows are forbidden. Use HSL-derived colored shadows.
