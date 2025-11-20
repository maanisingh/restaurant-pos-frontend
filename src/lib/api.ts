import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API Methods
export const menuAPI = {
  getItems: () => api.get(API_CONFIG.ENDPOINTS.MENU_ITEMS),
  getCategories: () => api.get(API_CONFIG.ENDPOINTS.CATEGORIES),
  createItem: (data: any) => api.post(API_CONFIG.ENDPOINTS.MENU_ITEMS, data),
  updateItem: (id: number, data: any) => api.put(`${API_CONFIG.ENDPOINTS.MENU_ITEMS}/${id}`, data),
  deleteItem: (id: number) => api.delete(`${API_CONFIG.ENDPOINTS.MENU_ITEMS}/${id}`),
};

export const ordersAPI = {
  getAll: () => api.get(API_CONFIG.ENDPOINTS.ORDERS),
  getById: (id: number) => api.get(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`),
  create: (data: any) => api.post(API_CONFIG.ENDPOINTS.ORDERS, data),
  updateStatus: (id: number, status: string) =>
    api.patch(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/status`, { status }),
};

export const kitchenAPI = {
  getOrders: () => api.get(API_CONFIG.ENDPOINTS.KITCHEN_ORDERS),
  updateStatus: (id: number, status: string) =>
    api.patch(`${API_CONFIG.ENDPOINTS.UPDATE_ORDER_STATUS}/${id}/status`, { status }),
};

export const tablesAPI = {
  getAll: () => api.get(API_CONFIG.ENDPOINTS.TABLES),
  getById: (id: number) => api.get(`${API_CONFIG.ENDPOINTS.TABLES}/${id}`),
  updateStatus: (id: number, status: string) =>
    api.patch(`${API_CONFIG.ENDPOINTS.TABLES}/${id}/status`, { status }),
};

export const statsAPI = {
  getDashboard: () => api.get(API_CONFIG.ENDPOINTS.STATS),
};
