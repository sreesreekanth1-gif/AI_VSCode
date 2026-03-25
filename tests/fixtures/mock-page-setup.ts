/**
 * Mock page setup helper
 * Intercepts network requests and returns mock data
 */
import { Page } from '@playwright/test';
import {
  mockProducts,
  mockCategories,
  mockFilters,
  mockSearchResults,
  mockEmptySearch,
} from './mock-data';

export async function setupMockPage(page: Page) {
  // Abort all real network requests to external APIs
  await page.route('**/*.chewy.com/api/**', (route) => route.abort());
  await page.route('**/*.cloudflare.com/**', (route) => route.abort());
  await page.route('**/*.analytics.google.com/**', (route) => route.abort());

  // Load a mock HTML page
  const mockHTML = generateMockHTML();
  await page.setContent(mockHTML);
}

export async function injectMockAPI(page: Page) {
  // Inject mock API into window object for tests
  await page.evaluate((data) => {
    (window as any).MOCK_API = {
      products: data.products,
      categories: data.categories,
      filters: data.filters,
      searchResults: (query: string) => {
        const q = query.toLowerCase();
        return data.products.filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        );
      },
      cart: { items: [], total: 0 },
    };
  }, { products: mockProducts, categories: mockCategories, filters: mockFilters });
}

