export const sortingRules = {
  title: 'Regole di Ordinamento',
  subtitle: 'Configura regole di filtraggio e aggiornamento automatico per azienda',
  create: 'Crea Nuova Regola',
  edit: 'Modifica Regola di Ordinamento',
  fields: {
    company: 'Azienda',
    type: 'Tipo',
    fromCollection: 'Collezione di Origine',
    targetCollection: 'Collezione Destinazione',
    referenceKey: 'Chiave di Riferimento',
    referencePrefix: 'Prefisso di Riferimento',
    filters: 'Filtri (JSON)',
    updates: 'Aggiornamenti (JSON)',
    processingPriority: 'Priorità di Elaborazione',
    priority: 'Priorità'
  },
  types: {
    detectionPhase: 'Fase di Rilevamento',
    validationPhase: 'Fase di Validazione',
    reportGeneration: 'Generazione Report'
  },
  priorities: {
    highest: '1 - Massima Priorità',
    high: '2 - Priorità Alta',
    medium: '3 - Priorità Media',
    low: '4 - Priorità Bassa',
    lowest: '5 - Priorità Minima',
    highLevel: 'Priorità Alta (1-2)',
    mediumLevel: 'Priorità Media (3-4)'
  },
  examples: {
    title: 'Esempi di Configurazione',
    filterExamples: 'Esempi di Filtri:',
    updateExamples: 'Esempi di Aggiornamenti:',
    filtersHelp: 'Oggetto JSON che definisce i criteri di filtraggio',
    updatesHelp: 'Oggetto JSON che definisce gli aggiornamenti da applicare'
  },
  messages: {
    createSuccess: 'Regola di ordinamento creata con successo',
    updateSuccess: 'Regola di ordinamento aggiornata con successo',
    deleteSuccess: 'Regola di ordinamento eliminata con successo',
    invalidJson: 'Formato JSON non valido',
    loadingRule: 'Caricamento della regola di ordinamento...'
  }
} as const;
