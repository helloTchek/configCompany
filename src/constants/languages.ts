/**
 * Langues supportées dans l'application
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export type Language = typeof SUPPORTED_LANGUAGES[number];

/**
 * Trouve une langue par son code
 */
export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}

/**
 * Vérifie si un code de langue est supporté
 */
export function isValidLanguageCode(code: string): code is LanguageCode {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
}

/**
 * Récupère le nom d'une langue par son code
 */
export function getLanguageName(code: string): string {
  const language = getLanguageByCode(code);
  return language?.name || code;
}

/**
 * Récupère le drapeau d'une langue par son code
 */
export function getLanguageFlag(code: string): string {
  const language = getLanguageByCode(code);
  return language?.flag || '🏳️';
}

/**
 * Codes de langue sous forme de tableau simple
 */
export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((lang) => lang.code);

/**
 * Noms de langue sous forme de tableau simple
 */
export const LANGUAGE_NAMES = SUPPORTED_LANGUAGES.map((lang) => lang.name);
