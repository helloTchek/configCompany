export const shootInspect = {
  title: 'Configurazione Ispezione Fotografica',
  subtitle: 'Configura il flusso di lavoro e le impostazioni per la cattura delle foto',
  fields: {
    name: 'Nome configurazione',
    description: 'Descrizione',
    maxRetries: 'Numero massimo tentativi',
    qualityCheckEnabled: 'Controllo qualità abilitato',
    photoAngles: 'Angoli delle foto',
    allowedDamageTypes: 'Tipi di danno consentiti'
  },
  angles: {
    front: 'Anteriore',
    back: 'Posteriore',
    leftSide: 'Lato sinistro',
    rightSide: 'Lato destro',
    interior: 'Interno',
    dashboard: 'Cruscotto'
  },
  damageTypes: {
    carBody: 'Carrozzeria',
    interior: 'Interno',
    glazings: 'Vetri',
    dashboard: 'Cruscotto',
    declaration: 'Dichiarazione',
    documents: 'Documenti'
  },
  steps: {
    title: 'Passaggi Ispezione',
    addStep: 'Aggiungi passaggio',
    editStep: 'Modifica passaggio',
    removeStep: 'Rimuovi passaggio',
    stepOrder: 'Passaggio {{order}}',
    stepTitle: 'Titolo passaggio',
    stepDescription: 'Descrizione passaggio',
    isOptional: 'Passaggio opzionale',
    showHelp: 'Mostra aiuto',
    runDetection: 'Esegui rilevamento',
    thumbnailUrl: 'URL miniatura',
    overlayUrl: 'URL sovrapposizione'
  },
  messages: {
    createSuccess: 'Configurazione ispezione fotografica creata con successo',
    updateSuccess: 'Configurazione ispezione fotografica aggiornata con successo',
    deleteSuccess: 'Configurazione ispezione fotografica eliminata con successo',
    stepAdded: 'Passaggio aggiunto con successo',
    stepRemoved: 'Passaggio rimosso con successo',
    invalidConfiguration: 'Formato configurazione non valido'
  }
} as const;
