import { test, expect } from '@playwright/test';

test.describe('banner de mock data', () => {
  test('muestra el aviso cuando no hay googleSheetID', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('googleSheetID'));
    await page.goto('/');
    const banner = page.getByTestId('mock-banner');
    await expect(banner).toBeVisible();
    await expect(
      page.getByRole('status', { name: /usando datos de prueba/i })
    ).toBeVisible();
  });

  test('no muestra el aviso cuando hay googleSheetID', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('googleSheetID', 'SOME_SHEET_ID')
    );
    await page.goto('/');
    await expect(page.getByTestId('mock-banner')).toHaveCount(0);
  });
});
