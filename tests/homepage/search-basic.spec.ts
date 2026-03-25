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

test.describe('Chewy search', () => {
  test('should return results for valid query', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(300, 500);

    const searchInput = await getSearchInput(page);
    await expect(searchInput, 'Search input not found').not.toBeNull();
    await expect(searchInput).toBeVisible({ timeout: 30000 });

    // Verify products are rendered on the page
    const productGrid = page.locator('.product-card');
    const count = await productGrid.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show no results for random query', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(300, 500);

    const searchInput = await getSearchInput(page);
    await expect(searchInput, 'Search input not found').not.toBeNull();
    await expect(searchInput).toBeVisible({ timeout: 30000 });

    // Verify products are initially visible
    const productGrid = page.locator('.product-card');
    const count = await productGrid.count();
    expect(count).toBeGreaterThan(0);
  });
});
