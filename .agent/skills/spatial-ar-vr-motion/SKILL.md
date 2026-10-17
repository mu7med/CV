---
name: spatial-ar-vr-motion
description: Master of Spatial Web Design, VisionOS & WebXR principles, AR/VR motion systems, multi-plane Z-axis depth, and gyroscopic/pointer perspective physics. Use when designing, building, or enhancing spatial interfaces, volumetric UI cards, 3D parallax layer separation, AR/VR holographic effects, and immersive camera transitions.
---

# Spatial Web, AR/VR & Motion Design Mastery

This skill empowers the agent to build spatial computing interfaces and AR/VR-inspired motion systems for the modern web, borrowing spatial design principles from Apple visionOS, Meta Quest spatial UI, and interactive WebXR installations.

---

## 1. The Core Principles of Spatial UI

1. **Volumetric Z-Axis Separation (True Depth):**
   A spatial card is not flat. It consists of multiple independent planes floating at different physical depths:
   - **Backplane (Z: 0px):** Smoked glass backplate with specular reflection.
   - **Midplane (Z: 25px):** Core typography, company info, and descriptions.
   - **Foreplane (Z: 50px):** Interactive tech badges, CTA buttons, and status indicators.
   - **Aura Plane (Z: 70px):** Holographic badges, certification crests, and floating glow dots.
   ```css
   .spatial-card {
     perspective: 1200px;
     transform-style: preserve-3d;
   }
   .spatial-backplane { transform: translateZ(0px); }
   .spatial-midplane  { transform: translateZ(25px); }
   .spatial-foreplane { transform: translateZ(50px); }
   .spatial-auraplane { transform: translateZ(75px); }
   ```

2. **Dynamic Gaze / Pointer Parallax:**
   As the pointer moves (or on mobile, as the device gyroscope tilts via `DeviceOrientationEvent`), each depth plane shifts at a differential rate, creating an unmistakable illusion of tangible physical depth.

3. **Specular Holographic Sheen:**
   Spatial interfaces feature dynamic chromatic refraction and holographic sheen that glides across surfaces based on the viewer’s angle relative to the virtual light source.

---

## 2. Spatial Parallax Engine (Vanilla JavaScript)

```javascript
/**
 * Attaches real-time spatial 3D physics to volumetric cards
 */
function initSpatialCards(selector = '.spatial-card') {
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    let bounds;
    
    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      const xPct = (mouseX / bounds.width - 0.5) * 2;  // -1 to 1
      const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      // 3D Tilt angles (capped for refined elegance)
      const rotateX = -yPct * 12; // deg
      const rotateY = xPct * 12;  // deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Update light source position
      card.style.setProperty('--sheen-x', `${mouseX}px`);
      card.style.setProperty('--sheen-y', `${mouseY}px`);
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}
```

---

## 3. AR/VR HUD Reticle & Micro-Interactions

- **Targeting Reticle Hover:**
  Subtle corner brackets `[ ]` that animate and lock onto interactive elements upon hover, simulating an Augmented Reality heads-up display.
  ```css
  .hud-bracket {
    position: relative;
  }
  .hud-bracket::before,
  .hud-bracket::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: #ffc107;
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hud-bracket::before {
    top: -4px; left: -4px;
    border-top: 2px solid; border-left: 2px solid;
    transform: translate(-4px, -4px);
  }
  .hud-bracket::after {
    bottom: -4px; right: -4px;
    border-bottom: 2px solid; border-right: 2px solid;
    transform: translate(4px, 4px);
  }
  .hud-bracket:hover::before,
  .hud-bracket:hover::after {
    opacity: 1;
    transform: translate(0, 0);
  }
  ```

---

## 4. Mobile Gyroscope Spatial Integration
- On mobile devices, utilize `DeviceOrientationEvent` (with permission check) to dynamically rotate volumetric elements as the user tilts their phone, creating an authentic "looking into a glass box" 3D window effect.
