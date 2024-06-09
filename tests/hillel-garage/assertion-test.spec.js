// @ts-check
//const {test, expect} = require('@playwright/test');
import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test.describe('Assertions - common', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');
    })

test.only('Common assertions', async ({ page }) => {
// expect(actualDATA).toMatch(expectedDATA)
    const actual = 1 + 1;
    const expected = 2;

    expect(actual).toBe(expected);
    expect(actual).not.toBe(3);
    expect('Hello').toContain('ell');
})

test('Common assertions - complex types', async ({ page }) => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
})

test('Common assertions - soft assertion', async ({ page }) => {
    expect.soft([1,2,3]).toEqual([1,2,3]);
    expect([1, 2, 3]).toContain(2);
})

})

test.describe('Assertions - page', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');
    })

    test('Page assertions', async ({ page }) => {
        await expect (page).toHaveTitle(/Hillel Qauto/);
        await expect (page.locator('.header-link')).toHaveCount(4);
        await expect (page.locator('.header-link')).not.toHaveCount(5);
        await expect (page).toHaveURL('https://qauto2.forstudy.space/');

        const guestLogin = page.locator('.header-link', {hasText: 'Guest log in'});
        await expect(guestLogin, "Button shuold be visibile").toBeVisible();
        await expect(guestLogin, 'Bla bla bla').not.toBeHidden();
        
        await expect(guestLogin).toBeEnabled();
        await expect(guestLogin).not.toBeDisabled();

        await expect(guestLogin).toHaveCSS('color', 'rgb(0, 0, 0)');

        await expect(guestLogin).toHaveText('Guest log in');
        await expect(guestLogin).not.toHaveText('Guest log in 2')

        await expect(guestLogin).toHaveAttribute('href', '/login')
        await expect(guestLogin).not.toHaveAttribute('href', '/login2')
        
        await expect(guestLogin).toHaveClass('header-link');
        await expect(guestLogin).not.toHaveClass('header-link');

    })
})