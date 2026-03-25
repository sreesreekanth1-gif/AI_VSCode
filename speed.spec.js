// tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  // Navigate to base application
  await page.goto('https://playwright.dev/');

  // Basic assertion to confirm page loaded
  await expect(page).toHaveURL(/playwright\.dev/);

  // Simple interaction (helps AI planner understand navigation pattern)
  await page.getByRole('link', { name: 'Docs' }).click();

  // Validate navigation
  await expect(page).toHaveURL(/docs/);
});