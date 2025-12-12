export const company = {
  title: 'Entreprises',
  subtitle: 'Gérer les entreprises, leurs paramètres et configurations',
  pageTitle: 'Gestion des entreprises',
  create: 'Créer une nouvelle entreprise',
  edit: 'Modifier l’entreprise',
  duplicate: 'Dupliquer l’entreprise',
  archive: 'Archiver l’entreprise',
  unarchive: 'Désarchiver l’entreprise',
  archived: 'ARCHIVÉE',
  fields: {
    name: 'Nom de l’entreprise',
    identifier: 'Identifiant',
    companyId: 'ID de l’entreprise',
    apiToken: 'Token API',
    currentRequests: 'Requêtes en cours',
    maxRequests: 'Requêtes max',
    createdDate: 'Date de création',
    parentCompany: 'Entreprise parente',
    children: 'Filiales',
    chaseupRules: 'Règles de relance',
    actions: 'Actions',
    contractType: 'Type de contrat',
    companyHierarchy: 'Hiérarchie de l’entreprise',
    companyStatus: 'Statut de l’entreprise',
    businessSector: 'Secteur d’activité',
    logoUrl: 'URL du logo',
    retentionPeriod: 'Durée de conservation (mois)',
    disableFastTrack: 'Désactiver Fast Track',
    enableMileageCapture: 'Activer la capture du kilométrage',
    enableBlurDetection: 'Flouter les plaques',
    enableVinScanning: 'Activer la lecture VIN',
    enableBrandModelDetection: 'Activer la détection marque & modèle',
    iaValidation: 'Validation IA (modèle Joelle)',
    humanValidationEnabled: 'Validation humaine activée',
    validationPriority: 'Priorité de validation (0-5)',
    maxValidationDelay: 'Délai max de validation (minutes)',
    minTaskProcessingDuration: 'Durée min de traitement des tâches (minutes)',
    showStartInstantInspection: 'Afficher le démarrage inspection instantanée',
    showSendInspectionLink: 'Afficher le lien d’inspection',
    childrenCount: 'Nombre de filiales',
    newCompanyName: 'Nom de la nouvelle entreprise',
    reportSettings: 'Paramètres du rapport',
    configModules: 'Paramètres des modules',
    hierarchy: 'Hiérarchie',
    senderName: 'Nom de l’expéditeur (pour tous les événements)',
    webhookUrl: 'URL Webhook',
    inheritanceOptions: 'Options d’héritage'
  },
  placeholders: {
    search: 'Rechercher par nom, identifiant, ID entreprise ou token API...',
    searchCompanies: 'Rechercher des entreprises...',
    enterNewCompanyName: 'Saisir le nom de la nouvelle entreprise',
    enterSenderName: 'Saisir le nom de l’expéditeur',
    webhookUrlPlaceholder: 'https://exemple.com/webhook',
    reportSettingsJson: 'Configuration JSON des paramètres du rapport...',
    configModulesJson: 'Configuration JSON des modules...'
  },
  contractTypes: {
    allTypes: 'Tous les types',
    client: 'Client',
    prospect: 'Prospect',
    test: 'Test',
    demo: 'Démo'
  },
  businessSectors: {
    insurance: 'Assurance',
    leasing: 'Leasing',
    rental: 'Location',
    fleetManagement: 'Gestion de flotte',
    automotive: 'Automobile'
  },
  hierarchy: {
    allCompanies: 'Toutes les entreprises',
    parentCompanies: 'Entreprises parentes',
    childCompanies: 'Filiales',
    parentCompanyOptional: 'Entreprise parente (optionnel)',
    none: 'Aucune'
  },
  status: {
    activeCompanies: 'Entreprises actives',
    archivedCompanies: 'Entreprises archivées',
    allCompanies: 'Toutes les entreprises',
    archivedCount: '{{count}} archivées'
  },
  chaseup: {
    active: '✓ Actif',
    create: '+ Créer'
  },
  tabs: {
    general: 'Paramètres généraux',
    hierarchy: 'Hiérarchie',
    journeySettings: 'Paramètres du parcours d’inspection',
    savedJourneys: 'Parcours enregistrés'
  },
  sections: {
    generalSettings: 'Paramètres généraux',
    hubConfiguration: 'Configuration du hub',
    apiConfiguration: 'Configuration API',
    validation: 'Validation',
    eventsWebhooks: 'Événements & Webhooks',
    companyHierarchy: 'Hiérarchie de l’entreprise',
    childCompanies: 'Filiales',
    hierarchyActions: 'Actions sur la hiérarchie'
  },
  filters: {
    filters: 'Filtres',
    clearAllFilters: 'Réinitialiser tous les filtres',
    showingCompanies: 'Affichage de {{filtered}} sur {{total}} entreprises'
  },
  pagination: {
    previous: 'Précédent',
    next: 'Suivant',
    showing: 'Affichage',
    to: 'à',
    of: 'sur',
    companies: 'entreprises'
  },
  banners: {
    viewingArchived: 'Consultation des entreprises archivées',
    archivedDescription: 'Vous consultez actuellement des entreprises archivées. Leurs tokens API sont désactivés. Cliquez sur archiver pour les réactiver.',
    chaseupRulesTitle: 'Règles de relance automatisées',
    chaseupRulesDescription: 'N’oubliez pas de configurer les règles de relance automatisées pour vos entreprises afin d’assurer le suivi des inspections en attente.',
    manageChaseupRules: 'Gérer les règles de relance'
  },
  modals: {
    archive: {
      title: 'Archiver l’entreprise',
      unarchiveTitle: 'Désarchiver l’entreprise',
      archiveQuestion: 'Êtes-vous sûr de vouloir archiver <strong>{{name}}</strong> ?',
      archiveDescription: 'Cela désactivera le token API et tous les utilisateurs de cette entreprise.',
      unarchiveQuestion: 'Êtes-vous sûr de vouloir désarchiver <strong>{{name}}</strong> ?',
      unarchiveDescription: 'Cela réactivera le token API et rendra l’entreprise active.',
      noteArchive: '<strong>Note :</strong> Les entreprises archivées peuvent être restaurées via le filtre "Afficher les entreprises archivées".',
      noteUnarchive: '<strong>Note :</strong> La désarchivage restaure l’accès à l’entreprise et à son token API.',
      confirmArchive: 'Archiver l’entreprise',
      confirmUnarchive: 'Désarchiver l’entreprise'
    },
    duplicate: {
      title: 'Dupliquer l’entreprise',
      chooseOptions: 'Choisissez ce qui doit être copié depuis l’entreprise source :',
      duplicateJourneys: 'Dupliquer les parcours d’inspection',
      duplicateCostSettings: 'Dupliquer les paramètres de coûts',
      duplicateSortingRules: 'Dupliquer les règles de tri',
      duplicateWebhookEvents: 'Dupliquer les Webhooks & événements',
      editFields: 'Modifier les champs',
      senderNameRequired: 'Le nom de l’expéditeur est requis',
      webhookOptional: 'optionnel',
      warningTitle: 'À retenir :',
      warningMessage: 'Vous devrez créer des utilisateurs pour la nouvelle entreprise après duplication.',
      detectionSettings: 'Paramètres de détection, API & validation',
      duplicateDetection: 'Dupliquer la configuration du modèle de détection',
      duplicateApi: 'Dupliquer les paramètres API',
      duplicateValidation: 'Dupliquer les paramètres de validation',
      companiesAvailable: '{{count}} entreprises disponibles',
      filtered: 'filtrées',
      showingAll: 'toutes affichées',
      createCompany: 'Créer l’entreprise'
    },
    cancel: 'Annuler'
  },
  validation: {
    companyNameRequired: 'Le nom de l’entreprise est requis',
    senderNameRequired: 'Le nom de l’expéditeur est requis',
    validUrlRequired: 'Veuillez entrer une URL valide'
  },
  messages: {
    createSuccess: 'Entreprise créée avec succès',
    updateSuccess: 'Entreprise mise à jour avec succès',
    deleteSuccess: 'Entreprise supprimée avec succès',
    duplicateSuccess: 'Entreprise dupliquée avec succès',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer {{name}} ? Cette action est irréversible.',
    noChildCompanies: 'Cette entreprise n’a pas de filiales.',
    duplicateWarning: 'À retenir : Vous devrez créer des utilisateurs pour la nouvelle entreprise après duplication.',
    noCompaniesFound: 'Aucune entreprise ne correspond à vos critères.',
    failedToLoadCompanyData: 'Échec du chargement des données de l’entreprise'
  },
  actions: {
    edit: 'Modifier',
    duplicate: 'Dupliquer',
    archive: 'Archiver',
    unarchive: 'Désarchiver',
    archiveTitle: 'Archiver l’entreprise',
    unarchiveTitle: 'Désarchiver l’entreprise'
  },
  createForm: {
    pageTitle: 'Créer une nouvelle entreprise',
    backToCompanies: 'Retour aux entreprises',
    createButton: 'Créer l’entreprise',
    cancel: 'Annuler',
    tabs: {
      general: 'Paramètres généraux',
      eventsWebhooks: 'Événements & Webhooks',
      hierarchy: 'Hiérarchie'
    },
    fields: {
      companyName: 'Nom de l’entreprise',
      companyCode: 'Code de l’entreprise',
      logoUrl: 'URL du logo',
      retentionPeriod: 'Durée de conservation (mois)',
      maxApiRequests: 'Nombre max de requêtes API',
      expirationDate: 'Date d’expiration',
      styles: 'Styles',
      reportSettings: 'Paramètres du rapport',
      configModules: 'Modules de configuration',
      senderName: 'Nom de l’expéditeur (pour tous les événements)',
      senderEmail: 'Email de l’expéditeur (pour tous les événements)',
      webhookUrl: 'URL Webhook',
      parentCompany: 'Entreprise parente (optionnel)',
      emailAddress: 'Adresse email',
      agentEmailAddress: 'Email de l’agent',
      smsNumber: 'Numéro SMS',
      agentSmsNumber: 'Numéro SMS de l’agent',
      emailSubject: 'Objet du mail',
      emailContent: 'Contenu du mail',
      smsContent: 'Contenu du SMS',
      language: 'Langue :'
    },
    placeholders: {
      companyName: 'Saisir le nom de l’entreprise',
      companyCode: 'Sera généré automatiquement',
      logoUrl: 'https://exemple.com/logo.png',
      senderName: 'Nom de votre entreprise',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://votre-domaine.com/webhook',
      searchCompanies: 'Rechercher des entreprises...',
      emailAddress: 'destinataire@example.com',
      agentEmailAddress: 'agent@example.com',
      smsNumber: '+33612345678',
      emailSubject: 'Objet du mail',
      emailContent: 'Contenu du mail...',
      smsContent: 'Contenu du SMS (160 caractères max)...',
      noneRootCompany: 'Aucune - Ce sera une entreprise racine'
    },
    helperText: {
      companyCode: 'Généré à partir de l’ObjectID',
      fastTrackTooltip: 'Désactive la fonctionnalité Fast Track pour cette entreprise',
      parentCompany: 'Sélectionnez une entreprise parente pour créer une structure hiérarchique',
      availableVariables: 'Sélectionnez un champ de modèle ci-dessus pour voir les variables disponibles',
      characterCount: 'Nombre de caractères : {{count}}/160',
      companiesAvailable: '{{total}} entreprises disponibles · {{shown}} affichées',
      selectedParent: 'Parent sélectionné : {{name}}'
    },
    sections: {
      generalSettings: 'Paramètres généraux',
      apiConfiguration: 'Configuration API',
      hubConfiguration: 'Configuration du hub',
      validation: 'Validation',
      globalSettings: 'Paramètres globaux',
      availableVariables: 'Variables disponibles',
      availableVariablesSticky: '📋 Variables disponibles',
      eventsConfiguration: 'Configuration des événements',
      companyHierarchy: 'Hiérarchie de l’entreprise'
    },
    checkboxes: {
      disableFastTrack: 'Désactiver Fast Track',
      enableMileageCapture: 'Activer la capture du kilométrage',
      enableBlurDetection: 'Activer le floutage',
      enableVinScanning: 'Activer la lecture VIN',
      enableBrandModelDetection: 'Activer la détection marque & modèle',
      enableInteriorDamageDetection: 'Activer la détection des dommages intérieurs',
      enableDashboardWarningLights: 'Activer la détection des voyants tableau de bord',
      showStartInstantInspection: 'Afficher le démarrage inspection instantanée',
      showSendInspectionLink: 'Afficher le lien d’inspection',
      iaValidation: 'Validation IA (modèle Joelle)',
      enabled: 'Activé',
      sms: 'SMS',
      email: 'Email',
      enableWebhook: 'Activer Webhook'
    },
    buttons: {
      uploadLogo: 'Téléverser le logo',
      uploadJson: 'Téléverser JSON',
      clickToInsert: 'Cliquer pour insérer'
    },
    addressees: {
      user: 'Utilisateur',
      customer: 'Client',
      emailAddress: 'Adresse email',
      agent: 'Agent'
    },
    events: {
      selfInspectionCreation: 'Création d’auto-inspection',
      manualChaseUp: 'Message de relance manuelle',
      inspectionFinished: 'Message inspection terminée',
      damageReviewFinished: 'Message revue des dommages terminée',
      shareUpdatedReport: 'Message partage du rapport mis à jour'
    },
    languages: {
      en: 'Anglais',
      fr: 'Français',
      de: 'Allemand',
      it: 'Italien',
      es: 'Espagnol',
      nl: 'Néerlandais',
      sv: 'Suédois',
      no: 'Norvégien'
    },
    loading: {
      companies: 'Chargement des entreprises...'
    },
    messages: {
      noCompaniesFound: 'Aucune entreprise trouvée',
      invalidJson: 'JSON invalide dans styles, paramètres du rapport ou modules de configuration',
      createFailed: 'Échec de la création de l’entreprise : {{error}}'
    },
    validation: {
      companyNameRequired: 'Le nom de l’entreprise est requis',
      logoUrlRequired: 'L’URL du logo est requise',
      validUrlRequired: 'Veuillez entrer une URL valide',
      maxApiRequestsRequired: 'Le nombre max de requêtes API doit être supérieur à 0',
      senderNameRequired: 'Le nom de l’expéditeur est requis'
    }
  },
  editForm: {
    pageTitle: 'Modifier l’entreprise',
    pageTitleWithName: 'Modifier l’entreprise : {{name}}',
    backToCompanies: 'Retour aux entreprises',
    saveButton: 'Enregistrer les modifications',
    cancel: 'Annuler',
    loading: {
      title: 'Modification de l’entreprise',
      message: 'Chargement des données de l’entreprise...'
    },
    banners: {
      archived: {
        title: 'Cette entreprise est archivée',
        description: 'Cette entreprise est actuellement archivée. Son token API est désactivé et les utilisateurs ne peuvent pas y accéder. Vous pouvez la désarchiver depuis la liste des entreprises.'
      },
      chaseupActive: {
        title: 'Règles de relance actives',
        description: 'Cette entreprise a {{count}} règle(s) de relance automatisée(s) configurée(s) pour un suivi rapide.'
      },
      chaseupInactive: {
        title: 'Aucune règle de relance configurée',
        description: 'Envisagez de configurer des règles de relance automatisées pour assurer le suivi des inspections en attente.'
      }
    },
    buttons: {
      viewRules: 'Voir les règles',
      createRules: 'Créer des règles',
      addNewRule: 'Ajouter une nouvelle règle'
    },
    helperText: {
      fastTrackTooltip: 'Si coché, les inspections apparaîtront comme terminées dès réception',
      parentCompanyNote: 'Note : Vous ne pouvez pas sélectionner cette entreprise comme sa propre parente',
      configured: '✓ {{count}} configuré',
      hasContent: '✓ Contenu présent'
    },
    messages: {
      updateSuccess: 'Entreprise mise à jour avec succès',
      updateFailed: 'Échec de la mise à jour de l’entreprise : {{error}}',
      loadFailed: 'Échec du chargement de l’entreprise : {{error}}'
    }
  }
} as const;
