import { chromium } from 'playwright';
import stealth from 'puppeteer-extra-plugin-stealth';

async function test() {
  // Note: playwright-extra doesn't work with playwright directly
  // Use vanilla playwright with stealth-equivalent approaches instead
  
  const browser = await chromium.launch({
    headless: false, // Use headed mode (looks more like real user)
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
    ],
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();
  
  // Set realistic viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Add delay to appear human-like
  await page.waitForTimeout(2000);
  
  await page.goto('https://www.chewy.com/', { waitUntil: 'domcontentloaded' });
  
  await browser.close();
}

test();
