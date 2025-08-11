import { expect, test } from '@playwright/test';

test('la home carga y muestra el título correcto', async ({ page }) => {
  await page.goto('/'); // usa BASE_URL desde la config
  await expect(page).toHaveTitle('Buy Buddies');
});
