export const chaseupRules = {
  title: 'Automatisierte Erinnerungsregeln',
  subtitle: 'Konfigurieren Sie automatisierte Erinnerungsnachrichten für Unternehmen',
  create: 'Neue Regel erstellen',
  edit: 'Erinnerungsregel bearbeiten',
  fields: {
    company: 'Unternehmen',
    type: 'Typ',
    activationDate: 'Aktivierungsdatum',
    utcTime: 'UTC-Zeit',
    maxSendings: 'Max. Sendungen',
    firstDelay: 'Erste Verzögerung',
    secondDelay: 'Zweite Verzögerung',
    thirdDelay: 'Dritte Verzögerung',
    actions: 'Aktionen'
  },
  types: {
    event: 'Ereignis',
    anonymization: 'Anonymisierung'
  },
  tooltips: {
    edit: 'Bearbeiten',
    duplicate: 'Duplizieren',
    delete: 'Löschen'
  },
  labels: {
    filters: 'Filter',
    days: '{{count}} Tage',
    minutes: '{{count}} Min',
    none: 'Keine',
    targetCompany: 'Zielunternehmen',
    note: 'Hinweis',
    showingRules: 'Anzeige von {{shown}} von {{total}} Regeln'
  },
  placeholders: {
    search: 'Erinnerungsregeln suchen...',
    searchCompany: 'Unternehmen suchen und auswählen...'
  },
  actions: {
    cancel: 'Abbrechen',
    delete: 'Regel löschen',
    deleteRule: 'Regel löschen',
    duplicate: 'Regel duplizieren',
    duplicateRule: 'Regel duplizieren',
    clearFilters: 'Alle Filter löschen'
  },
  modals: {
    duplicateTitle: 'Erinnerungsregel duplizieren',
    duplicateMessage: 'Erinnerungsregel von {{company}} zu einem Unternehmen duplizieren',
    duplicateNote: 'Die Erinnerungsregel wird mit allen Einstellungen, Verzögerungen und Nachrichtenvorlagen zum ausgewählten Unternehmen dupliziert. Sie können dasselbe Unternehmen auswählen, um eine Kopie zu erstellen.',
    deleteTitle: 'Erinnerungsregel löschen',
    deleteMessage: 'Sind Sie sicher, dass Sie die Erinnerungsregel für {{company}} löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
  },
  messages: {
    loading: 'Laden...',
    loadError: 'Fehler beim Laden der Erinnerungsregeln',
    createSuccess: 'Erinnerungsregel erfolgreich erstellt',
    updateSuccess: 'Erinnerungsregel erfolgreich aktualisiert',
    deleteSuccess: 'Erinnerungsregel erfolgreich gelöscht',
    deleteError: 'Fehler beim Löschen der Erinnerungsregel',
    duplicateSuccess: 'Erinnerungsregel erfolgreich dupliziert',
    duplicateError: 'Fehler beim Duplizieren der Erinnerungsregel',
    noRulesFound: 'Keine Erinnerungsregeln gefunden, die Ihren Kriterien entsprechen.'
  },
  filters: {
    allTypes: 'Alle Typen',
    allCompanies: 'Alle Unternehmen',
    all: 'Alle'
  }
} as const;
