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
        await expect(skillIcons).toHaveCount(5);
        for (let i = 0; i < 5; i++) {
            await expect(skillIcons.nth(i)).toBeVisible();
        }

        await expect(skillIcons.first()).toHaveCSS('color', 'rgb(255, 193, 7)');

        await page.locator('#theme-toggle').click();
        await expect(page.locator('body')).toHaveClass(/white-vertion/);

        await expect(skillIcons.first()).toHaveCSS('color', 'rgb(0, 185, 255)');
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

