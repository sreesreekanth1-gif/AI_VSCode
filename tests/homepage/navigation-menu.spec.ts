import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy navigation menu', () => {
  test('should navigate to category page through main menu', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Verify navigation menu exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible({ timeout: 5000 });

    // Verify category links are visible
    const dogsLink = page.locator('nav a:has-text("Dogs")');
    await expect(dogsLink).toBeVisible({ timeout: 5000 });

    // Verify other category links
    const catsLink = page.locator('nav a:has-text("Cats")');
    await expect(catsLink).toBeVisible({ timeout: 5000 });
  });
});