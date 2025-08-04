import { test, expect } from '@playwright/test';

test('home page displays BuyBuddies text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('BuyBuddies')).toBeVisible();
});
