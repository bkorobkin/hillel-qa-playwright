// @ts-check
// const { test, expect } = require('@playwright/test');
import {test, expect} from '@playwright/test';

// class Locator {
//     constructor(selector){
//         this.selector = selector;
//     }
// }

// new Locator ('.header=link')
// new Locator ('button')
// new Locator ('selector')


test.describe('Garage locators test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Text input', async ({ page }) => {
        const someButton = page.locator('#someID');
        const someInputByClass = page.locator('.className');
        const someElementByXpath = page.locator('//xpath');
            
        await someButton.click();
    })

    test( 'Find Guest Login', async ({ page }) => {
        // const guestLogin = page.locator('.header-link');
        // const guestLogin = page.locator('.header-link', {hasText: 'Guest log in'});
        // const guestLogin = page.locator('.header_right', {has: page.locator('.header-link', {hasText: 'Guesto log in'})});
        const guestLogin = page.locator('.header-link').filter({hasText: 'Guest log in'});
        // const guestLogin = page.getByAltText('Instructions');
        const count = await guestLogin.count();
        expect (count).toBe(1);
        await guestLogin.click();

    })

    test.only( 'Find Guest Login - locator to locator', async ({ page }) => {
        const guestLoginHeaderRight = page.locator('.header-right');
        const guestLogin = guestLoginHeaderRight.locator('.header-link', {hasText: 'Guest log in'});
        // const signIn = guestLoginHeaderRight.getByText('Sign In');
        const count = await guestLogin.count();
        expect (count).toBe(1);
        await guestLogin.click();

    })

    test( 'Find Guest Login - by first QR last', async ({ page }) => {
        const guestLoginHeaderRight = page.locator('.header-right');
        await guestLoginHeaderRight.locator('.header-right',{hasText: 'Guest log in'}).first().click();
        await guestLoginHeaderRight.locator('.header-right',{hasText: 'Guest log in'}).last().click();
        //by nth ()
        await guestLoginHeaderRight.locator('.header-right',{hasText: 'Guest log in'}).nth(0).click();
    })

    test.only( 'Find All text in header buttons', async ({ page }) => {
        const expectedButtonsText = ['Home', 'About', 'Contacts', 'Guest log in'];
        const buttons = page.locator('.header-link');
        
        const actualTexts = []
        const count = await buttons.count();
        
        // for (let i = 0; i < count; i++) {
        //     const text = await buttons.nth(i).innerText();
        //     actualTexts.push(text);
        // }
        for (let buttonItem of await buttons.all()) {
            // const text = await buttonsItem.innerText();
            // actualTexts.push(text);
            actualTexts.push(await buttonItem.innerText());
        }

        expect(actualTexts.sort()).toEqual(expectedButtonsText.sort());
    })
})