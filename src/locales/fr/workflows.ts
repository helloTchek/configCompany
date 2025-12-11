export const workflows = {
  title: 'Parcours d\'Inspection',
  subtitle: 'Gestion des Parcours',
  description: 'Créer et gérer les flux de parcours d\'inspection',
  create: 'Créer un Nouveau Parcours',
  createTitle: 'Créer un Parcours d\'Inspection',
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
    newJourneyName: 'Nouveau Nom du Parcours',
    blockName: 'Nom du Bloc',
    activeStatus: 'Statut Actif'
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
    enterJourneyName: 'Entrer le nom du parcours',
    enterNewJourneyName: 'Entrer le nouveau nom du parcours',
    enterDescription: 'Entrer la description (optionnel)',
    enterJourneyDescription: 'Entrer la description du parcours',
    enterBlockName: 'Entrer le nom du bloc',
    enterBlockDescription: 'Entrer la description du bloc'
  },
  actions: {
    cancel: 'Annuler',
    delete: 'Supprimer le Parcours',
    duplicate: 'Dupliquer le Parcours',
    clearFilters: 'Effacer Tous les Filtres',
    previous: 'Précédent',
    next: 'Suivant',
    back: 'Retour',
    backToJourneys: 'Retour aux Parcours',
    save: 'Enregistrer le Parcours',
    saveAndAddAnother: 'Enregistrer et Ajouter un Autre',
    configure: 'Configurer',
    edit: 'Modifier',
    remove: 'Supprimer',
    importJson: 'Importer JSON',
    exportJson: 'Exporter JSON'
  },
  modals: {
    duplicateTitle: 'Dupliquer le Parcours',
    duplicateMessage: 'Créer une copie de',
    deleteTitle: 'Supprimer le Parcours',
    deleteMessage: 'Êtes-vous sûr de vouloir supprimer {{name}} ? Cette action ne peut pas être annulée.',
    addBlockTitle: 'Ajouter un Bloc au Parcours',
    selectBlockType: 'Sélectionner le Type de Bloc',
    configureShootInspection: 'Configurer le Bloc Inspection Photo',
    configureStaticScreen: 'Configurer l\'Écran Statique',
    configureFormBlock: 'Configurer le Bloc Formulaire',
    configure: 'Configurer {{blockType}}'
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
  messages: {
    loading: 'Chargement des parcours...',
    noCompanySelected: 'Aucune entreprise sélectionnée',
    loadError: 'Échec du chargement des parcours',
    createSuccess: 'Parcours créé avec succès',
    createError: 'Échec de la création du parcours',
    updateSuccess: 'Parcours mis à jour avec succès',
    deleteSuccess: 'Parcours supprimé avec succès',
    deleteError: 'Échec de la suppression du parcours',
    duplicateSuccess: 'Parcours dupliqué avec succès',
    duplicateError: 'Échec de la duplication du parcours',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce parcours ?',
    noBlocks: 'Aucun bloc ajouté pour le moment. Cliquez sur "Ajouter un Bloc" pour commencer à construire votre parcours.',
    nameRequired: 'Veuillez saisir un nom de parcours',
    companyRequired: 'Veuillez sélectionner une entreprise',
    blocksRequired: 'Veuillez ajouter au moins un bloc',
    viewAllWorkflows: 'Voir tous les workflows de toutes les entreprises',
    workflowsPaginated: 'Les workflows sont paginés pour de meilleures performances',
    noJourneysFound: 'Aucun parcours trouvé correspondant à vos critères.',
    loadCompaniesError: 'Échec du chargement des entreprises',
    invalidJson: 'Fichier JSON invalide',
    invalidJsonConfiguration: 'Configuration JSON invalide',
    configurationImported: 'Configuration importée avec succès',
    formConfigArrayEmpty: 'Le tableau de configuration du formulaire est vide',
    staticConfigArrayEmpty: 'Le tableau de configuration statique est vide',
    formConfigIdRequired: 'La configuration du formulaire doit avoir un champ "id"',
    staticConfigIdRequired: 'La configuration statique doit avoir un champ "id"',
    saving: 'Enregistrement...',
    configureThisBlock: 'Configurer ce bloc',
    noConfiguration: 'Aucune configuration',
    block: 'Bloc'
  },
  configuration: {
    title: 'Configuration du Parcours',
    importJson: 'Importer JSON',
    exportJson: 'Exporter JSON',
    formConfiguration: 'Configuration du Formulaire (JSON Complet)',
    staticScreensConfiguration: 'Configuration des Écrans Statiques',
    jsonContent: 'Contenu JSON',
    showExample: 'Afficher un exemple de structure',
    formConfigHelp: 'Entrez la configuration JSON complète du formulaire incluant les champs id, name, description et config.',
    staticConfigHelp: 'Configurez les écrans statiques (onboarding/offboarding). Entrez la configuration du tableau de screens.',
    formConfigTip: 'Collez votre JSON de formulaire complet incluant id, name, description et config',
    staticConfigTip: 'Types d\'écrans : onboarding, offboarding, info',
    allowedDamageTypes: 'Types de Dommages Autorisés'
  },
  sections: {
    journeyDetails: 'Détails du Parcours'
  }
} as const;
