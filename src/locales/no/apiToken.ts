export const apiToken = {
  title: 'API-tokens',
  subtitle: 'Administrer API-tokens og forespørselsgrenser',
  fields: {
    token: 'API-token',
    currentRequests: 'Gjeldende forespørsler',
    maxRequests: 'Maks forespørsler',
    expiryDate: 'Utløpsdato',
    decisionTree: 'Konfigurasjon av beslutningstre',
    company: 'Firma'
  },
  actions: {
    regenerate: 'Generer token på nytt',
    resetRequests: 'Tilbakestill antall forespørsler',
    extendExpiry: 'Forleng utløpsdato'
  },
  messages: {
    regenerateConfirm: 'Er du sikker på at du vil generere dette token på nytt? Det gamle tokenet vil slutte å fungere umiddelbart.',
    regenerateSuccess: 'Token generert på nytt',
    resetSuccess: 'Forespørselsantall tilbakestilt',
    extendSuccess: 'Utløpsdato forlenget'
  }
} as const;
