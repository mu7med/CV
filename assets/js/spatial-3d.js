/**
 * Spatial 3D Cloud Topology, AR/VR Volumetric Tilt & HUD Motion Engine
 * Production-grade, zero-dependency module for mu7med.org
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ==========================================================================
       1. 3D CLOUD & KUBERNETES TOPOLOGY ENGINE (#hero-3d-canvas)
       ========================================================================== */
    class CloudTopology3D {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.isVisible = true;
            this.isRunning = false;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            this.nodes = [];
            this.pulses = [];
            this.nodeLabels = [
                'K8s (CKA/CKS)', 'OCI', 'AWS', 'Azure', 'ArgoCD',
                'Terraform', 'Prometheus', 'Helm', 'Docker', 'DevSecOps',
                'Liquibase', 'Grafana', 'Ansible', 'CI/CD'
            ];

            this.rotationX = 0.15;
            this.rotationY = 0;
            this.targetRotationX = 0.15;
            this.targetRotationY = 0;
            this.pointerX = 0;
            this.pointerY = 0;

            this.theme = document.body.classList.contains('white-vertion') ? 'light' : 'dark';
            this.palette = this.getPalette(this.theme);

            this.resize();
            this.initNodes();
            this.bindEvents();
            this.start();
        }

        getPalette(theme) {
            if (theme === 'light') {
                return {
                    nodePrimary: 'rgba(0, 185, 255, 0.85)',
                    nodeSecondary: 'rgba(0, 119, 181, 0.65)',
                    nodeGlow: 'rgba(0, 185, 255, 0.28)',
                    lineRGB: '0, 155, 225',
                    pulse: '#0088cc',
                    label: 'rgba(0, 95, 145, 0.85)',
                    ring: 'rgba(0, 185, 255, 0.12)'
                };
            }
            return {
                nodePrimary: 'rgba(255, 193, 7, 0.9)',
                nodeSecondary: 'rgba(255, 218, 106, 0.65)',
                nodeGlow: 'rgba(255, 193, 7, 0.3)',
                lineRGB: '255, 193, 7',
                pulse: '#ffffff',
                label: 'rgba(255, 215, 100, 0.78)',
                ring: 'rgba(255, 193, 7, 0.09)'
            };
        }

        resize() {
            const parent = this.canvas.parentElement;
            this.width = parent ? parent.clientWidth : window.innerWidth;
            this.height = parent ? parent.clientHeight : window.innerHeight;
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            this.radius = Math.min(this.width, this.height) * 0.42;
            this.focalLength = Math.max(this.width, this.height) * 0.75;
        }

        initNodes() {
            const count = window.innerWidth < 768 ? 38 : 68;
            this.nodes = [];
            this.pulses = [];

            // Fibonacci sphere distribution + volumetric inner cluster
            const goldenAngle = Math.PI * (3 - Math.sqrt(5));
            for (let i = 0; i < count; i++) {
                const y = 1 - (i / (count - 1)) * 2;
                const r = Math.sqrt(1 - y * y);
                const theta = goldenAngle * i;
                const layerScale = i % 3 === 0 ? 1.15 : (i % 2 === 0 ? 0.88 : 0.62);

                this.nodes.push({
                    x: Math.cos(theta) * r * layerScale,
                    y: y * layerScale * 0.78,
                    z: Math.sin(theta) * r * layerScale,
                    baseSize: i < this.nodeLabels.length ? 3.4 : (1.6 + (i % 3) * 0.6),
                    label: i < this.nodeLabels.length ? this.nodeLabels[i] : null,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                if (prefersReducedMotion.matches) this.renderFrame(0);
            }, { passive: true });

            window.addEventListener('mousemove', (e) => {
                const nx = (e.clientX / window.innerWidth) - 0.5;
                const ny = (e.clientY / window.innerHeight) - 0.5;
                this.pointerX = nx * 0.55;
                this.pointerY = ny * 0.35;
            }, { passive: true });

            window.addEventListener('deviceorientation', (e) => {
                if (e.gamma !== null && e.beta !== null) {
                    this.pointerX = Math.max(-0.5, Math.min(0.5, e.gamma / 60)) * 0.5;
                    this.pointerY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60)) * 0.35;
                }
            }, { passive: true });

            window.addEventListener('themeChanged', (e) => {
                this.theme = (e.detail && e.detail.theme) ? e.detail.theme :
                    (document.body.classList.contains('white-vertion') ? 'light' : 'dark');
                this.palette = this.getPalette(this.theme);
                if (prefersReducedMotion.matches) this.renderFrame(0);
            });

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        this.isVisible = entry.isIntersecting;
                        if (this.isVisible && !this.isRunning && !prefersReducedMotion.matches) {
                            this.start();
                        }
                    });
                }, { threshold: 0.05 });
                observer.observe(this.canvas);
            }

            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && this.isVisible && !this.isRunning && !prefersReducedMotion.matches) {
                    this.start();
                }
            });
        }

        project(x, y, z) {
            // Rotate around Y then X
            const cosY = Math.cos(this.rotationY + this.pointerX);
            const sinY = Math.sin(this.rotationY + this.pointerX);
            const cosX = Math.cos(this.rotationX + this.pointerY);
            const sinX = Math.sin(this.rotationX + this.pointerY);

            const x1 = x * cosY - z * sinY;
            const z1 = z * cosY + x * sinY;
            const y2 = y * cosX - z1 * sinX;
            const z2 = z1 * cosX + y * sinX;

            const worldX = x1 * this.radius;
            const worldY = y2 * this.radius;
            const worldZ = z2 * this.radius;

            const depth = this.focalLength / (this.focalLength + worldZ + this.radius * 0.4);
            return {
                screenX: this.width * 0.5 + worldX * depth,
                screenY: this.height * 0.5 + worldY * depth,
                z: worldZ,
                scale: depth
            };
        }

        spawnPulse(projected) {
            if (this.pulses.length > 8 || Math.random() > 0.06) return;
            const aIdx = Math.floor(Math.random() * projected.length);
            const a = projected[aIdx];
            // Find a close neighbor
            for (let i = 0; i < projected.length; i++) {
                if (i === aIdx) continue;
                const b = projected[i];
                const dx = a.screenX - b.screenX;
                const dy = a.screenY - b.screenY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 45 && dist < 155) {
                    this.pulses.push({ aIdx, bIdx: i, progress: 0, speed: 0.02 + Math.random() * 0.025 });
                    break;
                }
            }
        }

        renderFrame(time) {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.width, this.height);

            // Subtle orbital horizon ring
            ctx.save();
            ctx.translate(this.width * 0.5, this.height * 0.5);
            ctx.rotate(-0.18 + this.pointerX * 0.15);
            ctx.beginPath();
            ctx.ellipse(0, 0, this.radius * 1.18, this.radius * 0.34, 0, 0, Math.PI * 2);
            ctx.strokeStyle = this.palette.ring;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            const projected = this.nodes.map((node) => {
                const p = this.project(node.x, node.y, node.z);
                return {
                    ...p,
                    node
                };
            });

            // Connect nearby 3D nodes
            const maxLinkDist = window.innerWidth < 768 ? 115 : 148;
            ctx.lineWidth = 0.85;
            for (let i = 0; i < projected.length; i++) {
                const p1 = projected[i];
                for (let j = i + 1; j < projected.length; j++) {
                    const p2 = projected[j];
                    const dx = p1.screenX - p2.screenX;
                    const dy = p1.screenY - p2.screenY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxLinkDist * maxLinkDist) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - dist / maxLinkDist) * 0.24 * Math.min(p1.scale, p2.scale);
                        if (alpha > 0.02) {
                            ctx.strokeStyle = `rgba(${this.palette.lineRGB}, ${alpha.toFixed(3)})`;
                            ctx.beginPath();
                            ctx.moveTo(p1.screenX, p1.screenY);
                            ctx.lineTo(p2.screenX, p2.screenY);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Spawn & render active data pulses along links
            this.spawnPulse(projected);
            for (let i = this.pulses.length - 1; i >= 0; i--) {
                const pulse = this.pulses[i];
                pulse.progress += pulse.speed;
                if (pulse.progress >= 1) {
                    this.pulses.splice(i, 1);
                    continue;
                }
                const a = projected[pulse.aIdx];
                const b = projected[pulse.bIdx];
                if (!a || !b) continue;
                const px = a.screenX + (b.screenX - a.screenX) * pulse.progress;
                const py = a.screenY + (b.screenY - a.screenY) * pulse.progress;

                ctx.beginPath();
                ctx.arc(px, py, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = this.palette.pulse;
                ctx.fill();
            }

            // Sort back-to-front for authentic depth occlusion
            const sorted = projected.slice().sort((a, b) => b.z - a.z);

            ctx.font = '500 10px "JetBrains Mono", monospace';
            for (let i = 0; i < sorted.length; i++) {
                const p = sorted[i];
                const pulseScale = 1 + Math.sin(time * 0.002 + p.node.phase) * 0.15;
                const r = Math.max(1.1, p.node.baseSize * p.scale * pulseScale);

                // Node outer halo for primary labeled nodes
                if (p.node.label) {
                    ctx.beginPath();
                    ctx.arc(p.screenX, p.screenY, r * 2.6, 0, Math.PI * 2);
                    ctx.fillStyle = this.palette.nodeGlow;
                    ctx.fill();
                }

                // Core node vertex
                ctx.beginPath();
                ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
                ctx.fillStyle = p.node.label ? this.palette.nodePrimary : this.palette.nodeSecondary;
                ctx.fill();

                // Technical HUD label on foreground nodes
                if (p.node.label && p.scale > 0.78) {
                    ctx.fillStyle = this.palette.label;
                    ctx.fillText(p.node.label, p.screenX + r + 5, p.screenY + 3);
                }
            }
        }

        start() {
            if (prefersReducedMotion.matches) {
                this.renderFrame(0);
                return;
            }
            this.isRunning = true;
            const loop = (timestamp) => {
                if (!this.isVisible || document.hidden || prefersReducedMotion.matches) {
                    this.isRunning = false;
                    return;
                }
                this.rotationY += 0.0022;
                this.renderFrame(timestamp);
                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        }
    }

    /* ==========================================================================
       2. SPATIAL AR/VR VOLUMETRIC TILT & CURSOR SPOTLIGHT ENGINE
       ========================================================================== */
    function initSpatialMotion() {
        const interactiveSelectors = [
            '.experience-card',
            '.skill-bento-card',
            '.mh-address-footer-item',
            '.impact-metric-card',
            '.mh-project-gallery .grid-item figure'
        ];
        const elements = document.querySelectorAll(interactiveSelectors.join(','));

        elements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                if (prefersReducedMotion.matches) return;
                const rect = el.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const xPct = (mouseX / rect.width - 0.5) * 2;
                const yPct = (mouseY / rect.height - 0.5) * 2;

                const maxTilt = el.classList.contains('experience-card') || el.classList.contains('skill-bento-card') ? 7 : 5;
                const rotateX = (-yPct * maxTilt).toFixed(2);
                const rotateY = (xPct * maxTilt).toFixed(2);

                el.style.setProperty('--mouse-x', `${mouseX}px`);
                el.style.setProperty('--mouse-y', `${mouseY}px`);
                el.style.setProperty('--rotate-x', `${rotateX}deg`);
                el.style.setProperty('--rotate-y', `${rotateY}deg`);
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                el.style.setProperty('--rotate-x', '0deg');
                el.style.setProperty('--rotate-y', '0deg');
            }, { passive: true });
        });

        // Spatial 3D Hero Stage multi-plane pointer tracking
        const heroStage = document.querySelector('.hero-orb-stage');
        if (heroStage) {
            const heroSection = document.getElementById('mh-home');
            (heroSection || heroStage).addEventListener('mousemove', (e) => {
                if (prefersReducedMotion.matches) return;
                const rect = heroStage.getBoundingClientRect();
                const cx = rect.left + rect.width * 0.5;
                const cy = rect.top + rect.height * 0.5;
                const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.4)));
                const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.4)));

                heroStage.style.setProperty('--orb-rx', `${(-dy * 10).toFixed(2)}deg`);
                heroStage.style.setProperty('--orb-ry', `${(dx * 12).toFixed(2)}deg`);
                heroStage.style.setProperty('--badge-shift-x', `${(dx * 14).toFixed(1)}px`);
                heroStage.style.setProperty('--badge-shift-y', `${(dy * 14).toFixed(1)}px`);
            }, { passive: true });

            (heroSection || heroStage).addEventListener('mouseleave', () => {
                heroStage.style.setProperty('--orb-rx', '0deg');
                heroStage.style.setProperty('--orb-ry', '0deg');
                heroStage.style.setProperty('--badge-shift-x', '0px');
                heroStage.style.setProperty('--badge-shift-y', '0px');
            }, { passive: true });
        }
    }

    /* ==========================================================================
       3. SCROLL PROGRESS HUD BAR & ANIMATED EXECUTIVE COUNTERS
       ========================================================================== */
    function initScrollHUD() {
        const progressBar = document.getElementById('scroll-progress-bar');
        if (progressBar) {
            const updateScroll = () => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
                progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
            };
            window.addEventListener('scroll', updateScroll, { passive: true });
            updateScroll();
        }

        // Animated Executive Counters
        const counters = document.querySelectorAll('.impact-counter-value[data-count]');
        if (counters.length && 'IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    if (isNaN(target) || prefersReducedMotion.matches) {
                        el.textContent = target + suffix;
                        obs.unobserve(el);
                        return;
                    }

                    const duration = 1400;
                    const startTime = performance.now();
                    const tick = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(1, elapsed / duration);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * eased) + suffix;
                        if (progress < 1) {
                            requestAnimationFrame(tick);
                        } else {
                            el.textContent = target + suffix;
                        }
                    };
                    requestAnimationFrame(tick);
                    obs.unobserve(el);
                });
            }, { threshold: 0.35 });

            counters.forEach(c => counterObserver.observe(c));
        }
    }

    /* ==========================================================================
       INITIALIZATION
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        const loader = document.querySelector('.section-loader');
        if (loader) {
            loader.style.pointerEvents = 'none';
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.25s ease';
            setTimeout(() => { loader.style.display = 'none'; }, 260);
        }

        const canvas = document.getElementById('hero-3d-canvas');
        if (canvas) {
            new CloudTopology3D(canvas);
        }
        initSpatialMotion();
        initScrollHUD();
    });
})();
