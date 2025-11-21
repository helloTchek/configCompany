export const sortingRules = {
  title: 'Sortierregeln',
  subtitle: 'Filter- und Aktualisierungsregeln pro Unternehmen konfigurieren',
  create: 'Neue Regel erstellen',
  edit: 'Sortierregel bearbeiten',
  fields: {
    company: 'Unternehmen',
    type: 'Typ',
    fromCollection: 'Quellsammlung',
    targetCollection: 'Zielsammlung',
    referenceKey: 'Referenzschlüssel',
    referencePrefix: 'Referenzpräfix',
    filters: 'Filter (JSON)',
    updates: 'Aktualisierungen (JSON)',
    processingPriority: 'Verarbeitungspriorität',
    priority: 'Priorität'
  },
  types: {
    detectionPhase: 'Erkennungsphase',
    validationPhase: 'Validierungsphase',
    reportGeneration: 'Berichterstellung'
  },
  priorities: {
    highest: '1 - Höchste Priorität',
    high: '2 - Hohe Priorität',
    medium: '3 - Mittlere Priorität',
    low: '4 - Niedrige Priorität',
    lowest: '5 - Niedrigste Priorität',
    highLevel: 'Hohe Priorität (1–2)',
    mediumLevel: 'Mittlere Priorität (3–4)'
  },
  examples: {
    title: 'Konfigurationsbeispiele',
    filterExamples: 'Filterbeispiele:',
    updateExamples: 'Aktualisierungsbeispiele:',
    filtersHelp: 'JSON-Objekt, das die Filterkriterien definiert',
    updatesHelp: 'JSON-Objekt, das die anzuwendenden Aktualisierungen definiert'
  },
  messages: {
    createSuccess: 'Sortierregel erfolgreich erstellt',
    updateSuccess: 'Sortierregel erfolgreich aktualisiert',
    deleteSuccess: 'Sortierregel erfolgreich gelöscht',
    invalidJson: 'Ungültiges JSON-Format',
    loadingRule: 'Sortierregel wird geladen...'
  }
} as const;
