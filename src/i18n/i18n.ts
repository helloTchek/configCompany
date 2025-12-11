import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const supportedLanguages = ['en', 'fr', 'de', 'it', 'es', 'nl', 'sv', 'no'] as const;
const namespaces = ['common', 'company', 'apiToken', 'users', 'settings', 'events', 'costs', 'workflows', 'shootInspect', 'chaseupRules', 'sortingRules'] as const;

// Lazy loading function for translations
const loadTranslation = async (language: string, namespace: string) => {
  try {
    const translation = await import(`@/locales/${language}/${namespace}.ts`);
    return translation[namespace];
  } catch (error) {
    console.warn(`Failed to load translation for ${language}/${namespace}, falling back to English`);
    if (language !== 'en') {
      const fallback = await import(`@/locales/en/${namespace}.ts`);
      return fallback[namespace];
    }
    throw error;
  }
};

// Initialize i18next with lazy loading
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: [...supportedLanguages],
    defaultNS: 'common',
    ns: [...namespaces],
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },

    // Lazy loading configuration
    backend: {
      loadPath: (lng: string[], ns: string[]) => {
        // This won't be used directly, but we need it for the interface
        return '';
      },
    },
  });

// Custom resource loading
const loadResources = async (language: string, namespace: string) => {
  if (!i18n.hasResourceBundle(language, namespace)) {
    const resource = await loadTranslation(language, namespace);
    i18n.addResourceBundle(language, namespace, resource, true, true);
  }
};

// Load initial resources
const initializeResources = async () => {
  const currentLanguage = i18n.language || 'en';
  
  // Load all namespaces for the current language
  await Promise.all(
    namespaces.map(namespace => loadResources(currentLanguage, namespace))
  );
};

// Initialize resources
initializeResources();

// Listen for language changes and load resources
i18n.on('languageChanged', async (lng) => {
  await Promise.all(
    namespaces.map(namespace => loadResources(lng, namespace))
  );
});

export { loadResources };
export default i18n;