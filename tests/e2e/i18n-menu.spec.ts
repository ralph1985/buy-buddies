import { test, expect } from '@playwright/test';

test('cambiar idioma desde cabecera traduce el menú lateral', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('menu-item-products').waitFor();
  const before = await page.getByTestId('menu-item-products').innerText();
  await page.getByTestId('lang-toggle').click();
  await expect(page.getByTestId('menu-item-products')).not.toHaveText(before);
});
