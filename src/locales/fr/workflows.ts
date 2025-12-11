export const workflows = {
  title: 'Parcours d\'Inspection',
  subtitle: 'Gestion des Parcours',
  description: 'Créer et gérer les flux de parcours d\'inspection',
  create: 'Créer un Nouveau Parcours',
  edit: 'Modifier le Parcours',
  duplicate: 'Dupliquer le Parcours',
  fields: {
    name: 'Nom du Parcours',
    journeyName: 'Nom du Parcours',
    description: 'Description',
    company: 'Entreprise',
    blocksCount: 'Nombre de Blocs',
    status: 'Statut',
    isActive: 'Actif',
    actions: 'Actions',
    newJourneyName: 'Nouveau Nom du Parcours'
  },
  status: {
    active: 'Actif',
    inactive: 'Inactif'
  },
  tooltips: {
    edit: 'Modifier',
    duplicate: 'Dupliquer',
    delete: 'Supprimer'
  },
  labels: {
    copy: '(Copie)',
    filters: 'Filtres',
    showing: 'Affichage de {{count}} sur {{total}} parcours',
    showingPagination: 'Affichage de {{from}} à {{to}} sur {{total}} workflows'
  },
  placeholders: {
    searchJourneys: 'Rechercher des parcours...',
    allStatus: 'Tous les Statuts',
    allCompanies: 'Toutes les Entreprises',
    searchCompany: 'Rechercher et sélectionner une entreprise...',
    enterJourneyName: 'Entrer le nouveau nom du parcours'
  },
  actions: {
    cancel: 'Annuler',
    delete: 'Supprimer le Parcours',
    duplicate: 'Dupliquer le Parcours',
    clearFilters: 'Effacer Tous les Filtres',
    previous: 'Précédent',
    next: 'Suivant'
  },
  modals: {
    duplicateTitle: 'Dupliquer le Parcours',
    duplicateMessage: 'Créer une copie de',
    deleteTitle: 'Supprimer le Parcours',
    deleteMessage: 'Êtes-vous sûr de vouloir supprimer {{name}} ? Cette action ne peut pas être annulée.'
  },
  blocks: {
    title: 'Blocs du Parcours',
    addBlock: 'Ajouter un Bloc',
    form: 'Bloc Formulaire',
    shootInspection: 'Bloc Inspection Photo',
    fastTrack: 'Bloc Fast Track',
    addDamage: 'Bloc Ajouter Dommage',
    static: 'Bloc Écran Statique'
  },
  blockTypes: {
    form: {
      name: 'Bloc Formulaire',
      description: 'Formulaire personnalisé avec configuration JSON'
    },
    shootInspection: {
      name: 'Bloc Inspection Photo',
      description: 'Flux de capture photo'
    },
    fastTrack: {
      name: 'Bloc Fast Track',
      description: 'Processus d’inspection rapide'
    },
    addDamage: {
      name: 'Bloc Ajouter Dommage',
      description: 'Signalement manuel de dommages'
    },
    static: {
      name: 'Bloc Écran Statique',
      description: 'Écrans de contenu statique (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Configuration du Parcours',
    importJson: 'Importer JSON',
    exportJson: 'Exporter JSON'
  },
  messages: {
    loading: 'Chargement des parcours...',
    noCompanySelected: 'Aucune entreprise sélectionnée',
    loadError: 'Échec du chargement des parcours',
    createSuccess: 'Parcours créé avec succès',
    updateSuccess: 'Parcours mis à jour avec succès',
    deleteSuccess: 'Parcours supprimé avec succès',
    deleteError: 'Échec de la suppression du parcours',
    duplicateSuccess: 'Parcours dupliqué avec succès',
    duplicateError: 'Échec de la duplication du parcours',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce parcours ?',
    noBlocks: 'Aucun bloc ajouté pour le moment. Cliquez sur "Ajouter un Bloc" pour commencer à construire votre parcours.',
    nameRequired: 'Veuillez saisir un nom de parcours',
    blocksRequired: 'Veuillez ajouter au moins un bloc au parcours',
    viewAllWorkflows: 'Voir tous les workflows de toutes les entreprises',
    workflowsPaginated: 'Les workflows sont paginés pour de meilleures performances',
    noJourneysFound: 'Aucun parcours trouvé correspondant à vos critères.'
  }
} as const;
