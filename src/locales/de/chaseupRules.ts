export const chaseupRules = {
  title: 'Automatische Nachfassregeln',
  subtitle: 'Konfigurieren Sie automatische Nachfass-Nachrichtenregeln für Unternehmen',
  create: 'Neue Regel erstellen',
  edit: 'Nachfassregel bearbeiten',
  createTitle: 'Nachfassregel erstellen',
  editTitle: 'Nachfassregel bearbeiten',
  backToList: 'Zurück zu Nachfassregeln',

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
    showingRules: '{{shown}} von {{total}} Regeln angezeigt'
  },

  placeholders: {
    search: 'Nachfassregeln suchen...',
    searchCompany: 'Unternehmen suchen und auswählen...'
  },

  actions: {
    cancel: 'Abbrechen',
    save: 'Speichern',
    create: 'Regel erstellen',
    update: 'Regel aktualisieren',
    delete: 'Regel löschen',
    deleteRule: 'Regel löschen',
    duplicate: 'Regel duplizieren',
    duplicateRule: 'Regel duplizieren',
    clearFilters: 'Alle Filter löschen',
    creating: 'Wird erstellt...',
    updating: 'Wird aktualisiert...'
  },

  sections: {
    basicConfiguration: 'Basiskonfiguration',
    affectedStatuses: 'Betroffene Inspektionsstatus',
    delayConfiguration: 'Verzögerungskonfiguration',
    firstReminder: 'Erste Erinnerung',
    secondReminder: 'Zweite Erinnerung',
    availableVariables: 'Verfügbare Variablen'
  },

  form: {
    company: 'Unternehmen',
    companyRequired: 'Unternehmen ist erforderlich',
    type: 'Typ',
    activationDate: 'Aktivierungsdatum',
    activationDateRequired: 'Aktivierungsdatum ist erforderlich',
    utcSendingTime: 'UTC-Sendezeit',
    maxSendings: 'Max. Sendungen',
    firstDelayDays: 'Erste Verzögerung (Tage)',
    firstDelayMinutes: 'Erste Verzögerung (Minuten)',
    secondDelayDays: 'Zweite Verzögerung (Tage)',
    secondDelayMinutes: 'Zweite Verzögerung (Minuten)',
    loadingCompanies: 'Lade Unternehmen...',
    searchCompany: 'Unternehmen suchen und auswählen...',
    clickToInsert: 'Zum Einfügen klicken',
    statusesHelp: 'Regeln gelten nur für Inspektionen in den ausgewählten Status'
  },

  statuses: {
    inspectionCreated: 'Inspektion erstellt',
    inspectionInProgress: 'Inspektion läuft',
    detectionFinished: 'Erkennung abgeschlossen',
    damageReviewOngoing: 'Schadensprüfung läuft',
    completed: 'Abgeschlossen',
    chasedUpManually: 'Manuell nachgefasst'
  },

  reminder: {
    webhook: 'Webhook aktivieren',
    enabled: 'Aktiviert',
    user: 'Benutzer',
    customer: 'Kunde',
    emailAddress: 'E-Mail-Adresse',
    userEmailAddress: 'Benutzer-E-Mail-Adresse',
    smsNumber: 'SMS-Nummer',
    userSmsNumber: 'Benutzer-SMS-Nummer',
    sms: 'SMS',
    email: 'E-Mail',
    language: 'Sprache',
    emailSubject: 'E-Mail-Betreff',
    emailContent: 'E-Mail-Inhalt',
    smsContent: 'SMS-Inhalt',
    smsMaxLength: 'SMS-Inhalt (max. 160 Zeichen)...',
    characterCount: 'Zeichenanzahl: {{count}}/160'
  },

  variables: {
    customerName: 'Kundenname',
    customerEmail: 'Kunden-E-Mail',
    customerPhone: 'Kundentelefon',
    inspectionId: 'Inspektions-ID',
    inspectionLink: 'Inspektionslink',
    vehicleMake: 'Fahrzeugmarke',
    vehicleModel: 'Fahrzeugmodell',
    licensePlate: 'Kennzeichen',
    companyName: 'Firmenname',
    agentName: 'Agentenname',
    inspectionDate: 'Inspektionsdatum',
    trackingUrl: 'Tracking-URL'
  },

  modals: {
    duplicateTitle: 'Nachfassregel duplizieren',
    duplicateMessage: 'Die Nachfassregel von {{company}} zu einem Unternehmen duplizieren',
    duplicateNote: 'Die Nachfassregel wird mit allen Einstellungen, Verzögerungen und Nachrichtenvorlagen zum ausgewählten Unternehmen dupliziert. Sie können dasselbe Unternehmen auswählen, um eine Kopie zu erstellen.',
    deleteTitle: 'Nachfassregel löschen',
    deleteMessage: 'Möchten Sie die Nachfassregel für {{company}} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
  },

  messages: {
    loading: 'Wird geladen...',
    loadError: 'Fehler beim Laden der Nachfassregeln',
    createSuccess: 'Nachfassregel erfolgreich erstellt',
    updateSuccess: 'Nachfassregel erfolgreich aktualisiert',
    deleteSuccess: 'Nachfassregel erfolgreich gelöscht',
    deleteError: 'Fehler beim Löschen der Nachfassregel',
    duplicateSuccess: 'Nachfassregel erfolgreich dupliziert',
    duplicateError: 'Fehler beim Duplizieren der Nachfassregel',
    noRulesFound: 'Keine Nachfassregeln gefunden, die Ihren Kriterien entsprechen.',
    ruleNotFound: 'Regel nicht gefunden',
    ruleNotFoundMessage: 'Die gesuchte Nachfassregel existiert nicht.'
  },

  filters: {
    allTypes: 'Alle Typen',
    allCompanies: 'Alle Unternehmen',
    all: 'Alle'
  }
} as const;
