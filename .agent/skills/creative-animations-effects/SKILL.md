---
name: creative-animations-effects
description: Expert in high-performance web animations, interactive micro-effects, physics-based UI, cursor interactions, and visual flair. Use when implementing, enhancing, or auditing CSS animations, particle networks, glowing border effects, hover interactions, interactive canvas animations, and motion systems.
---

# Creative Animations & Interactive Effects

This skill guides the design and implementation of fluid, modern, GPU-accelerated web animations that transform a static webpage into an interactive, high-tech experience.

---

## 1. The Core Performance Law

1. **Only Animate Compositor Properties:**
   - **Allowed for animations/transitions:** `transform` (`translate3d`, `scale`, `rotate`) and `opacity`.
   - **Forbidden for continuous animations:** `width`, `height`, `top`, `left`, `margin`, `padding`, `filter: blur()` (causes severe layout thrashing and CPU repaints).
2. **Hardware Acceleration:**
   - Use `will-change: transform, opacity;` sparingly on elements entering active animation, then remove or limit to dedicated animated layers.
3. **Reduced Motion Graceful Degradation:**
   Always provide immediate fallback:
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

---

## 2. High-Impact Interactive Effects

### A. Dynamic Spotlight / Cursor Mesh Glow
A cursor-tracking radial gradient on cards or backgrounds creates an interactive cybernetic feel:
```javascript
// Track mouse coordinates on cards
document.querySelectorAll('.interactive-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
```
```css
.interactive-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
    rgba(255, 193, 7, 0.15),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.interactive-card:hover::before {
  opacity: 1;
}
```

### B. Specular Glare Hover Sweep
Simulates light gliding across hardened glass:
```css
.glass-glare {
  position: relative;
  overflow: hidden;
}
.glass-glare::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transform: skewX(-25deg);
  pointer-events: none;
}
.glass-glare:hover::after {
  left: 150%;
  transition: left 0.75s cubic-bezier(0.19, 1, 0.22, 1);
}
```

### C. Animated Neon Border Gradient (Houdini `@property` or Gradient Rotation)
```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.neon-border-card {
  position: relative;
  background: #15161e;
  border-radius: 16px;
}
.neon-border-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--gradient-angle),
    transparent 20%,
    #ffc107 40%,
    #00B9FF 60%,
    transparent 80%
  );
  z-index: -1;
  animation: spinBorder 4s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.neon-border-card:hover::before {
  opacity: 1;
}
@keyframes spinBorder {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
```

### D. Lightweight Interactive Particle / Cloud Constellation
A custom, zero-dependency `<canvas>` drawing connected nodes that slowly float and connect with lines, subtly pulled toward the cursor:
- Keeps memory footprint `< 5MB`.
- Drops rendering to `requestAnimationFrame` and pauses entirely when tab is hidden or element is scrolled off-screen using `IntersectionObserver`.

---

## 3. Orchestration & Staggered Reveal
- Group items in sequences (e.g. 5 experience cards, 10 certificates).
- Apply dynamic CSS transition delays: `transition-delay: calc(var(--index, 0) * 80ms);`.
- Use cubic-bezier easing curves with character (e.g., `cubic-bezier(0.16, 1, 0.3, 1)` for snappy, organic expansion).
