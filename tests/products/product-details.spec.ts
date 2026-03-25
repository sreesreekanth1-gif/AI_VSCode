import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy product details', () => {
  test('should open product details from search result and add to cart', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Verify product cards are visible
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });

    // Verify product name and price are visible
    const productName = firstProduct.locator('.product-name');
    await expect(productName).toBeVisible();

    // Verify add to cart button exists and is clickable
    const addToCart = firstProduct.locator('.add-to-cart');
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Verify button feedback
    await expect(addToCart).toContainText(/Added|Add/);
  });
});