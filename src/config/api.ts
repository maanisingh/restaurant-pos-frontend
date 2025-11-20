export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:6100',
  ENDPOINTS: {
    // Menu
    MENU_ITEMS: '/api/menu',
    CATEGORIES: '/api/categories',

    // Orders
    ORDERS: '/api/orders',
    ORDER_ITEMS: '/api/order-items',

    // Kitchen
    KITCHEN_ORDERS: '/api/kitchen/orders',
    UPDATE_ORDER_STATUS: '/api/kitchen/orders',

    // Tables
    TABLES: '/api/tables',
    TABLE_STATUS: '/api/tables',

    // Stats
    STATS: '/api/stats',
  }
};
