export const company = {
  title: 'Aziende',
  subtitle: 'Gestisci aziende, le loro impostazioni e configurazioni',
  create: 'Crea nuova azienda',
  edit: 'Modifica azienda',
  duplicate: 'Duplica azienda',
  archive: 'Archivia azienda',
  unarchive: 'Ripristina azienda',
  fields: {
    name: 'Nome azienda',
    identifier: 'Identificatore',
    companyId: 'ID azienda',
    apiToken: 'Token API',
    currentRequests: 'Richieste attuali',
    maxRequests: 'Richieste max',
    createdDate: 'Data creazione',
    contractType: 'Tipo di contratto',
    businessSector: 'Settore aziendale',
    parentCompany: 'Azienda madre',
    childrenCount: 'Filiali',
    chaseupRules: 'Regole di sollecito',
    companyStatus: 'Stato azienda'
  },
  contractTypes: {
    client: 'Cliente',
    prospect: 'Potenziale cliente',
    test: 'Test',
    demo: 'Demo',
    allTypes: 'Tutti i tipi'
  },
  filters: {
    contractType: 'Tipo di contratto',
    companyHierarchy: 'Gerarchia aziendale',
    allCompanies: 'Tutte le aziende',
    parentCompanies: 'Aziende madri',
    childCompanies: 'Aziende figlie',
    active: 'Aziende attive',
    archived: 'Aziende archiviate',
    showArchived: 'Mostra aziende archiviate'
  },
  status: {
    active: 'Attivo',
    archived: 'Archiviato'
  },
  actions: {
    edit: 'Modifica',
    duplicate: 'Duplica',
    archive: 'Archivia',
    unarchive: 'Ripristina'
  },
  placeholders: {
    search: 'Cerca per nome, identificatore, ID azienda o token API...',
    companyName: 'Inserisci il nuovo nome dell\'azienda',
    senderName: 'Inserisci nome mittente',
    webhookUrl: 'Inserisci URL webhook',
    searchCompanies: 'Cerca aziende...'
  },
  labels: {
    companyManagement: 'Gestione aziende',
    newCompanyName: 'Nuovo nome azienda',
    senderName: 'Nome mittente',
    webhookUrl: 'URL Webhook',
    parentCompanyOptional: 'Azienda madre (Opzionale)',
    duplicateOptions: 'Opzioni duplicazione',
    duplicateJourneys: 'Duplica percorsi',
    duplicateCostSettings: 'Duplica impostazioni costi',
    duplicateSortingRules: 'Duplica regole ordinamento',
    duplicateWebhookEvents: 'Duplica eventi webhook',
    archivedCount: '{{count}} archiviata/e'
  },
  chaseupStatus: {
    active: 'Attivo',
    create: 'Crea'
  },
  messages: {
    createSuccess: 'Azienda creata con successo',
    updateSuccess: 'Azienda aggiornata con successo',
    deleteSuccess: 'Azienda eliminata con successo',
    duplicateSuccess: 'Azienda duplicata con successo',
    archiveSuccess: 'Azienda archiviata con successo',
    unarchiveSuccess: 'Azienda ripristinata con successo',
    noCompaniesFound: 'Nessuna azienda trovata che corrisponda ai tuoi criteri.',
    archiveDescription: 'Le aziende archiviate possono essere ripristinate successivamente utilizzando il filtro "Mostra aziende archiviate".',
    unarchiveDescription: 'Il ripristino ripristinerà l\'accesso all\'azienda e al suo token API.',
    loading: 'Caricamento aziende...'
  }
} as const;
