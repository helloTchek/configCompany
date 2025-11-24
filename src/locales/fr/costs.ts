export const costs = {
  title: 'Matrices de Coûts',
  subtitle: 'Gérer les coûts de réparation par types de pièces, emplacements et sévérités',
  create: 'Créer une Nouvelle Matrice',
  edit: 'Modifier la Matrice de Coûts',
  fields: {
    company: 'Entreprise',
    currency: 'Devise',
    taxRate: 'Taux de TVA (%)',
    partsCount: 'Nombre de Pièces',
    partType: 'Type de Pièce',
    location: 'Emplacement',
    severity: 'Sévérité',
    cost: 'Coût'
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
  actions: {
    addPart: 'Ajouter une Pièce',
    removePart: 'Supprimer la Pièce',
    importCsv: 'Importer un CSV',
    exportCsv: 'Exporter en CSV',
    bulkEdit: 'Modification en Masse'
  },
  messages: {
    createSuccess: 'Matrice de coûts créée avec succès',
    updateSuccess: 'Matrice de coûts mise à jour avec succès',
    deleteSuccess: 'Matrice de coûts supprimée avec succès',
    importSuccess: 'CSV importé avec succès',
    exportSuccess: 'CSV exporté avec succès',
    invalidCsv: 'Format CSV invalide'
  }
} as const;
