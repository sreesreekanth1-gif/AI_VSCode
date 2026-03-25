/**
 * Anti-bot bypass helpers for Playwright
 * Makes automated tests appear more human-like
 */

/**
 * Random delay to simulate human-like behavior
 * @param min - minimum delay in ms (default: 500)
 * @param max - maximum delay in ms (default: 2000)
 */
export async function humanLikeDelay(min = 500, max = 2000) {
  const delay = Math.random() * (max - min) + min;
  await new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Simulate human scrolling behavior
 */
export async function humanScroll(page) {
  const maxScroll = await page.evaluate(() => document.body.scrollHeight);
  const scrollSteps = Math.ceil(maxScroll / 500);

  for (let i = 0; i < scrollSteps; i++) {
    await page.evaluate((scroll) => window.scrollBy(0, scroll), 500);
    await humanLikeDelay(300, 800);
  }
}

/**
 * Add headers and context that mimic real browsers
 */
export async function setupStealthContext(context) {
  // Set extra HTTP headers that real browsers send
  await context.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
  });
}

/**
 * Inject script to hide automation indicators
 */
export async function hideAutomationIndicators(page) {
  await page.addInitScript({
    content: `
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US'] });
      delete navigator.__proto__.webdriver;
    `,
  });
}

/**
 * Human-like typing (not instant)
 */
export async function humanTypeText(locator, text) {
  for (const char of text) {
    await locator.type(char);
    await humanLikeDelay(50, 150);
  }
}
