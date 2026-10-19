const { test, expect } = require('@playwright/test');

test.describe('Theme Toggle', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the page
        // Assuming we are running this against a local file or a server
        // Since we don't have a server running in this environment usually, 
        // we can try to open the file directly if playwright allows, or we need a simple server.
        // For this environment, we might need to assume a server is served at some port or use file://
        // But file:// has restrictions with localStorage in some browsers.
        // Let's assume we can start a simple http server or use file:// and hope localStorage works or is mocked.
        // Actually, let's start a python server in the background for testing.
        await page.goto('http://localhost:8000/index.html');
    });

    test('should default to dark mode', async ({ page }) => {
        const body = page.locator('body');
        await expect(body).toHaveClass(/dark-vertion/);
        await expect(body).not.toHaveClass(/white-vertion/);

        // localStorage should be 'dark' or empty (defaulting to dark)
        // const pref = await page.evaluate(() => localStorage.getItem('user-prefs'));
        // expect(pref).toBe('dark'); // It might be null initially until clicked or if script sets it.
        // Our script sets it on load if not present? 
        // Logic: if (userPref === 'light') setLight else setDark.
        // setDark sets localStorage to 'dark'. So yes.

        await page.waitForTimeout(500); // Wait for JS to execute
        const pref = await page.evaluate(() => localStorage.getItem('user-prefs'));
        expect(pref).toBe('dark');
    });

    test('should toggle to light mode', async ({ page }) => {
        const toggleBtn = page.locator('#theme-toggle');
        await toggleBtn.click();

        const body = page.locator('body');
        await expect(body).toHaveClass(/white-vertion/);
        await expect(body).not.toHaveClass(/dark-vertion/);

        const pref = await page.evaluate(() => localStorage.getItem('user-prefs'));
        expect(pref).toBe('light');

        const icon = toggleBtn.locator('i');
        await expect(icon).toHaveClass(/fa-moon-o/);

        // Verify light mode background image is w-bg.webp / w-bg.png
        const bodyBg = await page.locator('body').evaluate(el => window.getComputedStyle(el).backgroundImage);
        expect(bodyBg).toMatch(/w-bg\.(webp|png)/);

        const artifactDir = 'E:/Users/Mu7med/.gemini/antigravity/brain/69ee0081-2160-420a-91b7-e72cbd569207';
        await page.screenshot({ path: `${artifactDir}/verify-desktop-light-hero.png` });
        await page.locator('#mh-agentic-systems').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactDir}/verify-desktop-light-agentic.png` });
    });

    test('should persist preference', async ({ page }) => {
        const toggleBtn = page.locator('#theme-toggle');
        await toggleBtn.click(); // Switch to light

        await page.reload();

        const body = page.locator('body');
        await expect(body).toHaveClass(/white-vertion/);

        const pref = await page.evaluate(() => localStorage.getItem('user-prefs'));
        expect(pref).toBe('light');
    });

    test('should toggle back to dark mode', async ({ page }) => {
        const toggleBtn = page.locator('#theme-toggle');
        await toggleBtn.click(); // Switch to light
        await expect(page.locator('body')).toHaveClass(/white-vertion/);

        await toggleBtn.click(); // Switch back to dark

        const body = page.locator('body');
        await expect(body).toHaveClass(/dark-vertion/);

        const pref = await page.evaluate(() => localStorage.getItem('user-prefs'));
        expect(pref).toBe('dark');

        const icon = toggleBtn.locator('i');
        await expect(icon).toHaveClass(/fa-sun-o/);
    });

    test('should verify API key removal, HUD box removal, About Me alignment, and theme-colored Technical Skill icons', async ({ page }) => {
        const htmlContent = await page.content();
        expect(htmlContent).not.toContain('AIzaSy');

        const canvas = page.locator('#hero-3d-canvas');
        await expect(canvas).toBeAttached();
        const width = await canvas.evaluate(el => el.width);
        expect(width).toBeGreaterThan(0);

        // Verify green HUD status pill and About_me images are removed
        await expect(page.locator('.hud-status-pill')).toHaveCount(0);
        await expect(page.locator('img[src*="About_me"]')).toHaveCount(0);

        // Verify About Me alignment and increased typography
        const aboutStyles = await page.locator('.mh-about-inner p').evaluate(el => {
            const cs = window.getComputedStyle(el);
            return {
                textAlign: cs.textAlign,
                fontSize: parseFloat(cs.fontSize)
            };
        });
        expect(aboutStyles.textAlign).toBe('center');
        expect(aboutStyles.fontSize).toBeGreaterThanOrEqual(18);

        // Verify Technical Skills icons are visible, have no rounded square background, and match Dark/Light theme colors
        const skillIcons = page.locator('.skill-bento-icon .fa');
        await expect(skillIcons).toHaveCount(6);
        for (let i = 0; i < 6; i++) {
            await expect(skillIcons.nth(i)).toBeVisible();
        }

        await expect(skillIcons.first()).toHaveCSS('color', 'rgb(255, 193, 7)');

        await page.locator('#theme-toggle').click();
        await expect(page.locator('body')).toHaveClass(/white-vertion/);

        await expect(skillIcons.first()).toHaveCSS('color', 'rgb(0, 185, 255)');
    });

    test('should verify Agentic AI & AgentOps repositioning, 4 Featured Agentic Systems, Certs Accordion, and zero console errors', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        page.on('pageerror', err => {
            consoleErrors.push(err.message);
        });

        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle' });

        // Phase 0 & 1: Title, Hero subheadline, Meta description, and zero secrets
        await expect(page).toHaveTitle('Mohammed Abdullah | DevOps Engineer — Agentic AI & AgentOps');
        await expect(page.locator('.mh-header-info h4')).toHaveText('DevOps Engineer | Agentic AI & AgentOps');

        const htmlContent = await page.content();
        expect(htmlContent).not.toMatch(/AIza[0-9A-Za-z\-_]{10,}|sk-[0-9A-Za-z]{20,}|ghp_[0-9A-Za-z]{20,}/);
        await expect(page.locator('.mh-about-inner p')).toContainText('I build autonomous systems on top of production-grade infrastructure discipline — the part of AI projects that usually kills them.');

        // Phase 2: All 4 Featured Agentic Systems cards render visibly
        const agenticCards = page.locator('#mh-agentic-systems .agentic-system-card');
        await expect(agenticCards).toHaveCount(4);
        await page.locator('#mh-agentic-systems').scrollIntoViewIfNeeded();
        for (let i = 0; i < 4; i++) {
            await expect(agenticCards.nth(i)).toBeVisible();
        }

        const artifactDir = 'E:/Users/Mu7med/.gemini/antigravity/brain/69ee0081-2160-420a-91b7-e72cbd569207';
        await page.screenshot({ path: `${artifactDir}/verify-desktop-agentic-systems.png` });

        // Phase 3: In-Progress AI certs, AI & Agentic filter tab, AgentOps & Guardrails callout, and Earlier Certs accordion
        await page.locator('#mh-portfolio').scrollIntoViewIfNeeded();
        await expect(page.locator('#filter-button li[data-filter=".ai-agentic"]')).toBeVisible();
        await expect(page.locator('.in-progress-cert-card')).toHaveCount(2);
        await expect(page.locator('.agentops-guardrails-callout')).toBeVisible();

        const toggleBtn = page.locator('#earlier-certs-toggle');
        const accordionPanel = page.locator('#earlier-certs-panel');
        await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        await expect(accordionPanel).toBeHidden();

        await toggleBtn.scrollIntoViewIfNeeded();
        await toggleBtn.click();
        await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
        await expect(accordionPanel).toBeVisible();
        await expect(accordionPanel.locator('.grid-item')).toHaveCount(7);

        await page.screenshot({ path: `${artifactDir}/verify-desktop-certs-accordion.png` });

        // Collapse back
        await toggleBtn.click();
        await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        await expect(accordionPanel).toBeHidden();

        // Capture Hero desktop screenshot
        await page.locator('#mh-home').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${artifactDir}/verify-desktop-hero.png` });

        // Verify SEO & Semantic HTML landmarks
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toHaveText('Mohammed Abdullah');
        await expect(page.locator('main#main-content')).toHaveCount(1);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mu7med.org/');
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index,\s*follow/);

        const jsonLdText = await page.locator('script[type="application/ld+json"]').textContent();
        const jsonLd = JSON.parse(jsonLdText);
        expect(jsonLd['@graph']).toBeDefined();
        expect(jsonLd['@graph'].some(item => item['@type'] === 'Person' && item.name === 'Mohammed Abdullah')).toBe(true);

        // Verify background texture and glassmorphic card transparency are preserved
        const bodyBg = await page.locator('body').evaluate(el => window.getComputedStyle(el).backgroundImage);
        expect(bodyBg).toMatch(/bg\.(webp|png)/);

        const cardBackdrop = await page.locator('.agentic-system-card').first().evaluate(el => {
            const cs = window.getComputedStyle(el);
            return cs.backdropFilter || cs.webkitBackdropFilter || 'none';
        });
        expect(cardBackdrop).toContain('blur');

        // Capture & Verify Mobile viewport UI & Scroll Performance (390x844)
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(200);

        // Zero horizontal scroll overflow on mobile
        const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasHorizontalOverflow).toBe(false);

        // Mobile Nav Drawer should be offscreen initially and styled in Dark Obsidian (never #0bceaf / rgb(11, 206, 175))
        const navCollapse = page.locator('#navbarSupportedContent');
        await expect(navCollapse).not.toHaveClass(/active/);
        const drawerBg = await navCollapse.evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(drawerBg).toBe('rgb(18, 16, 27)');

        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(150);
        await page.screenshot({ path: `${artifactDir}/verify-mobile-hero.png` });

        await page.locator('#mh-agentic-systems').scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        await page.screenshot({ path: `${artifactDir}/verify-mobile-agentic-systems.png` });

        await page.locator('#mh-portfolio').scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        await page.screenshot({ path: `${artifactDir}/verify-mobile-skills-certs.png` });

        // Test opening and closing the mobile drawer
        await page.locator('.navbar-toggler').click();
        await expect(navCollapse).toHaveClass(/active/);
        await page.locator('#navbarSupportedContent .nav-link[href="#mh-about"]').click();
        await expect(navCollapse).not.toHaveClass(/active/);

        expect(consoleErrors).toEqual([]);
    });

    test('should auto-open current role in Experience Master-Detail and switch on card click', async ({ page }) => {
        await page.locator('#mh-experience').scrollIntoViewIfNeeded();
        const preview = page.locator('#experience-preview');
        await expect(preview).toBeVisible();
        await expect(page.locator('#preview-role')).toHaveText('DevOps Engineer');

        // Click Oracle card to switch detail view
        const oracleCard = page.locator('#card-oracle');
        await oracleCard.scrollIntoViewIfNeeded();
        await oracleCard.click();
        await expect(page.locator('#preview-role')).toHaveText('Operations Engineer (Cloud & Infra)');
    });
});

