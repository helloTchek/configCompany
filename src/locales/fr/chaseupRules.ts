export const chaseupRules = {
  title: 'Règles de relance automatisées',
  subtitle: 'Configurer les règles de messages de relance automatisés pour les entreprises',
  create: 'Créer une nouvelle règle',
  edit: 'Modifier la règle de relance',
  createTitle: 'Créer une règle de relance',
  editTitle: 'Modifier la règle de relance',
  backToList: 'Retour aux règles de relance',

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
    save: 'Enregistrer',
    create: 'Créer la règle',
    update: 'Mettre à jour la règle',
    delete: 'Supprimer la règle',
    deleteRule: 'Supprimer la règle',
    duplicate: 'Dupliquer la règle',
    duplicateRule: 'Dupliquer la règle',
    clearFilters: 'Effacer tous les filtres',
    creating: 'Création...',
    updating: 'Mise à jour...'
  },

  sections: {
    basicConfiguration: 'Configuration de base',
    affectedStatuses: 'Statuts d\'inspection concernés',
    delayConfiguration: 'Configuration des délais',
    firstReminder: 'Premier rappel',
    secondReminder: 'Deuxième rappel',
    availableVariables: 'Variables disponibles'
  },

  form: {
    company: 'Entreprise',
    companyRequired: 'L\'entreprise est requise',
    type: 'Type',
    activationDate: 'Date d\'activation',
    activationDateRequired: 'La date d\'activation est requise',
    utcSendingTime: 'Heure d\'envoi UTC',
    maxSendings: 'Envois maximum',
    firstDelayDays: 'Premier délai (jours)',
    firstDelayMinutes: 'Premier délai (minutes)',
    secondDelayDays: 'Deuxième délai (jours)',
    secondDelayMinutes: 'Deuxième délai (minutes)',
    loadingCompanies: 'Chargement des entreprises...',
    searchCompany: 'Rechercher et sélectionner une entreprise...',
    clickToInsert: 'Cliquer pour insérer',
    statusesHelp: 'Les règles s\'appliqueront uniquement aux inspections dans les statuts sélectionnés'
  },

  statuses: {
    inspectionCreated: 'Inspection créée',
    inspectionInProgress: 'Inspection en cours',
    detectionFinished: 'Détection terminée',
    damageReviewOngoing: 'Examen des dommages en cours',
    completed: 'Terminé',
    chasedUpManually: 'Relancé manuellement'
  },

  reminder: {
    webhook: 'Activer le Webhook',
    enabled: 'Activé',
    user: 'Utilisateur',
    customer: 'Client',
    emailAddress: 'Adresse e-mail',
    userEmailAddress: 'Adresse e-mail de l\'utilisateur',
    smsNumber: 'Numéro SMS',
    userSmsNumber: 'Numéro SMS de l\'utilisateur',
    sms: 'SMS',
    email: 'E-mail',
    language: 'Langue',
    emailSubject: 'Objet de l\'e-mail',
    emailContent: 'Contenu de l\'e-mail',
    smsContent: 'Contenu du SMS',
    smsMaxLength: 'Contenu du SMS (160 caractères max)...',
    characterCount: 'Nombre de caractères : {{count}}/160'
  },

  variables: {
    customerName: 'Nom du client',
    customerEmail: 'E-mail du client',
    customerPhone: 'Téléphone du client',
    inspectionId: 'ID d\'inspection',
    inspectionLink: 'Lien d\'inspection',
    vehicleMake: 'Marque du véhicule',
    vehicleModel: 'Modèle du véhicule',
    licensePlate: 'Plaque d\'immatriculation',
    companyName: 'Nom de l\'entreprise',
    agentName: 'Nom de l\'agent',
    inspectionDate: 'Date d\'inspection',
    trackingUrl: 'URL de suivi'
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
    noRulesFound: 'Aucune règle de relance trouvée correspondant à vos critères.',
    ruleNotFound: 'Règle non trouvée',
    ruleNotFoundMessage: 'La règle de relance que vous recherchez n\'existe pas.'
  },

  filters: {
    allTypes: 'Tous les types',
    allCompanies: 'Toutes les entreprises',
    all: 'Tout'
  }
} as const;
