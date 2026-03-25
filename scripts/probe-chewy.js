const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.chewy.com/');
  const search = await page.$('input[type=search], input[name*=search], input[aria-label*=Search], input[id*=search]');
  console.log('search', !!search);
  if (search) console.log('placeholder', await search.getAttribute('placeholder'));
  const cart = await page.$('a[aria-label*=Cart], button[aria-label*=Cart], .mini-cart, #cart-sticky');
  console.log('cart', !!cart);
  const sign = await page.$('text=Sign In');
  console.log('signin', !!sign);
  await page.goto('https://www.chewy.com/cart');
  const emptyTextExists = await page.locator('text=Your cart is empty, text=Empty cart, text=No items in cart').count();
  console.log('emptyCartTextCount', emptyTextExists);
  await browser.close();
})();
