export const apiToken = {
  title: 'Jetons API',
  subtitle: 'Gérer les jetons API et les limites de requêtes',
  fields: {
    token: 'Jeton API',
    currentRequests: 'Requêtes Actuelles',
    maxRequests: 'Requêtes Maximales',
    expiryDate: 'Date d’Expiration',
    decisionTree: 'Configuration de l’Arbre de Décision',
    company: 'Entreprise'
  },
  actions: {
    regenerate: 'Régénérer le Jeton',
    resetRequests: 'Réinitialiser le Nombre de Requêtes',
    extendExpiry: 'Prolonger la Date d’Expiration'
  },
  messages: {
    regenerateConfirm: 'Êtes-vous sûr de vouloir régénérer ce jeton ? L’ancien jeton cessera immédiatement de fonctionner.',
    regenerateSuccess: 'Jeton régénéré avec succès',
    resetSuccess: 'Nombre de requêtes réinitialisé avec succès',
    extendSuccess: 'Date d’expiration prolongée avec succès'
  }
} as const;
