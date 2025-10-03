export type AppMode = 'mock' | 'api';

export const config = {
	mode: (import.meta.env.VITE_APP_MODE as AppMode) || 'mock',
	api: {
		baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
		apiKey: import.meta.env.VITE_API_KEY || '',
	},
	mock: {
		delay: Number(import.meta.env.VITE_MOCK_DELAY ?? 300),
	},
	http: {
		retryCount: Number(import.meta.env.VITE_HTTP_RETRY_COUNT ?? 3),
		timeoutMs: Number(import.meta.env.VITE_HTTP_TIMEOUT_MS ?? 10000),
		includeCredentials: String(import.meta.env.VITE_HTTP_INCLUDE_CREDENTIALS ?? 'false') === 'true',
	},
} as const;

export const isMockMode = (): boolean => config.mode === 'mock';
export const isApiMode = (): boolean => config.mode === 'api';

export const API_ENDPOINTS = {
  	companies: {
    	list: '/company',
   		detail: (id: string) => `/company/${id}`,
  	},
  	users: {
    	list: '/users',
    	detail: (id: string) => `/users/${id}`,
  	},
  	inspections: {
    	list: '/inspections',
    	byCompany: (companyId: string) => `/companies/${companyId}/inspections`,
  	},
} as const;

export type Config = typeof config;

