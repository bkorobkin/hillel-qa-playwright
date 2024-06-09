
//const {test, expect} = require('@playwright/test');
import { test, expect } from '@playwright/test';


test.describe('First test', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');
    });

    test('First negative test', async ({ page }) => {
        const signInButton = page.locator('.header_signin', { hasText: 'Sign In'});
        await signInButton.click();
        const modalSignIn = page.locator('div.modal-dialog');
        const emailInput = modalSignIn.locator('input#signinEmail');
        const passwordInput = modalSignIn.locator('input#signinPassword');
        const sighInButtonModal = modalSignIn.locator('.btn-primary');

        await emailInput.fill('test@com');
        await passwordInput.fill('1234567');
        await expect (sighInButtonModal).toBeDisabled();
        await expect(modalSignIn.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    })
});