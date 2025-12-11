export const company = {
  title: 'Unternehmen',
  subtitle: 'Verwalten Sie Unternehmen, deren Einstellungen und Konfigurationen',
  create: 'Neues Unternehmen erstellen',
  edit: 'Unternehmen bearbeiten',
  duplicate: 'Unternehmen duplizieren',
  archive: 'Unternehmen archivieren',
  unarchive: 'Unternehmen wiederherstellen',
  fields: {
    name: 'Unternehmensname',
    identifier: 'Kennung',
    companyId: 'Unternehmens-ID',
    apiToken: 'API-Token',
    currentRequests: 'Aktuelle Anfragen',
    maxRequests: 'Max. Anfragen',
    createdDate: 'Erstellungsdatum',
    contractType: 'Vertragsart',
    businessSector: 'Geschäftsbereich',
    parentCompany: 'Mutterunternehmen',
    childrenCount: 'Tochtergesellschaften',
    chaseupRules: 'Nachfassregeln',
    companyStatus: 'Unternehmensstatus'
  },
  contractTypes: {
    client: 'Kunde',
    prospect: 'Interessent',
    test: 'Test',
    demo: 'Demo',
    allTypes: 'Alle Typen'
  },
  filters: {
    contractType: 'Vertragsart',
    companyHierarchy: 'Unternehmenshierarchie',
    allCompanies: 'Alle Unternehmen',
    parentCompanies: 'Mutterunternehmen',
    childCompanies: 'Tochtergesellschaften',
    active: 'Aktive Unternehmen',
    archived: 'Archivierte Unternehmen',
    showArchived: 'Archivierte Unternehmen anzeigen'
  },
  status: {
    active: 'Aktiv',
    archived: 'Archiviert'
  },
  actions: {
    edit: 'Bearbeiten',
    duplicate: 'Duplizieren',
    archive: 'Archivieren',
    unarchive: 'Wiederherstellen'
  },
  placeholders: {
    search: 'Suche nach Name, Kennung, Unternehmens-ID oder API-Token...',
    companyName: 'Neuen Unternehmensnamen eingeben',
    senderName: 'Absendername eingeben',
    webhookUrl: 'Webhook-URL eingeben',
    searchCompanies: 'Unternehmen suchen...'
  },
  labels: {
    companyManagement: 'Unternehmensverwaltung',
    newCompanyName: 'Neuer Unternehmensname',
    senderName: 'Absendername',
    webhookUrl: 'Webhook-URL',
    parentCompanyOptional: 'Mutterunternehmen (Optional)',
    duplicateOptions: 'Duplizierungsoptionen',
    duplicateJourneys: 'Journeys duplizieren',
    duplicateCostSettings: 'Kosteneinstellungen duplizieren',
    duplicateSortingRules: 'Sortierregeln duplizieren',
    duplicateWebhookEvents: 'Webhook-Ereignisse duplizieren',
    archivedCount: '{{count}} archiviert'
  },
  chaseupStatus: {
    active: 'Aktiv',
    create: 'Erstellen'
  },
  messages: {
    createSuccess: 'Unternehmen erfolgreich erstellt',
    updateSuccess: 'Unternehmen erfolgreich aktualisiert',
    deleteSuccess: 'Unternehmen erfolgreich gelöscht',
    duplicateSuccess: 'Unternehmen erfolgreich dupliziert',
    archiveSuccess: 'Unternehmen erfolgreich archiviert',
    unarchiveSuccess: 'Unternehmen erfolgreich wiederhergestellt',
    noCompaniesFound: 'Keine Unternehmen gefunden, die Ihren Kriterien entsprechen.',
    archiveDescription: 'Archivierte Unternehmen können später über den Filter "Archivierte Unternehmen anzeigen" wiederhergestellt werden.',
    unarchiveDescription: 'Die Wiederherstellung stellt den Zugriff auf das Unternehmen und sein API-Token wieder her.',
    loading: 'Unternehmen werden geladen...'
  }
} as const;
