import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { generateRegistrationData } from '../../data/dataGenerator';

test('Positive registration test', async ({ page }) => {
  const registrationData = generateRegistrationData();
  const registrationPage = new RegistrationPage(page);

  await registrationPage.openSignUp();
  await registrationPage.fillName(registrationData.name);
  await registrationPage.fillLastName(registrationData.lastName);
  await registrationPage.fillEmail(registrationData.email);
  await registrationPage.fillPassword(registrationData.password);
  await registrationPage.fillReEnterPassword(registrationData.reEnterPassword);
  await registrationPage.submitForm();

  await expect(page).toHaveURL('https://qauto2.forstudy.space/panel/garage');
});