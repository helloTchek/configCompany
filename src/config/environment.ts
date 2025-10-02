export interface EnvironmentConfig {
  USE_MOCK_DATA: boolean;
  API_BASE_URL: string;
  API_TIMEOUT: number;
  ENABLE_LOGGING: boolean;
}

const environment: EnvironmentConfig = {
  USE_MOCK_DATA: true, // Set to false when connecting to real backend
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  API_TIMEOUT: 10000, // 10 seconds
  ENABLE_LOGGING: import.meta.env.DEV || false,
};

export default environment;