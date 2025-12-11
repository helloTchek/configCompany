export const chaseupRules = {
  title: 'Automatiserade Påminnelseregler',
  subtitle: 'Konfigurera automatiserade påminnelsemeddelanden för företag',
  create: 'Skapa Ny Regel',
  edit: 'Redigera Påminnelseregel',
  createTitle: 'Skapa Påminnelseregel',
  editTitle: 'Redigera Påminnelseregel',
  backToList: 'Tillbaka till Påminnelseregler',

  fields: {
    company: 'Företag',
    type: 'Typ',
    activationDate: 'Aktiveringsdatum',
    utcTime: 'UTC-tid',
    maxSendings: 'Max. Sändningar',
    firstDelay: 'Första Fördröjning',
    secondDelay: 'Andra Fördröjning',
    thirdDelay: 'Tredje Fördröjning',
    actions: 'Åtgärder'
  },

  types: {
    event: 'Händelse',
    anonymization: 'Anonymisering'
  },

  tooltips: {
    edit: 'Redigera',
    duplicate: 'Duplicera',
    delete: 'Ta bort'
  },

  labels: {
    filters: 'Filter',
    days: '{{count}} dagar',
    minutes: '{{count}} min',
    none: 'Ingen',
    targetCompany: 'Målföretag',
    note: 'Notering',
    showingRules: 'Visar {{shown}} av {{total}} regler'
  },

  placeholders: {
    search: 'Sök påminnelseregler...',
    searchCompany: 'Sök och välj ett företag...'
  },

  actions: {
    cancel: 'Avbryt',
    save: 'Spara',
    create: 'Skapa Regel',
    update: 'Uppdatera Regel',
    delete: 'Ta bort Regel',
    deleteRule: 'Ta bort Regel',
    duplicate: 'Duplicera Regel',
    duplicateRule: 'Duplicera Regel',
    clearFilters: 'Rensa Alla Filter',
    creating: 'Skapar...',
    updating: 'Uppdaterar...'
  },

  sections: {
    basicConfiguration: 'Grundläggande Konfiguration',
    affectedStatuses: 'Berörda Inspektionsstatus',
    delayConfiguration: 'Fördröjningskonfiguration',
    firstReminder: 'Första Påminnelsen',
    secondReminder: 'Andra Påminnelsen',
    availableVariables: 'Tillgängliga Variabler'
  },

  form: {
    company: 'Företag',
    companyRequired: 'Företag krävs',
    type: 'Typ',
    activationDate: 'Aktiveringsdatum',
    activationDateRequired: 'Aktiveringsdatum krävs',
    utcSendingTime: 'UTC-sändningstid',
    maxSendings: 'Max. Sändningar',
    firstDelayDays: 'Första Fördröjning (Dagar)',
    firstDelayMinutes: 'Första Fördröjning (Minuter)',
    secondDelayDays: 'Andra Fördröjning (Dagar)',
    secondDelayMinutes: 'Andra Fördröjning (Minuter)',
    loadingCompanies: 'Laddar företag...',
    searchCompany: 'Sök och välj ett företag...',
    clickToInsert: 'Klicka för att infoga',
    statusesHelp: 'Regler gäller endast för inspektioner i de valda statusarna'
  },

  statuses: {
    inspectionCreated: 'Inspektion Skapad',
    inspectionInProgress: 'Inspektion Pågår',
    detectionFinished: 'Detektion Klar',
    damageReviewOngoing: 'Skadegranskning Pågår',
    completed: 'Slutförd',
    chasedUpManually: 'Påmind Manuellt'
  },

  reminder: {
    webhook: 'Aktivera Webhook',
    enabled: 'Aktiverad',
    user: 'Användare',
    customer: 'Kund',
    emailAddress: 'E-postadress',
    userEmailAddress: 'Användare E-postadress',
    smsNumber: 'SMS-nummer',
    userSmsNumber: 'Användare SMS-nummer',
    sms: 'SMS',
    email: 'E-post',
    language: 'Språk',
    emailSubject: 'E-postämne',
    emailContent: 'E-postinnehåll',
    smsContent: 'SMS-innehåll',
    smsMaxLength: 'SMS-innehåll (max 160 tecken)...',
    characterCount: 'Antal tecken: {{count}}/160'
  },

  variables: {
    customerName: 'Kundnamn',
    customerEmail: 'Kund E-post',
    customerPhone: 'Kundtelefon',
    inspectionId: 'Inspektions-ID',
    inspectionLink: 'Inspektionslänk',
    vehicleMake: 'Fordonsmärke',
    vehicleModel: 'Fordonsmodell',
    licensePlate: 'Registreringsnummer',
    companyName: 'Företagsnamn',
    agentName: 'Agentnamn',
    inspectionDate: 'Inspektionsdatum',
    trackingUrl: 'Spårnings-URL'
  },

  modals: {
    duplicateTitle: 'Duplicera Påminnelseregel',
    duplicateMessage: 'Duplicera påminnelseregeln från {{company}} till ett företag',
    duplicateNote: 'Påminnelseregeln kommer att dupliceras till det valda företaget med alla inställningar, fördröjningar och meddelandemallar. Du kan välja samma företag för att skapa en kopia.',
    deleteTitle: 'Ta bort Påminnelseregel',
    deleteMessage: 'Är du säker på att du vill ta bort påminnelseregeln för {{company}}? Denna åtgärd kan inte ångras.'
  },

  messages: {
    loading: 'Laddar...',
    loadError: 'Fel vid laddning av påminnelseregler',
    createSuccess: 'Påminnelseregel skapad',
    updateSuccess: 'Påminnelseregel uppdaterad',
    deleteSuccess: 'Påminnelseregel borttagen',
    deleteError: 'Misslyckades att ta bort påminnelseregel',
    duplicateSuccess: 'Påminnelseregel duplicerad',
    duplicateError: 'Misslyckades att duplicera påminnelseregel',
    noRulesFound: 'Inga påminnelseregler hittades som matchar dina kriterier.',
    ruleNotFound: 'Regel inte Hittad',
    ruleNotFoundMessage: 'Påminnelseregeln du letar efter finns inte.'
  },

  filters: {
    allTypes: 'Alla Typer',
    allCompanies: 'Alla Företag',
    all: 'Alla'
  }
} as const;
