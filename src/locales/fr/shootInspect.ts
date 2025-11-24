export const shootInspect = {
  title: 'Configuration de l’Inspection Photo',
  subtitle: 'Configurer le workflow et les paramètres de prise de photos',
  fields: {
    name: 'Nom de la Configuration',
    description: 'Description',
    maxRetries: 'Nombre Maximum de Tentatives',
    qualityCheckEnabled: 'Vérification de Qualité Activée',
    photoAngles: 'Angles de Prise de Vue',
    allowedDamageTypes: 'Types de Dommages Autorisés'
  },
  angles: {
    front: 'Avant',
    back: 'Arrière',
    leftSide: 'Côté Gauche',
    rightSide: 'Côté Droit',
    interior: 'Intérieur',
    dashboard: 'Tableau de Bord'
  },
  damageTypes: {
    carBody: 'Carrosserie',
    interior: 'Intérieur',
    glazings: 'Vitrages',
    dashboard: 'Tableau de Bord',
    declaration: 'Déclaration',
    documents: 'Documents'
  },
  steps: {
    title: 'Étapes de l’Inspection',
    addStep: 'Ajouter une Étape',
    editStep: 'Modifier l’Étape',
    removeStep: 'Supprimer l’Étape',
    stepOrder: 'Étape {{order}}',
    stepTitle: 'Titre de l’Étape',
    stepDescription: 'Description de l’Étape',
    isOptional: 'Étape Optionnelle',
    showHelp: 'Afficher l’Aide',
    runDetection: 'Lancer la Détection',
    thumbnailUrl: 'URL de la Miniature',
    overlayUrl: 'URL de la Superposition'
  },
  messages: {
    createSuccess: 'Configuration d’inspection photo créée avec succès',
    updateSuccess: 'Configuration d’inspection photo mise à jour avec succès',
    deleteSuccess: 'Configuration d’inspection photo supprimée avec succès',
    stepAdded: 'Étape ajoutée avec succès',
    stepRemoved: 'Étape supprimée avec succès',
    invalidConfiguration: 'Format de configuration invalide'
  }
} as const;
