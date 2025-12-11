export const chaseupRules = {
  title: 'Automatiserte Påminnelsesregler',
  subtitle: 'Konfigurer automatiserte påminnelsesmeldinger for selskaper',
  create: 'Opprett Ny Regel',
  edit: 'Rediger Påminnelsesregel',
  createTitle: 'Opprett Påminnelsesregel',
  editTitle: 'Rediger Påminnelsesregel',
  backToList: 'Tilbake til Påminnelsesregler',

  fields: {
    company: 'Selskap',
    type: 'Type',
    activationDate: 'Aktiveringsdato',
    utcTime: 'UTC-tid',
    maxSendings: 'Maks. Sendinger',
    firstDelay: 'Første Forsinkelse',
    secondDelay: 'Andre Forsinkelse',
    thirdDelay: 'Tredje Forsinkelse',
    actions: 'Handlinger'
  },

  types: {
    event: 'Hendelse',
    anonymization: 'Anonymisering'
  },

  tooltips: {
    edit: 'Rediger',
    duplicate: 'Dupliser',
    delete: 'Slett'
  },

  labels: {
    filters: 'Filtre',
    days: '{{count}} dager',
    minutes: '{{count}} min',
    none: 'Ingen',
    targetCompany: 'Målselskap',
    note: 'Merknad',
    showingRules: 'Viser {{shown}} av {{total}} regler'
  },

  placeholders: {
    search: 'Søk påminnelsesregler...',
    searchCompany: 'Søk og velg et selskap...'
  },

  actions: {
    cancel: 'Avbryt',
    save: 'Lagre',
    create: 'Opprett Regel',
    update: 'Oppdater Regel',
    delete: 'Slett Regel',
    deleteRule: 'Slett Regel',
    duplicate: 'Dupliser Regel',
    duplicateRule: 'Dupliser Regel',
    clearFilters: 'Fjern Alle Filtre',
    creating: 'Oppretter...',
    updating: 'Oppdaterer...'
  },

  sections: {
    basicConfiguration: 'Grunnleggende Konfigurasjon',
    affectedStatuses: 'Berørte Inspeksjonsstatuser',
    delayConfiguration: 'Forsinkelseskonfigurasjon',
    firstReminder: 'Første Påminnelse',
    secondReminder: 'Andre Påminnelse',
    availableVariables: 'Tilgjengelige Variabler'
  },

  form: {
    company: 'Selskap',
    companyRequired: 'Selskap er påkrevd',
    type: 'Type',
    activationDate: 'Aktiveringsdato',
    activationDateRequired: 'Aktiveringsdato er påkrevd',
    utcSendingTime: 'UTC-sendetid',
    maxSendings: 'Maks. Sendinger',
    firstDelayDays: 'Første Forsinkelse (Dager)',
    firstDelayMinutes: 'Første Forsinkelse (Minutter)',
    secondDelayDays: 'Andre Forsinkelse (Dager)',
    secondDelayMinutes: 'Andre Forsinkelse (Minutter)',
    loadingCompanies: 'Laster selskaper...',
    searchCompany: 'Søk og velg et selskap...',
    clickToInsert: 'Klikk for å sette inn',
    statusesHelp: 'Regler gjelder kun for inspeksjoner i de valgte statusene'
  },

  statuses: {
    inspectionCreated: 'Inspeksjon Opprettet',
    inspectionInProgress: 'Inspeksjon Pågår',
    detectionFinished: 'Deteksjon Fullført',
    damageReviewOngoing: 'Skadevurdering Pågår',
    completed: 'Fullført',
    chasedUpManually: 'Påminnet Manuelt'
  },

  reminder: {
    webhook: 'Aktiver Webhook',
    enabled: 'Aktivert',
    user: 'Bruker',
    customer: 'Kunde',
    emailAddress: 'E-postadresse',
    userEmailAddress: 'Bruker E-postadresse',
    smsNumber: 'SMS-nummer',
    userSmsNumber: 'Bruker SMS-nummer',
    sms: 'SMS',
    email: 'E-post',
    language: 'Språk',
    emailSubject: 'E-postemne',
    emailContent: 'E-postinnhold',
    smsContent: 'SMS-innhold',
    smsMaxLength: 'SMS-innhold (maks 160 tegn)...',
    characterCount: 'Antall tegn: {{count}}/160'
  },

  variables: {
    customerName: 'Kundenavn',
    customerEmail: 'Kunde E-post',
    customerPhone: 'Kundetelefon',
    inspectionId: 'Inspeksjons-ID',
    inspectionLink: 'Inspeksjonslenke',
    vehicleMake: 'Kjøretøymerke',
    vehicleModel: 'Kjøretøymodell',
    licensePlate: 'Registreringsnummer',
    companyName: 'Selskapsnavn',
    agentName: 'Agentnavn',
    inspectionDate: 'Inspeksjonsdato',
    trackingUrl: 'Sporings-URL'
  },

  modals: {
    duplicateTitle: 'Dupliser Påminnelsesregel',
    duplicateMessage: 'Dupliser påminnelsesregelen fra {{company}} til et selskap',
    duplicateNote: 'Påminnelsesregelen vil bli duplisert til det valgte selskapet med alle innstillinger, forsinkelser og meldingsmaler. Du kan velge samme selskap for å opprette en kopi.',
    deleteTitle: 'Slett Påminnelsesregel',
    deleteMessage: 'Er du sikker på at du vil slette påminnelsesregelen for {{company}}? Denne handlingen kan ikke angres.'
  },

  messages: {
    loading: 'Laster...',
    loadError: 'Feil ved lasting av påminnelsesregler',
    createSuccess: 'Påminnelsesregel opprettet',
    updateSuccess: 'Påminnelsesregel oppdatert',
    deleteSuccess: 'Påminnelsesregel slettet',
    deleteError: 'Kunne ikke slette påminnelsesregel',
    duplicateSuccess: 'Påminnelsesregel duplisert',
    duplicateError: 'Kunne ikke duplisere påminnelsesregel',
    noRulesFound: 'Ingen påminnelsesregler funnet som samsvarer med kriteriene.',
    ruleNotFound: 'Regel ikke Funnet',
    ruleNotFoundMessage: 'Påminnelsesregelen du leter etter finnes ikke.'
  },

  filters: {
    allTypes: 'Alle Typer',
    allCompanies: 'Alle Selskaper',
    all: 'Alle'
  }
} as const;
