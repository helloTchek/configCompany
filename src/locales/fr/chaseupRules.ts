export const chaseupRules = {
  title: 'Règles de relance automatisées',
  subtitle: 'Configurer les règles de messages de relance automatisés pour les entreprises',
  create: 'Créer une nouvelle règle',
  edit: 'Modifier la règle de relance',
  fields: {
    company: 'Entreprise',
    type: 'Type',
    activationDate: 'Date d\'activation',
    utcTime: 'Heure UTC',
    maxSendings: 'Envois maximum',
    firstDelay: 'Premier délai',
    secondDelay: 'Deuxième délai',
    thirdDelay: 'Troisième délai',
    actions: 'Actions'
  },
  types: {
    event: 'Événement',
    anonymization: 'Anonymisation'
  },
  tooltips: {
    edit: 'Modifier',
    duplicate: 'Dupliquer',
    delete: 'Supprimer'
  },
  labels: {
    filters: 'Filtres',
    days: '{{count}} jours',
    minutes: '{{count}} min',
    none: 'Aucun',
    targetCompany: 'Entreprise cible',
    note: 'Remarque',
    showingRules: 'Affichage de {{shown}} sur {{total}} règles'
  },
  placeholders: {
    search: 'Rechercher des règles de relance...',
    searchCompany: 'Rechercher et sélectionner une entreprise...'
  },
  actions: {
    cancel: 'Annuler',
    delete: 'Supprimer la règle',
    deleteRule: 'Supprimer la règle',
    duplicate: 'Dupliquer la règle',
    duplicateRule: 'Dupliquer la règle',
    clearFilters: 'Effacer tous les filtres'
  },
  modals: {
    duplicateTitle: 'Dupliquer la règle de relance',
    duplicateMessage: 'Dupliquer la règle de relance de {{company}} vers une entreprise',
    duplicateNote: 'La règle de relance sera dupliquée vers l\'entreprise sélectionnée avec tous ses paramètres, délais et modèles de messages. Vous pouvez sélectionner la même entreprise pour créer une copie.',
    deleteTitle: 'Supprimer la règle de relance',
    deleteMessage: 'Êtes-vous sûr de vouloir supprimer la règle de relance pour {{company}} ? Cette action ne peut pas être annulée.'
  },
  messages: {
    loading: 'Chargement...',
    loadError: 'Erreur lors du chargement des règles de relance',
    createSuccess: 'Règle de relance créée avec succès',
    updateSuccess: 'Règle de relance mise à jour avec succès',
    deleteSuccess: 'Règle de relance supprimée avec succès',
    deleteError: 'Échec de la suppression de la règle de relance',
    duplicateSuccess: 'Règle de relance dupliquée avec succès',
    duplicateError: 'Échec de la duplication de la règle de relance',
    noRulesFound: 'Aucune règle de relance trouvée correspondant à vos critères.'
  },
  filters: {
    allTypes: 'Tous les types',
    allCompanies: 'Toutes les entreprises',
    all: 'Tout'
  }
} as const;
