export const sortingRules = {
  title: 'Sorteringsregler',
  subtitle: 'Konfigurer automatiske filtrerings- og oppdateringsregler per selskap',
  create: 'Opprett ny regel',
  edit: 'Rediger sorteringsregel',
  fields: {
    company: 'Selskap',
    type: 'Type',
    fromCollection: 'Kildesamling',
    targetCollection: 'Målsamling',
    referenceKey: 'Referansenøkkel',
    referencePrefix: 'Referanseprefiks',
    filters: 'Filtre (JSON)',
    updates: 'Oppdateringer (JSON)',
    processingPriority: 'Behandlingsprioritet',
    priority: 'Prioritet'
  },
  types: {
    detectionPhase: 'Deteksjonsfase',
    validationPhase: 'Valideringsfase',
    reportGeneration: 'Rapportgenerering'
  },
  priorities: {
    highest: '1 - Høyeste prioritet',
    high: '2 - Høy prioritet',
    medium: '3 - Middels prioritet',
    low: '4 - Lav prioritet',
    lowest: '5 - Laveste prioritet',
    highLevel: 'Høy prioritet (1-2)',
    mediumLevel: 'Middels prioritet (3-4)'
  },
  examples: {
    title: 'Konfigurasjonseksempler',
    filterExamples: 'Filtreksempler:',
    updateExamples: 'Oppdateringseksempler:',
    filtersHelp: 'JSON-objekt som definerer filtreringskriteriene',
    updatesHelp: 'JSON-objekt som definerer oppdateringene som skal brukes'
  },
  messages: {
    createSuccess: 'Sorteringsregel opprettet',
    updateSuccess: 'Sorteringsregel oppdatert',
    deleteSuccess: 'Sorteringsregel slettet',
    invalidJson: 'Ugyldig JSON-format',
    loadingRule: 'Laster sorteringsregel...'
  }
} as const;
