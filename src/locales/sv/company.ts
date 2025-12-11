export const company = {
  title: 'Företag',
  subtitle: 'Hantera företag, deras inställningar och konfigurationer',
  create: 'Skapa nytt företag',
  edit: 'Redigera företag',
  duplicate: 'Duplicera företag',
  archive: 'Arkivera företag',
  unarchive: 'Återställ företag',
  fields: {
    name: 'Företagsnamn',
    identifier: 'Identifierare',
    companyId: 'Företags-ID',
    apiToken: 'API-token',
    currentRequests: 'Aktuella förfrågningar',
    maxRequests: 'Max förfrågningar',
    createdDate: 'Skapat datum',
    contractType: 'Kontraktstyp',
    businessSector: 'Affärssektor',
    parentCompany: 'Moderföretag',
    childrenCount: 'Dotterbolag',
    chaseupRules: 'Påminnelseregler',
    companyStatus: 'Företagsstatus'
  },
  contractTypes: {
    client: 'Kund',
    prospect: 'Prospekt',
    test: 'Test',
    demo: 'Demo',
    allTypes: 'Alla typer'
  },
  filters: {
    contractType: 'Kontraktstyp',
    companyHierarchy: 'Företagshierarki',
    allCompanies: 'Alla företag',
    parentCompanies: 'Moderföretag',
    childCompanies: 'Dotterbolag',
    active: 'Aktiva företag',
    archived: 'Arkiverade företag',
    showArchived: 'Visa arkiverade företag'
  },
  status: {
    active: 'Aktiv',
    archived: 'Arkiverad'
  },
  actions: {
    edit: 'Redigera',
    duplicate: 'Duplicera',
    archive: 'Arkivera',
    unarchive: 'Återställ'
  },
  placeholders: {
    search: 'Sök efter namn, identifierare, företags-ID eller API-token...',
    companyName: 'Ange nytt företagsnamn',
    senderName: 'Ange avsändarnamn',
    webhookUrl: 'Ange webhook-URL',
    searchCompanies: 'Sök företag...'
  },
  labels: {
    companyManagement: 'Företagshantering',
    newCompanyName: 'Nytt företagsnamn',
    senderName: 'Avsändarnamn',
    webhookUrl: 'Webhook-URL',
    parentCompanyOptional: 'Moderföretag (Valfritt)',
    duplicateOptions: 'Dupliceringsalternativ',
    duplicateJourneys: 'Duplicera resor',
    duplicateCostSettings: 'Duplicera kostnadsinställningar',
    duplicateSortingRules: 'Duplicera sorteringsregler',
    duplicateWebhookEvents: 'Duplicera webhook-händelser',
    archivedCount: '{{count}} arkiverad(e)'
  },
  chaseupStatus: {
    active: 'Aktiv',
    create: 'Skapa'
  },
  messages: {
    createSuccess: 'Företag skapat framgångsrikt',
    updateSuccess: 'Företag uppdaterat framgångsrikt',
    deleteSuccess: 'Företag raderat framgångsrikt',
    duplicateSuccess: 'Företag duplicerat framgångsrikt',
    archiveSuccess: 'Företag arkiverat framgångsrikt',
    unarchiveSuccess: 'Företag återställt framgångsrikt',
    noCompaniesFound: 'Inga företag hittades som matchar dina kriterier.',
    archiveDescription: 'Arkiverade företag kan återställas senare med filtret "Visa arkiverade företag".',
    unarchiveDescription: 'Återställning återställer åtkomsten till företaget och dess API-token.',
    loading: 'Laddar företag...'
  }
} as const;
