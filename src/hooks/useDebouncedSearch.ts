import { useState, useEffect } from 'react';

/**
 * Hook pour gérer une recherche avec debounce
 * @param delay Délai en millisecondes avant d'appliquer la recherche (défaut: 500ms)
 * @returns Tuple [searchTerm, debouncedTerm, setSearchTerm]
 *
 * @example
 * const [searchTerm, debouncedTerm, setSearchTerm] = useDebouncedSearch(500);
 * // searchTerm change immédiatement
 * // debouncedTerm change après 500ms
 * // Utiliser debouncedTerm pour les appels API
 */
export function useDebouncedSearch(delay = 500) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return [searchTerm, debouncedTerm, setSearchTerm] as const;
}
