// tests/fixtures/userGaragePage.js
import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/garagePage';
import { credentials } from '../../data/credentials';
const fs = require('fs');

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const storageStatePath = 'storage/storageState.json';
    let context;

    if (fs.existsSync(storageStatePath)) {
      context = await browser.newContext({ storageState: storageStatePath });
    } else {
      context = await browser.newContext();
      const loginPage = await context.newPage();
      await loginPage.goto('/');
      await loginPage.fill('#signinEmail', credentials.email);
      await loginPage.fill('#password', credentials.password);
      await loginPage.click('#login-button');
      await context.storageState({ path: storageStatePath });
      await loginPage.close();
    }

    const userPage = await context.newPage();
    const garagePage = new GaragePage(userPage);
    await use(garagePage);
  },
});