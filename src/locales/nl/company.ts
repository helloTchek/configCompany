export const company = {
  title: 'Bedrijven',
  subtitle: 'Beheer bedrijven, hun instellingen en configuraties',
  create: 'Nieuw bedrijf aanmaken',
  edit: 'Bedrijf bewerken',
  duplicate: 'Bedrijf dupliceren',
  archive: 'Bedrijf archiveren',
  unarchive: 'Bedrijf herstellen',
  fields: {
    name: 'Bedrijfsnaam',
    identifier: 'Identificatie',
    companyId: 'Bedrijfs-ID',
    apiToken: 'API-token',
    currentRequests: 'Huidige verzoeken',
    maxRequests: 'Max. verzoeken',
    createdDate: 'Aanmaakdatum',
    contractType: 'Contracttype',
    businessSector: 'Bedrijfssector',
    parentCompany: 'Moederbedrijf',
    childrenCount: 'Dochterondernemingen',
    chaseupRules: 'Herinneringsregels',
    companyStatus: 'Bedrijfsstatus'
  },
  contractTypes: {
    client: 'Klant',
    prospect: 'Prospect',
    test: 'Test',
    demo: 'Demo',
    allTypes: 'Alle types'
  },
  filters: {
    contractType: 'Contracttype',
    companyHierarchy: 'Bedrijfshiërarchie',
    allCompanies: 'Alle bedrijven',
    parentCompanies: 'Moederbedrijven',
    childCompanies: 'Dochterondernemingen',
    active: 'Actieve bedrijven',
    archived: 'Gearchiveerde bedrijven',
    showArchived: 'Toon gearchiveerde bedrijven'
  },
  status: {
    active: 'Actief',
    archived: 'Gearchiveerd'
  },
  actions: {
    edit: 'Bewerken',
    duplicate: 'Dupliceren',
    archive: 'Archiveren',
    unarchive: 'Herstellen'
  },
  placeholders: {
    search: 'Zoek op naam, identificatie, bedrijfs-ID of API-token...',
    companyName: 'Voer nieuwe bedrijfsnaam in',
    senderName: 'Voer afzendernaam in',
    webhookUrl: 'Voer webhook-URL in',
    searchCompanies: 'Zoek bedrijven...'
  },
  labels: {
    companyManagement: 'Bedrijfsbeheer',
    newCompanyName: 'Nieuwe bedrijfsnaam',
    senderName: 'Afzendernaam',
    webhookUrl: 'Webhook-URL',
    parentCompanyOptional: 'Moederbedrijf (Optioneel)',
    duplicateOptions: 'Dupliceeropties',
    duplicateJourneys: 'Journeys dupliceren',
    duplicateCostSettings: 'Kosteninstellingen dupliceren',
    duplicateSortingRules: 'Sorteerregels dupliceren',
    duplicateWebhookEvents: 'Webhook-gebeurtenissen dupliceren',
    archivedCount: '{{count}} gearchiveerd'
  },
  chaseupStatus: {
    active: 'Actief',
    create: 'Aanmaken'
  },
  messages: {
    createSuccess: 'Bedrijf succesvol aangemaakt',
    updateSuccess: 'Bedrijf succesvol bijgewerkt',
    deleteSuccess: 'Bedrijf succesvol verwijderd',
    duplicateSuccess: 'Bedrijf succesvol gedupliceerd',
    archiveSuccess: 'Bedrijf succesvol gearchiveerd',
    unarchiveSuccess: 'Bedrijf succesvol hersteld',
    noCompaniesFound: 'Geen bedrijven gevonden die aan uw criteria voldoen.',
    archiveDescription: 'Gearchiveerde bedrijven kunnen later worden hersteld met het filter "Toon gearchiveerde bedrijven".',
    unarchiveDescription: 'Herstellen herstelt de toegang tot het bedrijf en zijn API-token.',
    loading: 'Bedrijven laden...'
  }
} as const;
