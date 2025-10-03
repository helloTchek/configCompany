export const config = {
  USE_MOCK_DATA: false,
  
  API_BASE_URL: import.meta.env.VITE_API_URL || '/api',
  
  MOCK_DELAY: 500,
  
  APP_VERSION: '1.0.0',
} as const;

export type Config = typeof config;