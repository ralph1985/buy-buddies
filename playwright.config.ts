import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: ['**/*.spec.ts'],
  timeout: 30_000,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL, // se la pasaremos en CI
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
