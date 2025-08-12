import { defineConfig, devices } from '@playwright/test';

const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const extraHeaders = bypass ? { 'x-vercel-protection-bypass': bypass } : undefined;

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: ['**/*.spec.ts'],
  timeout: 30_000,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL, // se la pasaremos en CI
    headless: true,
    extraHTTPHeaders: extraHeaders,
    testIdAttribute: 'data-test-id',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
