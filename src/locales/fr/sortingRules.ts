export const sortingRules = {
  title: 'Règles de Tri',
  subtitle: 'Configurer les règles de filtrage et de mise à jour automatisées par entreprise',
  create: 'Créer une Nouvelle Règle',
  edit: 'Modifier la Règle de Tri',
  fields: {
    company: 'Entreprise',
    type: 'Type',
    fromCollection: 'Collection Source',
    targetCollection: 'Collection Cible',
    referenceKey: 'Clé de Référence',
    referencePrefix: 'Préfixe de Référence',
    filters: 'Filtres (JSON)',
    updates: 'Mises à jour (JSON)',
    processingPriority: 'Priorité de Traitement',
    priority: 'Priorité',
    actions: 'Actions'
  },
  types: {
    detectionPhase: 'Phase de Détection',
    validationPhase: 'Phase de Validation',
    reportGeneration: 'Génération de Rapport'
  },
  priorities: {
    highest: '1 - Priorité la Plus Élevée',
    high: '2 - Priorité Élevée',
    medium: '3 - Priorité Moyenne',
    low: '4 - Priorité Faible',
    lowest: '5 - Priorité la Plus Faible',
    highLevel: 'Priorité Élevée (1-2)',
    mediumLevel: 'Priorité Moyenne (3-4)'
  },
  tooltips: {
    edit: 'Modifier la Règle de Tri',
    delete: 'Supprimer la Règle de Tri'
  },
  labels: {
    filters: 'Filtres',
    allTypes: 'Tous les Types',
    allCompanies: 'Toutes les Entreprises',
    allPriorities: 'Toutes les Priorités',
    priorityLevel: 'Niveau de Priorité'
  },
  placeholders: {
    search: 'Rechercher des règles de tri...'
  },
  actions: {
    cancel: 'Annuler',
    delete: 'Supprimer',
    clearFilters: 'Effacer Tous les Filtres'
  },
  modals: {
    deleteTitle: 'Supprimer la Règle de Tri',
    deleteMessage: 'Êtes-vous sûr de vouloir supprimer la règle de tri {{type}} ({{from}} → {{to}}) ?'
  },
  examples: {
    title: 'Exemples de Configuration',
    filterExamples: 'Exemples de Filtres :',
    updateExamples: 'Exemples de Mises à jour :',
    filtersHelp: 'Objet JSON définissant les critères de filtrage',
    updatesHelp: 'Objet JSON définissant les mises à jour à appliquer'
  },
  messages: {
    createSuccess: 'Règle de tri créée avec succès',
    updateSuccess: 'Règle de tri mise à jour avec succès',
    deleteSuccess: 'Règle de tri supprimée avec succès',
    invalidJson: 'Format JSON invalide',
    loadingRule: 'Chargement de la règle de tri...',
    showingResults: 'Affichage de {{count}} sur {{total}} règles de tri',
    noResults: 'Aucune règle de tri trouvée'
  }
} as const;