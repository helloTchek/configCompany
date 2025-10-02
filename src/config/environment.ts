export const config = {
  USE_MOCK_DATA: true,
  API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  APP_NAME: 'Admin Panel',
  VERSION: '1.0.0'
} as const;