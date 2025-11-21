export const apiToken = {
  title: 'API-Token',
  subtitle: 'API-Token und Anfragebegrenzungen verwalten',
  fields: {
    token: 'API-Token',
    currentRequests: 'Aktuelle Anfragen',
    maxRequests: 'Maximale Anfragen',
    expiryDate: 'Ablaufdatum',
    decisionTree: 'Entscheidungsbaum-Konfiguration',
    company: 'Unternehmen'
  },
  actions: {
    regenerate: 'Token neu generieren',
    resetRequests: 'Anfragezähler zurücksetzen',
    extendExpiry: 'Ablaufdatum verlängern'
  },
  messages: {
    regenerateConfirm: 'Sind Sie sicher, dass Sie dieses Token neu generieren möchten? Das alte Token wird sofort ungültig.',
    regenerateSuccess: 'Token erfolgreich neu generiert',
    resetSuccess: 'Anfragezähler erfolgreich zurückgesetzt',
    extendSuccess: 'Ablaufdatum erfolgreich verlängert'
  }
} as const;
