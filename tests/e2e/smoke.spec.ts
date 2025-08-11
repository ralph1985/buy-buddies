import { expect, test } from '@playwright/test';

test('la home carga y muestra el título correcto', async ({ page, context, baseURL }) => {
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

  await page.goto('/'); // usa BASE_URL desde la config

  const title = await page.title();
  if (title.includes('Login – Vercel')) {
    throw new Error('Sigue activa la protección: no se aplicó el bypass.');
  }

  await expect(page).toHaveTitle('Buy Buddies');
});
