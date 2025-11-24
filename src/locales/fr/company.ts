export const company = {
  title: 'Entreprises',
  subtitle: 'Gérer les entreprises, leurs paramètres et configurations',
  create: 'Créer une Nouvelle Entreprise',
  edit: 'Modifier l’Entreprise',
  duplicate: 'Dupliquer l’Entreprise',
  fields: {
    name: 'Nom de l’Entreprise',
    identifier: 'Identifiant de l’Entreprise',
    contractType: 'Type de Contrat',
    businessSector: 'Secteur d’Activité',
    logoUrl: 'URL du Logo',
    retentionPeriod: 'Période de Conservation (mois)',
    disableFastTrack: 'Désactiver le Fast Track',
    enableMileageCapture: 'Activer la Saisie du Kilométrage',
    enableBlurDetection: 'Flouter les Plaques d’Immatriculation',
    enableVinScanning: 'Activer le Scan du VIN',
    enableBrandModelDetection: 'Activer la Détection Marque & Modèle',
    iaValidation: 'Validation IA (modèle Joelle)',
    humanValidationEnabled: 'Validation Humaine Activée',
    validationPriority: 'Priorité de Validation (0-5)',
    maxValidationDelay: 'Délai Maximum de Validation (minutes)',
    minTaskProcessingDuration: 'Durée Minimum de Traitement (minutes)',
    showStartInstantInspection: 'Afficher "Démarrer Inspection Instantanée"',
    showSendInspectionLink: 'Afficher "Envoyer le Lien d’Inspection"',
    parentCompany: 'Entreprise Parente',
    childrenCount: 'Nombre d’Entreprises Enfants'
  },
  contractTypes: {
    client: 'Client',
    prospect: 'Prospect',
    test: 'Test',
    demo: 'Démo'
  },
  businessSectors: {
    insurance: 'Assurance',
    leasing: 'Leasing',
    rental: 'Location',
    fleetManagement: 'Gestion de Flotte',
    automotive: 'Automobile'
  },
  tabs: {
    general: 'Paramètres Généraux',
    hierarchy: 'Hiérarchie',
    journeySettings: 'Paramètres du Parcours d’Inspection',
    savedJourneys: 'Parcours Enregistrés'
  },
  sections: {
    generalSettings: 'Paramètres Généraux',
    hubConfiguration: 'Configuration du Hub',
    apiConfiguration: 'Configuration API',
    validation: 'Validation',
    eventsWebhooks: 'Événements & Webhooks',
    companyHierarchy: 'Hiérarchie de l’Entreprise',
    childCompanies: 'Entreprises Enfants',
    hierarchyActions: 'Actions de Hiérarchie'
  },
  messages: {
    createSuccess: 'Entreprise créée avec succès',
    updateSuccess: 'Entreprise mise à jour avec succès',
    deleteSuccess: 'Entreprise supprimée avec succès',
    duplicateSuccess: 'Entreprise dupliquée avec succès',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer {{name}} ? Cette action est irréversible.',
    noChildCompanies: 'Cette entreprise n’a aucune entreprise enfant.',
    duplicateWarning: 'Note : Vous devrez créer des utilisateurs pour la nouvelle entreprise après duplication.'
  }
} as const;
