import { test, expect, type Page } from '@playwright/test';

const openMenu = async (page: Page) => {
  await page.getByTestId('drawer-toggle').click();
};

test('cambiar idioma desde cabecera traduce el menú lateral', async ({ page }) => {
  await page.goto('/');
  await openMenu(page);
  await page.getByTestId('menu-item-products').waitFor();
  const before = await page.getByTestId('menu-item-products').innerText();
  await page.getByTestId('lang-toggle').click();
  await openMenu(page);
  await expect(page.getByTestId('menu-item-products')).not.toHaveText(before);
});
