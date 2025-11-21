export const apiToken = {
  title: 'Token API',
  subtitle: 'Gestisci i token API e i limiti di richieste',
  fields: {
    token: 'Token API',
    currentRequests: 'Richieste correnti',
    maxRequests: 'Richieste massime',
    expiryDate: 'Data di scadenza',
    decisionTree: 'Configurazione dell\'albero decisionale',
    company: 'Azienda'
  },
  actions: {
    regenerate: 'Rigenera token',
    resetRequests: 'Reimposta conteggio richieste',
    extendExpiry: 'Estendi data di scadenza'
  },
  messages: {
    regenerateConfirm: 'Sei sicuro di voler rigenerare questo token? Il token precedente smetterà di funzionare immediatamente.',
    regenerateSuccess: 'Token rigenerato con successo',
    resetSuccess: 'Conteggio delle richieste reimpostato con successo',
    extendSuccess: 'Data di scadenza estesa con successo'
  }
} as const;
