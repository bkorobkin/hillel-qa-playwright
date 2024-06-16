import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test.describe('Registration - Sign up form', () => {
    test.beforeEach(async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openSignUp();
    });

    test('Empty Name field', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillPassword('Password123');
        await registrationPage.fillReEnterPassword('Password123');
        
        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Name field contains numbers', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John1');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('invalidemail@com');
        await registrationPage.fillPassword('Password123');
        await registrationPage.fillReEnterPassword('Password123');

        await registrationPage.verifyEmailError('Email is incorrect');
        await registrationPage.verifyElementCSS(registrationPage.emailInput, 'border-color', 'rgb(220, 53, 69)');
        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Empty Last Name field', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillPassword('Password123');
        await registrationPage.fillReEnterPassword('Password123');

        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Empty Email field', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillPassword('Password123');
        await registrationPage.fillReEnterPassword('Password123');

        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Invalid Email format', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('invalidemail@com');
        await registrationPage.fillPassword('Password123');
        await registrationPage.fillReEnterPassword('Password123');

        await registrationPage.verifyEmailError('Email is incorrect');
        await registrationPage.verifyElementCSS(registrationPage.emailInput, 'border-color', 'rgb(220, 53, 69)');
        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Empty Password field', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillReEnterPassword('Password123');

        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Empty Re-enter Password field', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillPassword('Password123');

        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Password less than 8 characters', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillPassword('Pass1');
        await registrationPage.fillReEnterPassword('Pass1');

        await registrationPage.verifyPasswordError('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registrationPage.verifyElementCSS(registrationPage.passwordInput, 'border-color', 'rgb(220, 53, 69)');
        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Password without number', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillPassword('Qwerty');
        await registrationPage.fillReEnterPassword('Qwerty');

        await registrationPage.verifyPasswordError('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registrationPage.verifyElementCSS(registrationPage.passwordInput, 'border-color', 'rgb(220, 53, 69)');
        await registrationPage.verifyRegisterButtonDisabled();
    });

    test('Password without uppercase letter', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.fillName('John');
        await registrationPage.fillLastName('Wick');
        await registrationPage.fillEmail('test@example.com');
        await registrationPage.fillPassword('password123');
        await registrationPage.fillReEnterPassword('password123');

        await registrationPage.verifyPasswordError('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await registrationPage.verifyElementCSS(registrationPage.passwordInput, 'border-color', 'rgb(220, 53, 69)');
        await registrationPage.verifyRegisterButtonDisabled();
    });
});
