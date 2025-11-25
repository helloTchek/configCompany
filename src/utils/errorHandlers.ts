/**
 * Utilitaires pour la gestion des erreurs
 */

import {
  ApiError,
  ValidationError,
  NetworkError,
  UnauthorizedError,
  NotFoundError,
  getErrorMessage,
} from '@/types/errors';

/**
 * Wrapper pour gérer les erreurs d'une fonction asynchrone
 * @template T Type de retour de la fonction
 * @param fn Fonction asynchrone à exécuter
 * @param errorHandler Fonction de gestion d'erreur personnalisée (optionnel)
 * @returns Fonction wrappée avec gestion d'erreur
 *
 * @example
 * const safeLoadData = withErrorHandler(
 *   async () => await api.getData(),
 *   (error) => console.error('Failed to load:', error.message)
 * );
 * await safeLoadData();
 */
export function withErrorHandler<T extends (...args: never[]) => Promise<unknown>>(
  fn: T,
  errorHandler?: (error: ApiError) => void
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      const apiError = ApiError.fromError(error);
      if (errorHandler) {
        errorHandler(apiError);
      }
      throw apiError;
    }
  }) as T;
}

/**
 * Crée un handler d'erreur standard pour les composants React
 * @param setError Fonction pour définir l'état d'erreur
 * @param defaultMessage Message par défaut si l'erreur n'a pas de message
 * @returns Handler d'erreur
 *
 * @example
 * const [error, setError] = useState<string | null>(null);
 * const handleError = createErrorHandler(setError);
 *
 * try {
 *   await loadData();
 * } catch (err) {
 *   handleError(err);
 * }
 */
export function createErrorHandler(
  setError: (error: string | null) => void,
  defaultMessage = 'An error occurred'
) {
  return (error: unknown) => {
    const message = getErrorMessage(error) || defaultMessage;
    setError(message);
    console.error('Error:', error);
  };
}

/**
 * Transforme une erreur HTTP en ApiError typé
 * @param response Response HTTP
 * @returns ApiError approprié selon le status code
 */
export async function handleHttpError(response: Response): Promise<never> {
  const status = response.status;
  let message = `HTTP ${status}: ${response.statusText}`;

  try {
    const data = await response.json();
    message = data.message || data.error || message;
  } catch {
    // Ignore les erreurs de parsing JSON
  }

  switch (status) {
    case 400:
      throw new ValidationError(message);
    case 401:
      throw new UnauthorizedError(message);
    case 404:
      throw new NotFoundError(message);
    case 0:
      throw new NetworkError();
    default:
      throw new ApiError(message, status);
  }
}

/**
 * Wrapper try-catch simplifié pour exécution immédiate
 * @template T Type de retour
 * @param fn Fonction à exécuter
 * @param fallback Valeur de fallback en cas d'erreur
 * @returns Résultat ou valeur de fallback
 *
 * @example
 * const result = await tryCatch(
 *   () => JSON.parse(data),
 *   { default: 'value' }
 * );
 */
export async function tryCatch<T>(
  fn: () => Promise<T> | T,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error('Error in tryCatch:', error);
    return fallback;
  }
}

/**
 * Wrapper try-catch avec handler d'erreur personnalisé
 * @template T Type de retour
 * @param fn Fonction à exécuter
 * @param onError Handler d'erreur
 * @returns Résultat ou undefined en cas d'erreur
 *
 * @example
 * const result = await tryCatchWithHandler(
 *   () => api.getData(),
 *   (error) => showNotification(error.message)
 * );
 */
export async function tryCatchWithHandler<T>(
  fn: () => Promise<T> | T,
  onError: (error: ApiError) => void
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    const apiError = ApiError.fromError(error);
    onError(apiError);
    return undefined;
  }
}

/**
 * Retente une fonction avec un délai exponentiel en cas d'erreur
 * @template T Type de retour
 * @param fn Fonction à exécuter
 * @param options Options de retry
 * @returns Résultat de la fonction
 *
 * @example
 * const data = await retryWithBackoff(
 *   () => api.fetchData(),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * backoffMultiplier, maxDelay);
      }
    }
  }

  throw ApiError.fromError(lastError);
}
