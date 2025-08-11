import { test, expect } from '@playwright/test';

test('la home carga y tiene un título', async ({ page }) => {
  await page.goto('/'); // usa baseURL desde la config
  const title = await page.title();
  expect(title.trim().length).toBeGreaterThan(0);
});
