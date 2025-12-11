export const chaseupRules = {
  title: 'Geautomatiseerde Herinneringsregels',
  subtitle: 'Configureer geautomatiseerde herinneringsberichten voor bedrijven',
  create: 'Nieuwe Regel Aanmaken',
  edit: 'Herinneringsregel Bewerken',
  createTitle: 'Herinneringsregel Aanmaken',
  editTitle: 'Herinneringsregel Bewerken',
  backToList: 'Terug naar Herinneringsregels',

  fields: {
    company: 'Bedrijf',
    type: 'Type',
    activationDate: 'Activeringsdatum',
    utcTime: 'UTC-tijd',
    maxSendings: 'Max. Verzendingen',
    firstDelay: 'Eerste Vertraging',
    secondDelay: 'Tweede Vertraging',
    thirdDelay: 'Derde Vertraging',
    actions: 'Acties'
  },

  types: {
    event: 'Gebeurtenis',
    anonymization: 'Anonimisering'
  },

  tooltips: {
    edit: 'Bewerken',
    duplicate: 'Dupliceren',
    delete: 'Verwijderen'
  },

  labels: {
    filters: 'Filters',
    days: '{{count}} dagen',
    minutes: '{{count}} min',
    none: 'Geen',
    targetCompany: 'Doelbedrijf',
    note: 'Opmerking',
    showingRules: 'Weergave van {{shown}} van {{total}} regels'
  },

  placeholders: {
    search: 'Zoek herinneringsregels...',
    searchCompany: 'Zoek en selecteer een bedrijf...'
  },

  actions: {
    cancel: 'Annuleren',
    save: 'Opslaan',
    create: 'Regel Aanmaken',
    update: 'Regel Bijwerken',
    delete: 'Regel Verwijderen',
    deleteRule: 'Regel Verwijderen',
    duplicate: 'Regel Dupliceren',
    duplicateRule: 'Regel Dupliceren',
    clearFilters: 'Alle Filters Wissen',
    creating: 'Aanmaken...',
    updating: 'Bijwerken...'
  },

  sections: {
    basicConfiguration: 'Basisconfiguratie',
    affectedStatuses: 'Betrokken Inspectiestatussen',
    delayConfiguration: 'Vertragingsconfiguratie',
    firstReminder: 'Eerste Herinnering',
    secondReminder: 'Tweede Herinnering',
    availableVariables: 'Beschikbare Variabelen'
  },

  form: {
    company: 'Bedrijf',
    companyRequired: 'Bedrijf is verplicht',
    type: 'Type',
    activationDate: 'Activeringsdatum',
    activationDateRequired: 'Activeringsdatum is verplicht',
    utcSendingTime: 'UTC-verzendtijd',
    maxSendings: 'Max. Verzendingen',
    firstDelayDays: 'Eerste Vertraging (Dagen)',
    firstDelayMinutes: 'Eerste Vertraging (Minuten)',
    secondDelayDays: 'Tweede Vertraging (Dagen)',
    secondDelayMinutes: 'Tweede Vertraging (Minuten)',
    loadingCompanies: 'Bedrijven laden...',
    searchCompany: 'Zoek en selecteer een bedrijf...',
    clickToInsert: 'Klik om in te voegen',
    statusesHelp: 'Regels zijn alleen van toepassing op inspecties in de geselecteerde statussen'
  },

  statuses: {
    inspectionCreated: 'Inspectie Aangemaakt',
    inspectionInProgress: 'Inspectie Bezig',
    detectionFinished: 'Detectie Voltooid',
    damageReviewOngoing: 'Schadebeoordeling Bezig',
    completed: 'Voltooid',
    chasedUpManually: 'Handmatig Herinnerd'
  },

  reminder: {
    webhook: 'Webhook Inschakelen',
    enabled: 'Ingeschakeld',
    user: 'Gebruiker',
    customer: 'Klant',
    emailAddress: 'E-mailadres',
    userEmailAddress: 'E-mailadres Gebruiker',
    smsNumber: 'SMS-nummer',
    userSmsNumber: 'SMS-nummer Gebruiker',
    sms: 'SMS',
    email: 'E-mail',
    language: 'Taal',
    emailSubject: 'E-mailonderwerp',
    emailContent: 'E-mailinhoud',
    smsContent: 'SMS-inhoud',
    smsMaxLength: 'SMS-inhoud (max. 160 tekens)...',
    characterCount: 'Aantal tekens: {{count}}/160'
  },

  variables: {
    customerName: 'Klantnaam',
    customerEmail: 'Klant E-mail',
    customerPhone: 'Klanttelefoon',
    inspectionId: 'Inspectie-ID',
    inspectionLink: 'Inspectielink',
    vehicleMake: 'Voertuigmerk',
    vehicleModel: 'Voertuigmodel',
    licensePlate: 'Kenteken',
    companyName: 'Bedrijfsnaam',
    agentName: 'Agentnaam',
    inspectionDate: 'Inspectiedatum',
    trackingUrl: 'Tracking-URL'
  },

  modals: {
    duplicateTitle: 'Herinneringsregel Dupliceren',
    duplicateMessage: 'Dupliceer de herinneringsregel van {{company}} naar een bedrijf',
    duplicateNote: 'De herinneringsregel wordt gedupliceerd naar het geselecteerde bedrijf met alle instellingen, vertragingen en berichtsjablonen. U kunt hetzelfde bedrijf selecteren om een kopie te maken.',
    deleteTitle: 'Herinneringsregel Verwijderen',
    deleteMessage: 'Weet u zeker dat u de herinneringsregel voor {{company}} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'
  },

  messages: {
    loading: 'Laden...',
    loadError: 'Fout bij het laden van herinneringsregels',
    createSuccess: 'Herinneringsregel succesvol aangemaakt',
    updateSuccess: 'Herinneringsregel succesvol bijgewerkt',
    deleteSuccess: 'Herinneringsregel succesvol verwijderd',
    deleteError: 'Fout bij het verwijderen van de herinneringsregel',
    duplicateSuccess: 'Herinneringsregel succesvol gedupliceerd',
    duplicateError: 'Fout bij het dupliceren van de herinneringsregel',
    noRulesFound: 'Geen herinneringsregels gevonden die voldoen aan uw criteria.',
    ruleNotFound: 'Regel niet Gevonden',
    ruleNotFoundMessage: 'De herinneringsregel die u zoekt bestaat niet.'
  },

  filters: {
    allTypes: 'Alle Types',
    allCompanies: 'Alle Bedrijven',
    all: 'Alles'
  }
} as const;
