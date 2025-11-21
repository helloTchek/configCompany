export const common = {
  actions: {
    create: 'Erstellen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    back: 'Zurück',
    next: 'Weiter',
    previous: 'Zurück',
    search: 'Suchen',
    filter: 'Filtern',
    export: 'Exportieren',
    import: 'Importieren',
    upload: 'Hochladen',
    download: 'Herunterladen',
    duplicate: 'Duplizieren',
    view: 'Ansehen',
    close: 'Schließen',
    refresh: 'Aktualisieren',
    reset: 'Zurücksetzen',
    clear: 'Leeren',
    apply: 'Anwenden',
    remove: 'Entfernen',
    add: 'Hinzufügen',
    update: 'Aktualisieren',
    submit: 'Absenden',
    login: 'Anmelden',
    logout: 'Abmelden',
    loading: 'Lädt...',
    retry: 'Erneut versuchen',
    select: 'Auswählen',
    clearFilters: 'Alle Filter löschen'
  },
  status: {
    active: 'Aktiv',
    inactive: 'Inaktiv',
    enabled: 'Aktiviert',
    disabled: 'Deaktiviert',
    pending: 'Ausstehend',
    completed: 'Abgeschlossen',
    failed: 'Fehlgeschlagen',
    success: 'Erfolg',
    error: 'Fehler',
    warning: 'Warnung',
    info: 'Info',
    draft: 'Entwurf',
    published: 'Veröffentlicht',
    archived: 'Archiviert'
  },
  validation: {
    required: 'Dieses Feld ist erforderlich',
    email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    minLength: 'Muss mindestens {{min}} Zeichen enthalten',
    maxLength: 'Darf nicht mehr als {{max}} Zeichen enthalten',
    numeric: 'Muss eine Zahl sein',
    positive: 'Muss eine positive Zahl sein',
    url: 'Bitte geben Sie eine gültige URL ein',
    phone: 'Bitte geben Sie eine gültige Telefonnummer ein',
    password: 'Das Passwort muss mindestens 8 Zeichen enthalten, darunter Groß-, Kleinbuchstaben und Zahlen'
  },
  messages: {
    noData: 'Keine Daten verfügbar',
    noResults: 'Keine Ergebnisse gefunden',
    loadingError: 'Fehler beim Laden der Daten',
    saveSuccess: 'Erfolgreich gespeichert',
    saveError: 'Speichern fehlgeschlagen',
    deleteSuccess: 'Erfolgreich gelöscht',
    deleteError: 'Löschen fehlgeschlagen',
    deleteConfirm: 'Sind Sie sicher, dass Sie dieses Element löschen möchten?',
    unsavedChanges: 'Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?',
    sessionExpired: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
    accessDenied: 'Zugriff verweigert. Sie sind nicht berechtigt, diese Seite anzusehen.',
    networkError: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.'
  },
  filters: {
    allTypes: 'Alle Typen',
    allCompanies: 'Alle Unternehmen',
    allPriorities: 'Alle Prioritäten'
  },
  fields: {
    actions: 'Aktionen',
    level: 'Stufe'
  },
  sections: {
    basicInformation: 'Grundlegende Informationen',
    configuration: 'Konfiguration'
  },
  navigation: {
    companies: 'Unternehmen',
    users: 'Benutzer',
    workflows: 'Workflows',
    costs: 'Kostenmatrizen',
    sortingRules: 'Sortierregeln',
    chaseupRules: 'Automatisierte Erinnerungsregeln',
    profile: 'Profil',
    help: 'Hilfe',
    documentation: 'Dokumentation'
  },
  roles: {
    superAdmin: 'Superadmin',
    admin: 'Admin',
    user: 'Benutzer'
  },
  languages: {
    en: 'Englisch',
    fr: 'Französisch',
    de: 'Deutsch',
    it: 'Italienisch',
    es: 'Spanisch',
    nl: 'Niederländisch',
    sv: 'Schwedisch',
    no: 'Norwegisch'
  }
} as const;
