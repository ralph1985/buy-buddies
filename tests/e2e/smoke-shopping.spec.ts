import { expect, test } from '@playwright/test';

test('lista y filtrado de productos con data-test-id', async ({ page, context, baseURL }) => {
  const token = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (token && baseURL) {
    const { hostname } = new URL(baseURL);
    await context.addCookies([
      {
        name: '__vercel_protection_bypass',
        value: token,
        domain: hostname,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        expires: Date.now() / 1000 + 3600,
      },
    ]);
  }

  await page.goto('/');
  const title = await page.title();
  if (title.includes('Login – Vercel')) {
    throw new Error('Protección Vercel activa: bypass no aplicado.');
  }

  const totalLocator = page.getByTestId('total-counter');
  await expect(totalLocator).toHaveText(/125 de 125/);

  await page.getByTestId('filters-toggle-btn').click();
  await page.getByTestId('filter-text').locator('input').fill('agua');
  await expect(totalLocator).toHaveText(/3 de 125/);

  await page.getByTestId('filter-category').selectOption({ label: 'Bebida' });
  await expect(totalLocator).toHaveText(/2 de 125/);

  await page.getByTestId('filter-group').selectOption({ label: 'PM - Pedro y Marta' });
  await expect(totalLocator).toHaveText(/1 de 125/);

  const onlyItem = page.getByTestId('product-item');
  await expect(onlyItem).toHaveCount(1);
  await expect(onlyItem.getByTestId('product-title')).toHaveText(/Agua con gas/i);

  await page.getByTestId('filter-status').selectOption({ label: 'Comprado' });
  await expect(totalLocator).toHaveText(/0 de 125/);
  await expect(page.getByTestId('product-item')).toHaveCount(0);

  // Reset filtros
  await page.getByTestId('filter-status').selectOption({ label: 'Todos' });
  await page.getByTestId('filter-category').selectOption('');
  await page.getByTestId('filter-group').selectOption('');
  await page.getByTestId('filter-text').locator('input').fill('');
  await expect(totalLocator).toHaveText(/125 de 125/);
});
