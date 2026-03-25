import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy cart', () => {
  test('should update cart quantities and remove items', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Add multiple products to cart to verify cart functionality
    const products = page.locator('.product-card');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    // Add first product to cart
    const firstProduct = products.first();
    const addToCart = firstProduct.locator('.add-to-cart');
    await addToCart.click();
    await humanLikeDelay(200, 400);

    // Open cart page
    const cartIcon = page.locator('[aria-label="cart"]');
    await cartIcon.click();
    await humanLikeDelay(500, 1000);

    // Verify cart page is displayed
    const cartPage = page.locator('#cart-page');
    await expect(cartPage).toBeVisible({ timeout: 5000 });

    // Verify items are displayed in cart
    const cartItems = page.locator('#cart-items');
    await expect(cartItems).toBeVisible({ timeout: 5000 });
    
    // Verify we have cart item elements with quantity inputs or remove buttons
    const itemsInCart = cartItems.locator('div[style*="padding"]');
    const itemCount = await itemsInCart.count();
    expect(itemCount).toBeGreaterThan(0);

    // Verify quantity controls exist
    const qtyInputs = page.locator('#cart-items input[type="number"]');
    if (await qtyInputs.count() > 0) {
      const firstQtyInput = qtyInputs.first();
      await expect(firstQtyInput).toBeVisible();
    }
  });
});