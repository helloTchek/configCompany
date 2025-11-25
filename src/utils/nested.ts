/**
 * Utilitaires pour manipuler des objets imbriqués
 */

/**
 * Définit une valeur dans un objet imbriqué en utilisant un chemin en notation pointée
 * @template T Type de l'objet
 * @param obj Objet à modifier
 * @param path Chemin vers la propriété (ex: 'user.address.city')
 * @param value Valeur à définir
 * @returns Nouvel objet avec la valeur modifiée (immutable)
 *
 * @example
 * const obj = { user: { name: 'John', address: { city: 'Paris' } } };
 * const newObj = setNestedValue(obj, 'user.address.city', 'Lyon');
 * // newObj.user.address.city === 'Lyon'
 * // obj reste inchangé
 */
export function setNestedValue<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
): T {
  const keys = path.split('.');
  const result = { ...obj };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (key) {
      current[key] = { ...current[key] };
      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey) {
    current[lastKey] = value;
  }

  return result;
}

/**
 * Récupère une valeur dans un objet imbriqué en utilisant un chemin en notation pointée
 * @template T Type de retour attendu
 * @param obj Objet source
 * @param path Chemin vers la propriété (ex: 'user.address.city')
 * @param defaultValue Valeur par défaut si le chemin n'existe pas
 * @returns Valeur trouvée ou valeur par défaut
 *
 * @example
 * const obj = { user: { name: 'John', address: { city: 'Paris' } } };
 * const city = getNestedValue(obj, 'user.address.city'); // 'Paris'
 * const country = getNestedValue(obj, 'user.address.country', 'France'); // 'France'
 */
export function getNestedValue<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }

  return current as T;
}

/**
 * Vérifie si un chemin existe dans un objet imbriqué
 * @param obj Objet source
 * @param path Chemin vers la propriété (ex: 'user.address.city')
 * @returns true si le chemin existe, false sinon
 *
 * @example
 * const obj = { user: { name: 'John', address: { city: 'Paris' } } };
 * hasNestedValue(obj, 'user.address.city'); // true
 * hasNestedValue(obj, 'user.address.country'); // false
 */
export function hasNestedValue(
  obj: Record<string, unknown>,
  path: string
): boolean {
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Supprime une propriété dans un objet imbriqué
 * @template T Type de l'objet
 * @param obj Objet source
 * @param path Chemin vers la propriété à supprimer
 * @returns Nouvel objet sans la propriété (immutable)
 *
 * @example
 * const obj = { user: { name: 'John', age: 30 } };
 * const newObj = deleteNestedValue(obj, 'user.age');
 * // newObj.user.age === undefined
 */
export function deleteNestedValue<T extends Record<string, unknown>>(
  obj: T,
  path: string
): T {
  const keys = path.split('.');
  const result = { ...obj };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (key) {
      current[key] = { ...current[key] };
      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey && current && typeof current === 'object') {
    const { [lastKey]: _, ...rest } = current;
    Object.assign(current, rest);
  }

  return result;
}
