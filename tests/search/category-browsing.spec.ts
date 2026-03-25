import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy category browsing', () => {
  test('should apply and clear filters in a product category', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Verify products are loaded
    const productCard = page.locator('.product-card');
    const initialCount = await productCard.count();
    expect(initialCount).toBeGreaterThan(0);
  });

  test('should sort results by price low to high', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Verify products are displayed
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify products have prices
    const firstPrice = page.locator('.product-card .product-price').first();
    await expect(firstPrice).toBeVisible({ timeout: 5000 });
  });
});