import { test, expect } from '@playwright/test';

test.describe('cookie banner', () => {
  test.beforeEach(async ({ page, context }) => {
    // empezar sin consentimientos
    await context.clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('appear, accept all, persist', async ({ page }) => {
    const banner = page.getByTestId('cookie-banner');
    await expect(banner).toBeVisible();

    await page.getByTestId('btn-accept-all').click();
    await expect(banner).toBeHidden();

    await page.reload();
    await expect(page.getByTestId('cookie-banner')).toBeHidden();
  });

  test('configure -> reject optional', async ({ page }) => {
    await page.getByTestId('btn-config').click();
    await page.getByRole('button', { name: 'Guardar' }).click(); // por defecto ambos false
    await expect(page.getByTestId('cookie-banner')).toBeHidden();
  });
});
