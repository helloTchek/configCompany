/**
 * Utilitaires de formatage
 */

/**
 * Formate une date en format lisible
 * @param date Date à formater (string ISO ou Date)
 * @param locale Locale à utiliser (défaut: 'en-GB')
 * @param options Options de formatage
 * @returns Date formatée ou 'N/A' si invalide
 *
 * @example
 * formatDate('2024-01-15T10:30:00Z'); // '15/01/2024'
 * formatDate(new Date(), 'fr-FR'); // '15/01/2024'
 */
export function formatDate(
  date: string | Date | undefined | null,
  locale = 'en-GB',
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return 'N/A';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'N/A';

    return dateObj.toLocaleDateString(locale, options);
  } catch {
    return 'N/A';
  }
}

/**
 * Formate une date et heure
 * @param date Date à formater
 * @param locale Locale à utiliser (défaut: 'en-GB')
 * @returns Date et heure formatées
 *
 * @example
 * formatDateTime('2024-01-15T10:30:00Z'); // '15/01/2024, 10:30:00'
 */
export function formatDateTime(
  date: string | Date | undefined | null,
  locale = 'en-GB'
): string {
  if (!date) return 'N/A';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'N/A';

    return dateObj.toLocaleString(locale);
  } catch {
    return 'N/A';
  }
}

/**
 * Formate un nombre avec séparateurs de milliers
 * @param value Nombre à formater
 * @param decimals Nombre de décimales (défaut: 0)
 * @param locale Locale à utiliser (défaut: 'en-US')
 * @returns Nombre formaté
 *
 * @example
 * formatNumber(1234567); // '1,234,567'
 * formatNumber(1234.567, 2); // '1,234.57'
 */
export function formatNumber(
  value: number | undefined | null,
  decimals = 0,
  locale = 'en-US'
): string {
  if (value === undefined || value === null) return 'N/A';

  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formate un montant en devise
 * @param amount Montant à formater
 * @param currency Code de devise (défaut: 'EUR')
 * @param locale Locale à utiliser (défaut: 'en-US')
 * @returns Montant formaté avec symbole de devise
 *
 * @example
 * formatCurrency(1234.56, 'EUR'); // '€1,234.56'
 * formatCurrency(1234.56, 'USD'); // '$1,234.56'
 */
export function formatCurrency(
  amount: number | undefined | null,
  currency = 'EUR',
  locale = 'en-US'
): string {
  if (amount === undefined || amount === null) return 'N/A';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Obtient le symbole d'une devise
 * @param currencyCode Code de devise (ex: 'EUR', 'USD', 'GBP')
 * @returns Symbole de devise
 *
 * @example
 * getCurrencySymbol('EUR'); // '€'
 * getCurrencySymbol('USD'); // '$'
 * getCurrencySymbol('GBP'); // '£'
 */
export function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',
    CHF: 'CHF',
    CAD: 'C$',
    AUD: 'A$',
  };
  return symbols[currencyCode] || currencyCode;
}

/**
 * Tronque un texte à une longueur maximale
 * @param text Texte à tronquer
 * @param maxLength Longueur maximale
 * @param suffix Suffixe à ajouter si tronqué (défaut: '...')
 * @returns Texte tronqué
 *
 * @example
 * truncate('Hello World', 5); // 'Hello...'
 * truncate('Hello', 10); // 'Hello'
 */
export function truncate(
  text: string | undefined | null,
  maxLength: number,
  suffix = '...'
): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + suffix;
}

/**
 * Capitalise la première lettre d'un texte
 * @param text Texte à capitaliser
 * @returns Texte capitalisé
 *
 * @example
 * capitalize('hello world'); // 'Hello world'
 */
export function capitalize(text: string | undefined | null): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convertit un texte en format title case
 * @param text Texte à convertir
 * @returns Texte en title case
 *
 * @example
 * titleCase('hello world'); // 'Hello World'
 */
export function titleCase(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Formate une durée en minutes en format lisible
 * @param minutes Durée en minutes
 * @returns Durée formatée
 *
 * @example
 * formatDuration(90); // '1h 30min'
 * formatDuration(45); // '45min'
 */
export function formatDuration(minutes: number | undefined | null): string {
  if (minutes === undefined || minutes === null) return 'N/A';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  }
  return `${mins}min`;
}

/**
 * Formate un pourcentage
 * @param value Valeur (0-1 ou 0-100)
 * @param decimals Nombre de décimales
 * @param isDecimal Si true, valeur entre 0-1, sinon entre 0-100
 * @returns Pourcentage formaté
 *
 * @example
 * formatPercentage(0.75, 1, true); // '75.0%'
 * formatPercentage(75, 1, false); // '75.0%'
 */
export function formatPercentage(
  value: number | undefined | null,
  decimals = 0,
  isDecimal = true
): string {
  if (value === undefined || value === null) return 'N/A';

  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
}
