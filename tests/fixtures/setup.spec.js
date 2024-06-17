import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { credentials } from '../../data/credentials';

test('Login and save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.openLogin();
  await loginPage.login(credentials.email, credentials.password);
  
  await page.context().storageState({ path: 'storage/storageState.json' });
});
