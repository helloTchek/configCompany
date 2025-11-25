export const sortingRules = {
  title: 'Sorteringsregler',
  subtitle: 'Konfigurera automatiska filtrerings- och uppdateringsregler per företag',
  create: 'Skapa Ny Regel',
  edit: 'Redigera Sorteringsregel',
  fields: {
    company: 'Företag',
    type: 'Typ',
    fromCollection: 'Källsamling',
    targetCollection: 'Målsamling',
    referenceKey: 'Referensnyckel',
    referencePrefix: 'Referensprefix',
    filters: 'Filter (JSON)',
    updates: 'Uppdateringar (JSON)',
    processingPriority: 'Bearbetningsprioritet',
    priority: 'Prioritet'
  },
  types: {
    detectionPhase: 'Detektionsfas',
    validationPhase: 'Valideringsfas',
    reportGeneration: 'Rapportgenerering'
  },
  priorities: {
    highest: '1 - Högsta Prioritet',
    high: '2 - Hög Prioritet',
    medium: '3 - Medelprioritet',
    low: '4 - Låg Prioritet',
    lowest: '5 - Lägsta Prioritet',
    highLevel: 'Hög Prioritet (1-2)',
    mediumLevel: 'Medelprioritet (3-4)'
  },
  examples: {
    title: 'Konfigurationsexempel',
    filterExamples: 'Filtrerexempel:',
    updateExamples: 'Uppdateringsexempel:',
    filtersHelp: 'JSON-objekt som definierar filterkriterier',
    updatesHelp: 'JSON-objekt som definierar uppdateringar som ska tillämpas'
  },
  messages: {
    createSuccess: 'Sorteringsregel skapad',
    updateSuccess: 'Sorteringsregel uppdaterad',
    deleteSuccess: 'Sorteringsregel borttagen',
    invalidJson: 'Ogiltigt JSON-format',
    loadingRule: 'Laddar sorteringsregel...'
  }
} as const;
