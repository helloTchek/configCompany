export const costs = {
  title: 'Verwaltung der Reparaturkosten',
  subtitle: 'Verwalten Sie Kostenmatrizen für Fahrzeugreparaturangebote',
  pageTitle: 'Kostenmatrizen',
  pageSubtitle: 'Wählen und verwalten Sie Ihre Reparaturkostenmatrizen',
  create: 'Matrix erstellen',
  createNew: 'Neue Kostenmatrix erstellen',
  createCostMatrix: 'Kostenmatrix erstellen',
  edit: 'Matrix bearbeiten',
  duplicate: 'Matrix duplizieren',
  downloadTemplate: 'Vorlage herunterladen',
  searchPlaceholder: 'Kostenmatrizen suchen...',
  noMatricesFound: 'Keine Kostenmatrizen gefunden',
  tryAdjustSearch: 'Versuchen Sie, Ihre Suche anzupassen',
  createToGetStarted: 'Erstellen Sie eine neue Kostenmatrix, um zu beginnen',
  backToCostMatrices: 'Zurück zu Kostenmatrizen',
  loading: 'Laden...',
  loadingCostMatrix: 'Kostenmatrix wird geladen...',
  error: 'Fehler',
  costMatrixNotFound: 'Kostenmatrix nicht gefunden',
  failedToLoad: 'Fehler beim Laden der Kostenmatrix',

  fields: {
    matrix: 'Matrix',
    matrixName: 'Matrixname',
    company: 'Unternehmen',
    currency: 'Währung',
    currencyAndTax: 'Währung & Steuer',
    tax: 'Steuer',
    taxRate: 'Steuersatz (%)',
    status: 'Status',
    lastUpdated: 'Zuletzt aktualisiert',
    partsCount: 'Anzahl der Teile',
    partType: 'Teiletyp',
    location: 'Ort',
    severity: 'Schweregrad',
    cost: 'Kosten',
    totalEntries: 'Gesamteinträge',
    validated: 'Validiert',
    created: 'Erstellt',
    description: 'Beschreibung',
    vehiclePart: 'FAHRZEUGTEIL',
    severityType: 'SCHWEREGRADTYP',
    code: 'Code: ',
    level: 'Ebene ',
    companyLabel: 'Unternehmen: '
  },

  placeholders: {
    matrixName: 'z.B. PREMIUM_MATRIX',
    description: 'Kurze Beschreibung dieser Kostenmatrix',
    searchCompany: 'Unternehmen suchen...',
    searchVehicleParts: 'Fahrzeugteile suchen...',
    searchLocations: 'Orte suchen...',
    allSeverityTypes: 'Alle Schweregrade...'
  },

  severities: {
    minor: 'Gering',
    light: 'Leicht',
    moderate: 'Mittel',
    major: 'Gravierend',
    severe: 'Schwer'
  },

  locations: {
    front: 'Vorne',
    rear: 'Hinten',
    left: 'Links',
    right: 'Rechts',
    roof: 'Dach',
    interior: 'Innenraum'
  },

  currencies: {
    eur: 'EUR (€)',
    usd: 'USD ($)',
    gbp: 'GBP (£)'
  },

  status: {
    active: 'Aktiv'
  },

  actions: {
    addPart: 'Teil hinzufügen',
    removePart: 'Teil entfernen',
    importCsv: 'CSV importieren',
    exportCsv: 'CSV exportieren',
    bulkEdit: 'Massenbearbeitung',
    view: 'Ansehen',
    edit: 'Bearbeiten',
    duplicate: 'Duplizieren',
    delete: 'Löschen',
    downloadXlsx: 'XLSX herunterladen',
    importFromExcel: 'Aus Excel importieren',
    importInProgress: 'Import läuft... {{progress}}%',
    saveChanges: 'Änderungen speichern',
    createMatrix: 'Matrix erstellen',
    cancel: 'Abbrechen',
    deleteAllParams: 'Alle Kostenparameter löschen',
    deleteAllParamsTitle: 'Alle Kostenparameter löschen'
  },

  sections: {
    matrixSettings: 'Matrixeinstellungen',
    filters: 'Filter',
    costEntries: 'Kostenpunkte',
    filterByVehiclePart: 'Nach Fahrzeugteil filtern',
    filterByLocation: 'Nach Ort filtern',
    filterBySeverityType: 'Nach Schweregradtyp filtern'
  },

  modal: {
    viewTitle: 'Details der Kostenmatrix',
    deleteTitle: 'Löschung bestätigen',
    deleteQuestion: 'Sind Sie sicher, dass Sie diese Matrix löschen möchten?',
    deleteDescription: 'Sie sind dabei, die Kostenmatrix zu löschen',
    forCompany: 'für',
    deleteWarning: 'Diese Aktion ist irreversibel.',
    deleteWarningDetail: 'Alle zugehörigen Kostenparameter werden ebenfalls dauerhaft gelöscht.',
    duplicateTitle: 'Kostenmatrix duplizieren',
    duplicateDescription: 'Eine vollständige Kopie dieser Matrix wird erstellt, einschließlich aller zugehörigen Parameter.',
    newMatrixName: 'Neuer Matrixname',
    duplicateNamePlaceholder: 'Name der duplizierten Matrix',
    cancel: 'Abbrechen',
    confirm: 'Ja, löschen',
    confirmDuplicate: 'Duplizieren',
    deleting: 'Löschen...',
    duplicating: 'Duplizieren...',
    close: 'Schließen',
    editMatrix: 'Matrix bearbeiten',
    costMatrixConfiguration: 'Konfiguration der Kostenmatrix',
    confirmDeleteAll: 'Löschung bestätigen',
    deleteAllQuestion: 'Alle Kostenparameter löschen?',
    deleteAllDescription: 'Sie sind dabei, <strong>{{count}} Kostenparameter</strong> aus der Matrix "{{name}}" zu löschen.',
    deleteAllWarning: '<strong>Diese Aktion ist irreversibel.</strong> Alle Kostenpunkte werden gelöscht, die Matrix selbst bleibt jedoch bestehen. Sie können die Daten später erneut importieren.',
    cancelButton: 'Abbrechen',
    deletingButton: 'Löschen...',
    deleteEntriesButton: 'Kostenpunkte löschen'
  },

  template: {
    needTemplate: 'Benötigen Sie eine Ausgangsvorlage?',
    downloadDescription: 'Laden Sie unsere Standardvorlage herunter, um mit gängigen Fahrzeugteilen und Reparaturkosten zu beginnen.'
  },

  display: {
    showingEntries: 'Anzeige von {{filtered}} von {{total}} Einträgen',
    noCostEntries: 'Keine Kostenpunkte gefunden',
    loadingCompanies: 'Unternehmen werden geladen...',
    taxRateLabel: 'Steuersatz',
    currencyLabel: 'Währung'
  },

  validation: {
    nameRequired: 'Matrixname ist erforderlich',
    companyRequired: 'Unternehmen ist erforderlich',
    currencyRequired: 'Währung ist erforderlich',
    taxRateRange: 'Der Steuersatz muss zwischen 0 und 100 liegen'
  },

  messages: {
    createSuccess: 'Kostenmatrix erfolgreich erstellt',
    updateSuccess: 'Kostenmatrix erfolgreich aktualisiert',
    updateSuccessWithParams: 'Kostenmatrix erfolgreich aktualisiert!\n\n{{count}} Kostenparameter aktualisiert.',
    deleteSuccess: 'Kostenmatrix erfolgreich gelöscht',
    deleteParamsSuccess: '{{count}} Kostenparameter erfolgreich gelöscht',
    duplicateSuccess: 'Kostenmatrix "{{name}}" erfolgreich dupliziert',
    deleteFailed: 'Löschen fehlgeschlagen: {{error}}',
    deleteParamsFailed: 'Löschen fehlgeschlagen: {{error}}',
    duplicateFailed: 'Duplizieren fehlgeschlagen: {{error}}',
    importSuccess: 'Import erfolgreich: {{count}} Kostenparameter importiert!',
    importSuccessWithErrors: 'Import erfolgreich: {{count}} Kostenparameter importiert!\n\nWarnung: {{errors}} Zeilen enthielten Fehler.',
    importFailed: 'Import fehlgeschlagen: {{error}}',
    exportSuccess: 'CSV erfolgreich exportiert',
    invalidCsv: 'Ungültiges CSV-Format',
    saveFailed: 'Speichern der Kostenmatrix fehlgeschlagen: {{error}}'
  }
} as const;
