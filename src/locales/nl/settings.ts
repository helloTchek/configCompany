export const settings = {
  title: 'Instellingen',
  subtitle: 'Configureer applicatie-instellingen en stijlen',
  sections: {
    styles: 'Stijlen',
    reportSettings: 'Rapportinstellingen',
    configModules: 'Configuratiemodules'
  },
  fields: {
    styles: 'Stijlconfiguratie',
    reportSettings: 'Rapportinstellingen configuratie',
    configModules: 'Configuratiemodules configuratie',
    urlBackground: 'Achtergrond-URL verwijderen',
    instantInspection: 'Toon Start Directe Inspectie'
  },
  actions: {
    downloadJson: 'Download JSON',
    uploadJson: 'Upload JSON',
    resetToDefault: 'Herstel naar standaard'
  },
  messages: {
    updateSuccess: 'Instellingen succesvol bijgewerkt',
    resetSuccess: 'Instellingen hersteld naar standaardwaarden',
    invalidJson: 'Ongeldig JSON-formaat',
    uploadSuccess: 'Configuratie succesvol geüpload'
  }
} as const;