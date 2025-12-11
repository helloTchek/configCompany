export const company = {
  title: 'Selskaper',
  subtitle: 'Administrer selskaper, deres innstillinger og konfigurasjoner',
  create: 'Opprett nytt selskap',
  edit: 'Rediger selskap',
  duplicate: 'Dupliser selskap',
  archive: 'Arkiver selskap',
  unarchive: 'Gjenopprett selskap',
  fields: {
    name: 'Selskapsnavn',
    identifier: 'Identifikator',
    companyId: 'Selskaps-ID',
    apiToken: 'API-token',
    currentRequests: 'Aktuelle forespørsler',
    maxRequests: 'Maks forespørsler',
    createdDate: 'Opprettet dato',
    contractType: 'Kontrakttype',
    businessSector: 'Bransje',
    parentCompany: 'Morselskap',
    childrenCount: 'Datterselskaper',
    chaseupRules: 'Påminnelsesregler',
    companyStatus: 'Selskapsstatus'
  },
  contractTypes: {
    client: 'Klient',
    prospect: 'Prospekt',
    test: 'Test',
    demo: 'Demo',
    allTypes: 'Alle typer'
  },
  filters: {
    contractType: 'Kontrakttype',
    companyHierarchy: 'Selskapshierarki',
    allCompanies: 'Alle selskaper',
    parentCompanies: 'Morselskaper',
    childCompanies: 'Datterselskaper',
    active: 'Aktive selskaper',
    archived: 'Arkiverte selskaper',
    showArchived: 'Vis arkiverte selskaper'
  },
  status: {
    active: 'Aktiv',
    archived: 'Arkivert'
  },
  actions: {
    edit: 'Rediger',
    duplicate: 'Dupliser',
    archive: 'Arkiver',
    unarchive: 'Gjenopprett'
  },
  placeholders: {
    search: 'Søk etter navn, identifikator, selskaps-ID eller API-token...',
    companyName: 'Skriv inn nytt selskapsnavn',
    senderName: 'Skriv inn avsendernavn',
    webhookUrl: 'Skriv inn webhook-URL',
    searchCompanies: 'Søk selskaper...'
  },
  labels: {
    companyManagement: 'Selskapsadministrasjon',
    newCompanyName: 'Nytt selskapsnavn',
    senderName: 'Avsendernavn',
    webhookUrl: 'Webhook-URL',
    parentCompanyOptional: 'Morselskap (Valgfritt)',
    duplicateOptions: 'Duplikeringsalternativer',
    duplicateJourneys: 'Dupliser reiser',
    duplicateCostSettings: 'Dupliser kostnadsinnstillinger',
    duplicateSortingRules: 'Dupliser sorteringsregler',
    duplicateWebhookEvents: 'Dupliser webhook-hendelser',
    archivedCount: '{{count}} arkivert(e)'
  },
  chaseupStatus: {
    active: 'Aktiv',
    create: 'Opprett'
  },
  messages: {
    createSuccess: 'Selskap opprettet',
    updateSuccess: 'Selskap oppdatert',
    deleteSuccess: 'Selskap slettet',
    duplicateSuccess: 'Selskap duplisert',
    archiveSuccess: 'Selskap arkivert',
    unarchiveSuccess: 'Selskap gjenopprettet',
    noCompaniesFound: 'Ingen selskaper funnet som matcher dine kriterier.',
    archiveDescription: 'Arkiverte selskaper kan gjenopprettes senere ved å bruke filteret "Vis arkiverte selskaper".',
    unarchiveDescription: 'Gjenoppretting vil gjenopprette tilgangen til selskapet og dets API-token.',
    loading: 'Laster selskaper...'
  }
} as const;
