import { test as base } from '@playwright/test';
import { GaragePage } from "../pages/garagePage";
import { credentials } from "../../data/credentials";
const fs = require('fs');
const path = require('path');

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const storageStatePath = path.join(__dirname, '../../storage/storageState.json');
    let context;
    if (fs.existsSync(storageStatePath)) {
      context = await browser.newContext({ storageState: storageStatePath });
    } else {
      context = await browser.newContext();
      const loginPage = await context.newPage();
      await loginPage.goto('/');
      await loginPage.waitForSelector('#signinEmail', { state: 'visible' });
      await loginPage.fill('#signinEmail', credentials.email);
      await loginPage.waitForSelector('#password', { state: 'visible' });
      await loginPage.fill('#password', credentials.password);
      await loginPage.waitForSelector('#login-button', { state: 'visible' });
      await loginPage.click('#login-button');
      await loginPage.context().storageState({ path: storageStatePath });
      await loginPage.close();
    }

    const userPage = await context.newPage();
    const garagePage = new GaragePage(userPage);
    await use(garagePage);
  }
});
// npx playwright test --project=setup
// npx playwright test --project=hillel-garage
