export const costs = {
  title: 'Matrices de Coûts',
  subtitle: 'Gérer les matrices de coûts pour les estimations de réparation automobile',
  create: 'Créer une Nouvelle Matrice',
  createTitle: 'Créer une Matrice de Coûts',
  edit: 'Modifier la Matrice de Coûts',
  fields: {
    company: 'Entreprise',
    currency: 'Devise',
    taxRate: 'Taux de TVA',
    partsCount: 'Nombre de Pièces',
    partType: 'Type de Pièce',
    location: 'Emplacement',
    severity: 'Sévérité',
    cost: 'Coût',
    matrix: 'Matrice',
    currencyAndTax: 'Devise & TVA',
    status: 'Statut',
    lastUpdated: 'Dernière Mise à Jour',
    actions: 'Actions'
  },
  status: {
    active: 'Actif',
    inactive: 'Inactif'
  },
  severities: {
    minor: 'Mineure',
    moderate: 'Modérée',
    major: 'Importante',
    severe: 'Sévère'
  },
  locations: {
    front: 'Avant',
    rear: 'Arrière',
    left: 'Gauche',
    right: 'Droite',
    roof: 'Toit',
    interior: 'Intérieur'
  },
  tooltips: {
    view: 'Voir',
    edit: 'Modifier',
    duplicate: 'Dupliquer',
    delete: 'Supprimer'
  },
  labels: {
    costMatrices: 'Matrices de Coûts',
    manageMatrices: 'Sélectionner et gérer vos matrices de coûts de réparation',
    noMatrices: 'Aucune matrice de coûts trouvée',
    tryAdjustingSearch: 'Essayez d\'ajuster votre recherche',
    createToStart: 'Créer une nouvelle matrice de coûts pour commencer',
    matrixConfig: 'Configuration de matrice de coûts',
    tax: 'TVA',
    unknown: 'Inconnu',
    unnamed: 'Sans nom',
    notAvailable: 'N/A',
    thisCompany: 'cette compagnie',
    showing: 'Affichage de {{from}} à {{to}} sur {{total}} matrices de coûts',
    totalEntries: 'Entrées Totales',
    validated: 'Validé',
    created: 'Créé',
    lastUpdated: 'Dernière Mise à Jour',
    newMatrixName: 'Nom de la nouvelle matrice',
    copy: '(Copie)',
    unknownError: 'Erreur inconnue'
  },
  placeholders: {
    searchMatrices: 'Rechercher des matrices de coûts...',
    duplicatedMatrixName: 'Nom de la matrice dupliquée'
  },
  actions: {
    addPart: 'Ajouter une Pièce',
    removePart: 'Supprimer la Pièce',
    importCsv: 'Importer un CSV',
    exportCsv: 'Exporter en CSV',
    bulkEdit: 'Modification en Masse',
    downloadTemplate: 'Télécharger le Modèle',
    createMatrix: 'Créer une Matrice',
    previous: 'Précédent',
    next: 'Suivant',
    cancel: 'Annuler',
    delete: 'Supprimer',
    duplicate: 'Dupliquer',
    close: 'Fermer',
    editMatrix: 'Modifier la Matrice',
    confirmDelete: 'Oui, supprimer',
    deleting: 'Suppression...',
    duplicating: 'Duplication...'
  },
  modals: {
    editTitle: 'Modifier la Matrice - {{name}}',
    deleteTitle: 'Confirmer la Suppression',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette matrice ?',
    deleteMessage: 'Vous êtes sur le point de supprimer la matrice de coûts "{{name}}" pour {{company}}.',
    deleteWarning: 'Cette action est irréversible. Tous les paramètres de coûts associés seront également supprimés définitivement.',
    viewTitle: 'Détails de la Matrice de Coûts',
    duplicateTitle: 'Dupliquer la Matrice de Coûts',
    duplicateHeading: 'Dupliquer "{{name}}"',
    duplicateMessage: 'Une copie complète de cette matrice de coûts sera créée avec tous ses paramètres associés.'
  },
  messages: {
    loading: 'Chargement des matrices de coûts...',
    loadError: 'Erreur lors du chargement des matrices de coûts',
    createSuccess: 'Matrice de coûts créée avec succès',
    updateSuccess: 'Matrice de coûts mise à jour avec succès',
    deleteSuccess: 'Matrice de coûts supprimée avec succès',
    deleteError: 'Échec de la suppression : {{error}}',
    duplicateSuccess: 'Matrice de coûts "{{name}}" dupliquée avec succès',
    duplicateError: 'Échec de la duplication : {{error}}',
    importSuccess: 'CSV importé avec succès',
    exportSuccess: 'CSV exporté avec succès',
    invalidCsv: 'Format CSV invalide'
  }
} as const;
