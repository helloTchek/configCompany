export const chaseupRules = {
  title: 'Règles de relance automatisées',
  subtitle: 'Gérer les règles de relance automatisées pour vos entreprises',
  create: 'Créer une règle de relance',
  edit: 'Modifier la règle de relance',
  fields: {
    company: 'Entreprise',
    type: 'Type',
    activationDate: 'Date d\'activation',
    utcTime: 'Heure UTC',
    maxSendings: 'Envois maximum',
    firstDelay: 'Premier délai',
    secondDelay: 'Deuxième délai',
    thirdDelay: 'Troisième délai',
  },
  types: {
    event: 'Événement',
    time: 'Temps'
  },
  actions: {
    duplicate: 'Dupliquer la règle',
    delete: 'Supprimer la règle'
  },
  messages: {
    createSuccess: 'Règle de relance créée avec succès',
    updateSuccess: 'Règle de relance mise à jour avec succès',
    deleteSuccess: 'Règle de relance supprimée avec succès',
    duplicateSuccess: 'Règle de relance dupliquée avec succès',
    noRulesFound: 'Aucune règle de relance trouvée correspondant à vos critères.'
  },
  filters: {
    allTypes: 'Tous les types',
    allCompanies: 'Toutes les entreprises'
  }
} as const;
