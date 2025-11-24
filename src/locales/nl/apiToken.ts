export const apiToken = {
  title: 'API-tokens',
  subtitle: 'Beheer API-tokens en verzoeklimieten',
  fields: {
    token: 'API-token',
    currentRequests: 'Huidige verzoeken',
    maxRequests: 'Maximale verzoeken',
    expiryDate: 'Vervaldatum',
    decisionTree: 'Configuratie van beslissingsboom',
    company: 'Bedrijf'
  },
  actions: {
    regenerate: 'Token opnieuw genereren',
    resetRequests: 'Aantal verzoeken opnieuw instellen',
    extendExpiry: 'Vervaldatum verlengen'
  },
  messages: {
    regenerateConfirm: 'Weet u zeker dat u dit token opnieuw wilt genereren? Het oude token werkt onmiddellijk niet meer.',
    regenerateSuccess: 'Token succesvol opnieuw gegenereerd',
    resetSuccess: 'Aantal verzoeken succesvol opnieuw ingesteld',
    extendSuccess: 'Vervaldatum succesvol verlengd'
  }
} as const;
