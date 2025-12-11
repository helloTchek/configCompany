export const chaseupRules = {
  title: 'Automatiserte Påminnelsesregler',
  subtitle: 'Konfigurer automatiserte påminnelsesmeldinger for selskaper',
  create: 'Opprett Ny Regel',
  edit: 'Rediger Påminnelsesregel',
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
    delete: 'Slett Regel',
    deleteRule: 'Slett Regel',
    duplicate: 'Dupliser Regel',
    duplicateRule: 'Dupliser Regel',
    clearFilters: 'Fjern Alle Filtre'
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
    noRulesFound: 'Ingen påminnelsesregler funnet som samsvarer med kriteriene.'
  },
  filters: {
    allTypes: 'Alle Typer',
    allCompanies: 'Alle Selskaper',
    all: 'Alle'
  }
} as const;
