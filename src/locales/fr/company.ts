export const company = {
  title: 'Entreprises',
  subtitle: 'Gérer les entreprises, leurs paramètres et configurations',
  create: 'Créer une nouvelle entreprise',
  edit: 'Modifier l\'entreprise',
  duplicate: 'Dupliquer l\'entreprise',
  archive: 'Archiver l\'entreprise',
  unarchive: 'Désarchiver l\'entreprise',
  fields: {
    name: 'Nom de l\'entreprise',
    identifier: 'Identifiant',
    companyId: 'ID entreprise',
    apiToken: 'Token API',
    currentRequests: 'Requêtes actuelles',
    maxRequests: 'Requêtes max',
    createdDate: 'Date de création',
    contractType: 'Type de contrat',
    businessSector: 'Secteur d\'activité',
    parentCompany: 'Entreprise parente',
    childrenCount: 'Filiales',
    chaseupRules: 'Règles de relance',
    companyStatus: 'Statut de l\'entreprise'
  },
  contractTypes: {
    client: 'Client',
    prospect: 'Prospect',
    test: 'Test',
    demo: 'Démo',
    allTypes: 'Tous les types'
  },
  filters: {
    contractType: 'Type de contrat',
    companyHierarchy: 'Hiérarchie d\'entreprise',
    allCompanies: 'Toutes les entreprises',
    parentCompanies: 'Entreprises parentes',
    childCompanies: 'Entreprises filles',
    active: 'Entreprises actives',
    archived: 'Entreprises archivées',
    showArchived: 'Afficher les entreprises archivées'
  },
  status: {
    active: 'Active',
    archived: 'Archivée'
  },
  actions: {
    edit: 'Modifier',
    duplicate: 'Dupliquer',
    archive: 'Archiver',
    unarchive: 'Désarchiver'
  },
  placeholders: {
    search: 'Rechercher par nom, identifiant, ID entreprise ou token API...',
    companyName: 'Entrer le nom de la nouvelle entreprise',
    senderName: 'Entrer le nom de l\'expéditeur',
    webhookUrl: 'Entrer l\'URL du webhook',
    searchCompanies: 'Rechercher des entreprises...'
  },
  labels: {
    companyManagement: 'Gestion des entreprises',
    newCompanyName: 'Nouveau nom d\'entreprise',
    senderName: 'Nom de l\'expéditeur',
    webhookUrl: 'URL du Webhook',
    parentCompanyOptional: 'Entreprise parente (Optionnel)',
    duplicateOptions: 'Options de duplication',
    duplicateJourneys: 'Dupliquer les parcours',
    duplicateCostSettings: 'Dupliquer les paramètres de coût',
    duplicateSortingRules: 'Dupliquer les règles de tri',
    duplicateWebhookEvents: 'Dupliquer les événements webhook',
    archivedCount: '{{count}} archivée(s)'
  },
  chaseupStatus: {
    active: 'Active',
    create: 'Créer'
  },
  messages: {
    createSuccess: 'Entreprise créée avec succès',
    updateSuccess: 'Entreprise mise à jour avec succès',
    deleteSuccess: 'Entreprise supprimée avec succès',
    duplicateSuccess: 'Entreprise dupliquée avec succès',
    archiveSuccess: 'Entreprise archivée avec succès',
    unarchiveSuccess: 'Entreprise désarchivée avec succès',
    noCompaniesFound: 'Aucune entreprise trouvée correspondant à vos critères.',
    archiveDescription: 'Les entreprises archivées peuvent être restaurées ultérieurement en utilisant le filtre "Afficher les entreprises archivées".',
    unarchiveDescription: 'Le désarchivage restaurera l\'accès à l\'entreprise et à son token API.',
    loading: 'Chargement des entreprises...'
  }
} as const;
