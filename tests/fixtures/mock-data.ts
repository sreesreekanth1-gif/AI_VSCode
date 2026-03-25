/**
 * Mock data for Chewy.com testing
 * Simulates realistic product, cart, and user data
 */

export const mockProducts = [
  {
    id: '1001',
    name: 'Purina Pro Plan Dry Dog Food',
    brand: 'Purina Pro Plan',
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.5,
    reviews: 832,
    inStock: true,
    image: 'https://via.placeholder.com/300x300?text=Purina+Pro+Plan',
    description: 'Advanced nutrition formula with real chicken',
    variants: [
      { size: '15 lb', price: 45.99 },
      { size: '30 lb', price: 79.99 },
    ],
  },
  {
    id: '1002',
    name: 'Royal Canin Dry Dog Food',
    brand: 'Royal Canin',
    price: 62.49,
    originalPrice: 69.99,
    rating: 4.7,
    reviews: 456,
    inStock: true,
    image: 'https://via.placeholder.com/300x300?text=Royal+Canin',
    description: 'Vet-recommended nutrition',
    variants: [
      { size: '8.8 lb', price: 35.99 },
      { size: '17.6 lb', price: 62.49 },
    ],
  },
  {
    id: '1003',
    name: 'Blue Buffalo Dog Food',
    brand: 'Blue Buffalo',
    price: 38.49,
    originalPrice: null,
    rating: 4.3,
    reviews: 623,
    inStock: true,
    image: 'https://via.placeholder.com/300x300?text=Blue+Buffalo',
    description: 'Natural ingredients, no by-products',
    variants: [
      { size: '12 lb', price: 24.99 },
      { size: '24 lb', price: 38.49 },
    ],
  },
];

export const mockCategories = [
  { id: 'dogs', name: 'Dogs', href: '/dog-food' },
  { id: 'cats', name: 'Cats', href: '/cat-food' },
  { id: 'fish', name: 'Fish', href: '/fish-food' },
  { id: 'birds', name: 'Birds', href: '/bird-food' },
];

export const mockFilters = {
  brands: [
    { id: 'purina', label: 'Purina', count: 245 },
    { id: 'royal-canin', label: 'Royal Canin', count: 156 },
    { id: 'blue-buffalo', label: 'Blue Buffalo', count: 89 },
    { id: 'hill-science', label: 'Hill\'s Science Diet', count: 167 },
  ],
  prices: [
    { id: 'under-30', label: 'Under $30', min: 0, max: 30 },
    { id: '30-60', label: '$30 - $60', min: 30, max: 60 },
    { id: '60-100', label: '$60 - $100', min: 60, max: 100 },
    { id: 'over-100', label: 'Over $100', min: 100, max: 99999 },
  ],
  ratings: [
    { id: '5-star', label: '5 Stars', rating: 5, count: 234 },
    { id: '4-star', label: '4+ Stars', rating: 4, count: 512 },
    { id: '3-star', label: '3+ Stars', rating: 3, count: 678 },
  ],
};

export const mockCart = {
  items: [] as Array<{ productId: string; quantity: number; price: number }>,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  addresses: [
    {
      id: 'addr-1',
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zip: '12345',
      phone: '555-0123',
    },
  ],
  savedPayments: [
    {
      id: 'pay-1',
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
    },
  ],
};

export const mockSearchResults = (query: string) => {
  if (query.toLowerCase().includes('dog')) {
    return mockProducts.slice(0, 2);
  }
  if (query.toLowerCase().includes('cat')) {
    return [mockProducts[1]];
  }
  return [];
};

export const mockEmptySearch = () => ({
  results: [],
  message: 'No products found. Try different keywords.',
});
