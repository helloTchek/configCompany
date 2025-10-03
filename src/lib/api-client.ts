import { config } from '@/config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
	method?: HttpMethod;
	headers?: Record<string, string>;
	body?: unknown;
	params?: Record<string, unknown>;
	timeoutMs?: number;
	retryCount?: number;
}

class ApiClient {
	private readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl.replace(/\/$/, '');
	}

	private getDefaultHeaders(): Record<string, string> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};
		const token = localStorage.getItem('accessToken');
		if (token) headers.Authorization = `Bearer ${token}`;
		if (config.api.apiKey) headers['x-api-key'] = config.api.apiKey;
		return headers;
	}

	private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
		const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value === undefined || value === null || value === '') return;
				if (Array.isArray(value)) value.forEach(v => url.searchParams.append(`${key}[]`, String(v)));
				else url.searchParams.append(key, String(value));
			});
		}
		return url.toString();
	}

	private async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const id = setTimeout(() => reject(new Error('Request timed out')), timeoutMs);
			promise
				.then(value => resolve(value))
				.catch(err => reject(err))
				.finally(() => clearTimeout(id));
		});
	}

	private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		const method = options.method ?? 'GET';
		const headers = { ...this.getDefaultHeaders(), ...(options.headers ?? {}) };
		const url = this.buildUrl(endpoint, options.params);
		const retryCount = options.retryCount ?? config.http.retryCount;
		const timeoutMs = options.timeoutMs ?? config.http.timeoutMs;

		let attempt = 0;
		let lastError: unknown = null;
		while (attempt <= retryCount) {
			try {
				const response = await this.withTimeout(
					fetch(url, {
						method,
						headers,
						body: options.body !== undefined ? JSON.stringify(options.body) : null,
						credentials: config.http.includeCredentials ? 'include' : 'omit',
					}),
					timeoutMs
				);

				if (!response.ok) {
					const errorBody = await response.text().catch(() => '');
					throw new Error(`HTTP ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ''}`);
				}

				const contentType = response.headers.get('content-type') || '';
				if (contentType.includes('application/json')) {
					const text = await response.text();
					if (!text) return {} as T;
					return JSON.parse(text) as T;
				}
				// Non-JSON: try read text; if empty, return empty object
				const fallbackText = await response.text().catch(() => '');
				return (fallbackText ? (fallbackText as unknown as T) : ({} as T));
			} catch (error) {
				lastError = error;
				attempt += 1;
				if (attempt > retryCount) break;
				await new Promise(r => setTimeout(r, 200 * attempt));
			}
		}

		throw lastError instanceof Error ? lastError : new Error('Unknown network error');
	}

	get<T>(endpoint: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...(options ?? {}), method: 'GET', params: params ?? {} });
	}
	post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...(options ?? {}), method: 'POST', body });
	}
	put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...(options ?? {}), method: 'PUT', body });
	}
	patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...(options ?? {}), method: 'PATCH', body });
	}
	delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...(options ?? {}), method: 'DELETE' });
	}
}

export const apiClient = new ApiClient(config.api.baseUrl);
export default apiClient;


