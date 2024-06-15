import { test, expect } from '@playwright/test';
import { generateRegistrationData } from '../../data/dataGenerator';

test('Positive registration test', async ({ page }) => {
  const registrationData = generateRegistrationData();

  await page.goto('https://guest:welcome2qauto@qauto2.forstudy.space/');
  await page.getByRole('button', { name: 'Sign up' }).click();

  await page.locator('#signupName').fill(registrationData.name);
  await page.locator('#signupLastName').fill(registrationData.lastName);
  await page.getByLabel('Email').fill(registrationData.email);
  await page.getByLabel('Password', { exact: true }).fill(registrationData.password);
  await page.getByLabel('Re-enter password').fill(registrationData.reEnterPassword);

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page).toHaveURL('https://qauto2.forstudy.space/panel/garage');
});
