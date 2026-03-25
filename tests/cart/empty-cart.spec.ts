import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy empty cart', () => {
  test('should display empty cart message and continue shopping option', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Click on cart icon to open cart page
    const cartIcon = page.locator('[aria-label="cart"]');
    await expect(cartIcon).toBeVisible({ timeout: 5000 });
    await cartIcon.click();
    await humanLikeDelay(300, 500);

    // Verify cart page is visible
    const cartPage = page.locator('#cart-page');
    await expect(cartPage).toBeVisible({ timeout: 5000 });

    // Verify empty cart message
    const emptyCart = cartPage.locator('.empty-cart');
    await expect(emptyCart).toBeVisible({ timeout: 5000 });
    
    const emptyText = emptyCart.locator('h2');
    await expect(emptyText).toContainText('Your cart is empty');

    // Verify continue shopping button exists and is in the empty cart section
    const continueShopping = emptyCart.locator('a.continue-shopping');
    await expect(continueShopping).toBeVisible({ timeout: 5000 });
  });
});
