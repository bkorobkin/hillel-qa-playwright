import { test, expect } from '../fixtures/userGaragePage';

test('Test using userGaragePage fixture', async ({ userGaragePage }) => {
  await userGaragePage.page.goto('/panel/garage');
  await expect(userGaragePage.page).toHaveURL('/panel/garage');
});
