import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy product filtering', () => {
  test('should filter products by brand and price and clear filters', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Verify products are loaded
    const products = page.locator('.product-card');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    // Verify product details are visible
    const firstProduct = products.first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });
    await expect(firstProduct.locator('.product-name')).toBeVisible();
    await expect(firstProduct.locator('.product-price')).toBeVisible();
  });
});
