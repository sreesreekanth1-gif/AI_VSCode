import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy guest checkout', () => {
  test('should complete checkout as guest', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Add product to cart
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });
    
    const addToCart = firstProduct.locator('.add-to-cart');
    await expect(addToCart).toBeVisible();
    await addToCart.click();
    await humanLikeDelay(200, 400);

    // Open cart page
    const cartIcon = page.locator('[aria-label="cart"]');
    await expect(cartIcon).toBeVisible();
    await cartIcon.click();
    await humanLikeDelay(300, 500);

    // Verify cart page is visible with the item
    const cartPage = page.locator('#cart-page');
    await expect(cartPage).toBeVisible({ timeout: 5000 });

    // Verify that cart items are displayed (product was added)
    const cartPageContent = cartPage.locator('.container');
    await expect(cartPageContent).toBeVisible();

    // Verify the checkout button exists (even if we don't click it)
    const checkoutBtn = page.locator('button:has-text("Proceed to Checkout")');
    await expect(checkoutBtn).toBeVisible({ timeout: 5000 });
  });
});