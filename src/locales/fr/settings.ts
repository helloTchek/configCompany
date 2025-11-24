export const settings = {
  title: 'Paramètres',
  subtitle: 'Configurer les paramètres et les styles de l\'application',
  sections: {
    styles: 'Styles',
    reportSettings: 'Paramètres de rapport',
    configModules: 'Modules de configuration'
  },
  fields: {
    styles: 'Configuration des styles',
    reportSettings: 'Configuration des paramètres de rapport',
    configModules: 'Configuration des modules',
    urlBackground: 'URL de suppression de l\'arrière-plan',
    instantInspection: 'Afficher le démarrage de l\'inspection instantanée'
  },
  actions: {
    downloadJson: 'Télécharger le JSON',
    uploadJson: 'Importer le JSON',
    resetToDefault: 'Réinitialiser par défaut'
  },
  messages: {
    updateSuccess: 'Paramètres mis à jour avec succès',
    resetSuccess: 'Paramètres réinitialisés aux valeurs par défaut',
    invalidJson: 'Format JSON invalide',
    uploadSuccess: 'Configuration importée avec succès'
  }
} as const;