export const common = {
  actions: {
    create: 'Créer',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    search: 'Rechercher',
    filter: 'Filtrer',
    export: 'Exporter',
    import: 'Importer',
    upload: 'Télécharger',
    download: 'Télécharger',
    duplicate: 'Dupliquer',
    view: 'Voir',
    close: 'Fermer',
    refresh: 'Actualiser',
    reset: 'Réinitialiser',
    clear: 'Effacer',
    apply: 'Appliquer',
    remove: 'Supprimer',
    add: 'Ajouter',
    update: 'Mettre à jour',
    submit: 'Soumettre',
    login: 'Connexion',
    logout: 'Déconnexion',
    loading: 'Chargement...',
    retry: 'Réessayer',
    select: 'Sélectionner',
    clearFilters: 'Effacer Tous les Filtres'
  },
  status: {
    active: 'Actif',
    inactive: 'Inactif',
    enabled: 'Activé',
    disabled: 'Désactivé',
    pending: 'En attente',
    completed: 'Terminé',
    failed: 'Échoué',
    success: 'Succès',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Info',
    draft: 'Brouillon',
    published: 'Publié',
    archived: 'Archivé'
  },
  validation: {
    required: 'Ce champ est requis',
    email: 'Veuillez saisir une adresse e-mail valide',
    minLength: 'Doit contenir au moins {{min}} caractères',
    maxLength: 'Ne doit pas dépasser {{max}} caractères',
    numeric: 'Doit être un nombre',
    positive: 'Doit être un nombre positif',
    url: 'Veuillez saisir une URL valide',
    phone: 'Veuillez saisir un numéro de téléphone valide',
    password: 'Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule et chiffre'
  },
  messages: {
    noData: 'Aucune donnée disponible',
    noResults: 'Aucun résultat trouvé',
    loadingError: 'Échec du chargement des données',
    saveSuccess: 'Enregistré avec succès',
    saveError: 'Échec de l\'enregistrement',
    deleteSuccess: 'Supprimé avec succès',
    deleteError: 'Échec de la suppression',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    unsavedChanges: 'Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?',
    sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.',
    accessDenied: 'Accès refusé. Vous n\'avez pas l\'autorisation de voir cette page.',
    networkError: 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.'
  },
  filters: {
    allTypes: 'Tous les Types',
    allCompanies: 'Toutes les Entreprises',
    allPriorities: 'Toutes les Priorités'
  },
  fields: {
    actions: 'Actions',
    level: 'Niveau'
  },
  sections: {
    basicInformation: 'Informations de Base',
    configuration: 'Configuration'
  },
  navigation: {
    companies: 'Entreprises',
    users: 'Utilisateurs',
    workflows: 'Flux de travail',
    costs: 'Matrices de coûts',
    sortingRules: 'Règles de tri',
    chaseupRules: 'Règles de relance automatisées',
    profile: 'Profil',
    help: 'Aide',
    documentation: 'Documentation'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Utilisateur'
  },
  languages: {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    es: 'Español',
    nl: 'Nederlands',
    sv: 'Svenska',
    no: 'Norsk'
  }
} as const;