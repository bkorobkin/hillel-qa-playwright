// tests/hillel-garage/hw22test.spec.js
import { test, expect } from '../fixtures/userGaragePage';

test('Test using userGaragePage fixture', async ({ userGaragePage }) => {
  await expect(userGaragePage.page).toHaveURL('/panel/garage');
});
