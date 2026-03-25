import { test, expect } from '@playwright/test';
import { setupMockPage } from '../fixtures/mock-page-setup';
import { humanLikeDelay } from '../utils/stealth-helpers';

test.describe('Chewy account auth', () => {
  test('should display sign in form and handle bad login attempt', async ({ page }) => {
    await setupMockPage(page);
    await humanLikeDelay(500, 1000);

    // Click sign in link
    const signInLink = page.locator('a.sign-in');
    await expect(signInLink).toBeVisible({ timeout: 5000 });
    await signInLink.click();
    await humanLikeDelay(300, 500);

    // Wait for login page to be visible
    const loginPage = page.locator('#login-page');
    await expect(loginPage).toBeVisible({ timeout: 5000 });

    // Verify email and password inputs are visible
    const loginForm = page.locator('#login-form');
    await expect(loginForm).toBeVisible({ timeout: 5000 });

    const email = loginForm.locator('input[type="email"]');
    const password = loginForm.locator('input[type="password"]');
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();

    // Try invalid login
    await email.fill('invalid@example.com');
    await password.fill('WrongPassword');

    // Submit form
    const submitButton = loginForm.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await humanLikeDelay(300, 500);

    // Verify error message appears
    const errorMsg = page.locator('#login-error');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
    await expect(errorMsg).toContainText(/invalid|password/i);
  });
});