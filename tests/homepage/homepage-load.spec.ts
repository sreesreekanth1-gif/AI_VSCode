import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

const getSearchInput = async (page) => {
  const selectors = [
    'input[type="search"]',
    'input[aria-label*="search"]',
    'input[placeholder*="Search"]',
    'input[id*="search"]',
    'input[name*="search"]'
  ];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (await locator.count() > 0) {
      return locator;
    }
  }
  return null;
};

test.describe('Chewy homepage', () => {
  test('should load and display key elements', async ({ page }) => {
    // Setup mock data instead of hitting live site
    await setupMockPage(page);

    // Simulate human-like delays
    await humanLikeDelay(500, 1000);

    await expect(page.locator('header')).toBeVisible({ timeout: 5000 });

    const search = await getSearchInput(page);
    await expect(search, 'Search input should exist').not.toBeNull();
    await expect(search).toBeVisible({ timeout: 5000 });

    const cart = page.locator('[aria-label*="cart"]');
    await expect(cart.first()).toBeVisible({ timeout: 5000 });

    const hero = page.locator('.hero');
    await expect(hero).toBeVisible({ timeout: 5000 });

    // Verify mock products are rendered
    const products = page.locator('.product-card');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });
});
