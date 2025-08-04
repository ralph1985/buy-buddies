import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 10000,
  use: {
    headless: true,
    baseURL: 'https://develop.buybuddies.vercel.app',
  },
});
