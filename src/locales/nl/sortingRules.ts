export const sortingRules = {
  title: 'Sorteringsregels',
  subtitle: 'Configureer geautomatiseerde filter- en update regels per bedrijf',
  create: 'Nieuwe regel aanmaken',
  edit: 'Sorteringsregel bewerken',
  fields: {
    company: 'Bedrijf',
    type: 'Type',
    fromCollection: 'Broncollectie',
    targetCollection: 'Doelcollectie',
    referenceKey: 'Referentiesleutel',
    referencePrefix: 'Referentieprefix',
    filters: 'Filters (JSON)',
    updates: 'Updates (JSON)',
    processingPriority: 'Verwerkingsprioriteit',
    priority: 'Prioriteit'
  },
  types: {
    detectionPhase: 'Detectiefase',
    validationPhase: 'Validatiefase',
    reportGeneration: 'Rapportgeneratie'
  },
  priorities: {
    highest: '1 - Hoogste prioriteit',
    high: '2 - Hoge prioriteit',
    medium: '3 - Middelmatige prioriteit',
    low: '4 - Lage prioriteit',
    lowest: '5 - Laagste prioriteit',
    highLevel: 'Hoge prioriteit (1-2)',
    mediumLevel: 'Middelmatige prioriteit (3-4)'
  },
  examples: {
    title: 'Configuratievoorbeelden',
    filterExamples: 'Filtervoorbeelden:',
    updateExamples: 'Updatevoorbeelden:',
    filtersHelp: 'JSON-object dat de filtercriteria definieert',
    updatesHelp: 'JSON-object dat de toe te passen updates definieert'
  },
  messages: {
    createSuccess: 'Sorteringsregel succesvol aangemaakt',
    updateSuccess: 'Sorteringsregel succesvol bijgewerkt',
    deleteSuccess: 'Sorteringsregel succesvol verwijderd',
    invalidJson: 'Ongeldig JSON-formaat',
    loadingRule: 'Sorteringsregel laden...'
  }
} as const;