function generateMockHTML(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chewy.com - Pet Food, Supplies & More</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        header {
          background: white;
          padding: 20px;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo { font-size: 24px; font-weight: bold; color: #08a0e9; }
        .search { flex: 1; max-width: 500px; margin: 0 20px; }
        input[type="search"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .cart-icon { cursor: pointer; font-size: 20px; }
        .sign-in { cursor: pointer; color: #08a0e9; text-decoration: none; }
        nav {
          background: white;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }
        nav a {
          margin-right: 20px;
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
          margin-bottom: 40px;
        }
        .hero h1 { font-size: 32px; margin-bottom: 10px; }
        .hero p { font-size: 18px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .product-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .product-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .product-image { width: 100%; height: 200px; background: #f0f0f0; margin-bottom: 10px; border-radius: 4px; }
        .product-name { font-weight: bold; margin: 10px 0; font-size: 14px; }
        .product-brand { color: #666; font-size: 12px; }
        .product-price { color: #08a0e9; font-size: 16px; font-weight: bold; margin: 10px 0; }
        .product-rating { color: #ffa500; font-size: 12px; }
        .add-to-cart, button {
          background: #08a0e9;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
          width: 100%;
        }
        .add-to-cart:hover { background: #0681b8; }
        .empty-cart { text-align: center; padding: 40px; }
        .empty-cart h2 { margin-bottom: 20px; }
        .continue-shopping { display: inline-block; background: #08a0e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
        .filter-panel { background: white; padding: 20px; margin-right: 20px; border-radius: 8px; }
        .filter-panel h3 { margin-bottom: 15px; }
        .filter-panel label { display: block; margin-bottom: 10px; cursor: pointer; }
        .filter-panel input { margin-right: 10px; }
        .sort-container { display: flex; align-items: center; gap: 10px; margin: 20px 0; }
        .sort-container select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .login-form { max-width: 400px; margin: 40px auto; background: white; padding: 30px; border-radius: 8px; }
        .login-form input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
        .login-form button { width: 100%; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">Chewy</div>
        <div class="search">
          <input type="search" aria-label="search" placeholder="Search for products...">
        </div>
        <a href="#" class="sign-in">Sign In</a>
        <div class="cart-icon" aria-label="cart">🛒</div>
      </header>

      <nav>
        <a href="#">Dogs</a>
        <a href="#">Cats</a>
        <a href="#">Fish</a>
        <a href="#">Birds</a>
        <a href="#">Small Pets</a>
        <a href="#">Reptiles</a>
      </nav>

      <div class="hero">
        <h1>Welcome to Chewy.com</h1>
        <p>Shop our wide selection of pet food and supplies</p>
      </div>

      <div class="container">
        <div class="product-grid" id="product-grid">
          <!-- Products loaded here -->
        </div>
      </div>

      <!-- Cart page (hidden by default) -->
      <div id="cart-page" style="display: none;">
        <div class="container">
          <h1>Shopping Cart</h1>
          <div id="cart-items" style="margin: 20px 0;"></div>
          <div style="text-align: right; margin: 20px 0;">
            <p>Cart Total: $<span id="cart-total">0.00</span></p>
            <button style="background: #08a0e9; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <!-- Checkout page (hidden by default) -->
      <div id="checkout-page" style="display: none;">
        <div class="container">
          <h1>Checkout</h1>
          <form id="checkout-form" style="max-width: 500px; margin: 20px 0;">
            <h2>Shipping Address</h2>
            <input type="text" placeholder="First Name" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <input type="text" placeholder="Last Name" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <input type="email" placeholder="Email" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <input type="text" placeholder="Address" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <input type="text" placeholder="City" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <select style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
              <option>Select State</option>
              <option>CA</option>
              <option>NY</option>
              <option>TX</option>
            </select>
            <input type="text" placeholder="ZIP Code" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <h2 style="margin-top: 30px;">Payment</h2>
            <input type="text" placeholder="Card Number" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <button type="submit" style="width: 100%; background: #08a0e9; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">Complete Order</button>
          </form>
        </div>
      </div>

      <!-- Order Confirmation (hidden by default) -->
      <div id="confirmation-page" style="display: none;">
        <div class="container">
          <h1>Thank you for your order!</h1>
          <p>Your order has been confirmed. Order ID: #12345</p>
          <a href="#" style="display: inline-block; background: #08a0e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Continue Shopping</a>
        </div>
      </div>

      <!-- Login page (hidden by default) -->
      <div id="login-page" style="display: none;">
        <div class="login-form">
          <h2>Sign In to Your Account</h2>
          <form id="login-form">
            <input type="email" placeholder="Email Address" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <input type="password" placeholder="Password" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <button type="submit" style="width: 100%; background: #08a0e9; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">Sign In</button>
            <div id="login-error" style="color: red; margin-top: 10px; display: none;">Invalid email or password</div>
          </form>
        </div>
      </div>

      <script>
        // Initialize cart
        let cart = [];
        let cartVisible = false;
        let pageView = 'home'; // home, cart, checkout, confirmation, login

        // Load mock products on page load
        document.addEventListener('DOMContentLoaded', () => {
          const products = JSON.parse('${JSON.stringify(mockProducts)}');
          const grid = document.getElementById('product-grid');
          
          if (grid) {
            products.forEach(product => {
              const card = document.createElement('div');
              card.className = 'product-card';
              card.style.cursor = 'pointer';
              card.innerHTML = \`
                <div class="product-image"></div>
                <div class="product-brand">\${product.brand}</div>
                <div class="product-name">\${product.name}</div>
                <div class="product-rating">⭐ \${product.rating} (\${product.reviews} reviews)</div>
                <div class="product-price">$\${product.price}</div>
                <button class="add-to-cart" data-product-id="\${product.id}">Add to Cart</button>
              \`;
              card.addEventListener('click', () => showProductDetail(product));
              grid.appendChild(card);
            });
          }

          // Add to cart handlers
          document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const productId = btn.getAttribute('data-product-id');
              const product = products.find(p => p.id == productId);
              if (product) {
                addToCart(product);
                btn.textContent = 'Added!';
                setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
              }
            });
          });

          // Sign in link
          const signIn = document.querySelector('.sign-in');
          if (signIn) {
            signIn.addEventListener('click', (e) => {
              e.preventDefault();
              showLoginPage();
            });
          }

          // Cart icon
          const cartIcon = document.querySelector('.cart-icon');
          if (cartIcon) {
            cartIcon.addEventListener('click', showCartPage);
          }
        });

        function addToCart(product) {
          const existing = cart.find(item => item.id === product.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
        }

        function showProductDetail(product) {
          // Could navigate to a detail page, but for now just show alert
          alert(\`Viewing product: \${product.name}\`);
        }

        function showCartPage() {
          pageView = 'cart';
          document.getElementById('product-grid').parentElement.style.display = 'none';
          document.getElementById('cart-page').style.display = 'block';
          document.getElementById('checkout-page').style.display = 'none';
          document.getElementById('login-page').style.display = 'none';
          document.getElementById('confirmation-page').style.display = 'none';

          const cartItems = document.getElementById('cart-items');
          cartItems.innerHTML = '';
          
          if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><h2>Your cart is empty</h2><a href="#" class="continue-shopping" onclick="showHomePage()">Continue Shopping</a></div>';
            document.getElementById('cart-page').querySelector('button').style.display = 'none';
          } else {
            let total = 0;
            cart.forEach(item => {
              const itemTotal = item.price * item.quantity;
              total += itemTotal;
              const itemDiv = document.createElement('div');
              itemDiv.style.cssText = 'padding: 15px; border: 1px solid #ddd; margin: 10px 0; border-radius: 4px;';
              itemDiv.innerHTML = \`
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <strong>\${item.name}</strong><br/>
                    Price: $\${item.price}
                  </div>
                  <div>
                    Quantity: <input type="number" value="\${item.quantity}" min="1" style="width: 50px; padding: 5px;" onchange="updateQuantity(\${item.id}, this.value)">
                    <button onclick="removeFromCart(\${item.id})" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 10px;">Remove</button>
                  </div>
                </div>
              \`;
              cartItems.appendChild(itemDiv);
            });
            document.getElementById('cart-total').textContent = total.toFixed(2);
            document.getElementById('cart-page').querySelector('button').style.display = 'inline-block';
            document.getElementById('cart-page').querySelector('button').addEventListener('click', showCheckoutPage);
          }
        }

        function updateQuantity(productId, quantity) {
          const item = cart.find(i => i.id == productId);
          if (item) {
            item.quantity = parseInt(quantity );
            if (item.quantity <= 0) {
              removeFromCart(productId);
            } else {
              showCartPage();
            }
          }
        }

        function removeFromCart(productId) {
          cart = cart.filter(item => item.id !== productId);
          showCartPage();
        }

        function showCheckoutPage() {
          pageView = 'checkout';
          document.getElementById('product-grid').parentElement.style.display = 'none';
          document.getElementById('cart-page').style.display = 'none';
          document.getElementById('checkout-page').style.display = 'block';
          document.getElementById('login-page').style.display = 'none';
          document.getElementById('confirmation-page').style.display = 'none';

          document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            showConfirmationPage();
          });
        }

        function showConfirmationPage() {
          pageView = 'confirmation';
          document.getElementById('product-grid').parentElement.style.display = 'none';
          document.getElementById('cart-page').style.display = 'none';
          document.getElementById('checkout-page').style.display = 'none';
          document.getElementById('login-page').style.display = 'none';
          document.getElementById('confirmation-page').style.display = 'block';
          
          document.querySelector('[href="#"]').addEventListener('click', showHomePage);
        }

        function showLoginPage() {
          pageView = 'login';
          document.getElementById('product-grid').parentElement.style.display = 'none';
          document.getElementById('cart-page').style.display = 'none';
          document.getElementById('checkout-page').style.display = 'none';
          document.getElementById('login-page').style.display = 'block';
          document.getElementById('confirmation-page').style.display = 'none';

          document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('#login-form input[type="email"]').value;
            const password = document.querySelector('#login-form input[type="password"]').value;
            
            // Simulate login validation
            if (email === 'test@example.com' && password === 'password123') {
              alert('Login successful!');
              showHomePage();
            } else {
              document.getElementById('login-error').style.display = 'block';
              document.getElementById('login-error').textContent = 'Invalid email or password';
            }
          });
        }

        function showHomePage() {
          pageView = 'home';
          document.getElementById('product-grid').parentElement.style.display = 'block';
          document.getElementById('cart-page').style.display = 'none';
          document.getElementById('checkout-page').style.display = 'none';
          document.getElementById('login-page').style.display = 'none';
          document.getElementById('confirmation-page').style.display = 'none';
        }
      </script>
    </body>
    </html>
  `;
}
