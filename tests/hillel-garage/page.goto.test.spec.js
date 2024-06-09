//const {test, expect} = require('@playwright/test');
import { test, expect } from '@playwright/test';

test.describe('Open link', () => {
    test('page.goto.test', async ({ page }) => {
        await page.goto('/');
        const signInButton = page.locator('.header_signin', { hasText: 'Sign In'});
        await signInButton.click();

    });
});