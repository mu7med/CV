---
name: threejs-webgl-3d
description: Specialist in 3D Web graphics, Three.js, WebGL shaders, interactive 3D canvases, and GPU-optimized rendering. Use when integrating, building, or refining 3D hero scenes, interactive 3D models, wireframe cloud infrastructure topologies, interactive 3D cards, particle meshes, and spatial 3D effects.
---

# Three.js & WebGL 3D Mastery

This skill equips the agent to design and implement breathtaking, high-performance 3D graphics and WebGL experiences tailored for developer portfolios and tech showcases.

---

## 1. Conceptual Themes for DevOps & Cloud

When building 3D elements for a Senior DevOps & Cloud Architect:
- **Interactive Cloud / Kubernetes Topology:**
  A dynamic 3D network graph where nodes represent Kubernetes clusters, cloud regions (AWS, OCI, Azure), and microservices linked by glowing energetic pulses.
- **Floating 3D Polyhedrons / Cybernetic Core:**
  Wireframe icosahedron or geodesic sphere rotating smoothly, reacting subtly to mouse movement with holographic vertex markers.
- **Interactive 3D Particle Constellation / Starfield:**
  Thousands of points drifting in 3D space with depth-of-field perspective, moving dynamically as the cursor moves or as the user scrolls.

---

## 2. Production Architecture & Performance Principles

1. **Lightweight & Modular Loading:**
   - Import Three.js via ES Modules or modern CDN (`https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`).
   - Keep total 3D bundle and assets under strict budgets (< 500KB total).
2. **Lifecycle & Battery Optimization (Zero Waste):**
   - **IntersectionObserver:** Automatically stop the `requestAnimationFrame` render loop whenever the 3D canvas is scrolled out of viewport:
     ```javascript
     const observer = new IntersectionObserver(([entry]) => {
       isCanvasVisible = entry.isIntersecting;
       if (isCanvasVisible) requestAnimationFrame(render);
     });
     observer.observe(renderer.domElement);
     ```
   - **Page Visibility API:** Instantly pause rendering when the user switches browser tabs (`document.hidden`).
   - **Pixel Ratio Capping:** Cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` to prevent mobile GPUs from choking on 3x retina displays.
3. **Graceful Fallback:**
   - Check WebGL availability with `WebGLRenderingContext`. If unsupported or hardware-accelerated rendering is disabled, gracefully fall back to a rich CSS glassmorphic gradient background without breaking the layout.

---

## 3. High-Performance Three.js Hero Pattern

```javascript
// Minimalist, robust Three.js setup for DevOps Portfolio
class CyberCloudScene {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.camera.position.z = 40;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.initGeometry();
    this.initEvents();
    this.animate();
  }

  initGeometry() {
    // 3D Connected Nodes Topology
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 60;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffc107, // Amber Gold
      size: 1.5,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  initEvents() {
    this.targetRotation = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
      this.targetRotation.y = (e.clientX / window.innerWidth - 0.5) * 0.5;
      this.targetRotation.x = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.particles.rotation.y += 0.002;
    this.particles.rotation.x += (this.targetRotation.x - this.particles.rotation.x) * 0.05;
    this.particles.rotation.y += (this.targetRotation.y - this.particles.rotation.y) * 0.05;
    this.renderer.render(this.scene, this.camera);
  }
}
```

---

## 4. 3D Card Hover Physics (CSS 3D / WebGL Raycasting)
- Combine CSS `transform-style: preserve-3d`, `perspective: 1000px`, and dynamic mouse matrix calculations to give UI cards authentic weight, depth, and specular sheen.
