export const settings = {
  title: 'Inställningar',
  subtitle: 'Konfigurera applikationsinställningar och stilar',
  sections: {
    styles: 'Stilar',
    reportSettings: 'Rapportinställningar',
    configModules: 'Konfigurationsmoduler'
  },
  fields: {
    styles: 'Stilkonfiguration',
    reportSettings: 'Konfiguration av rapportinställningar',
    configModules: 'Konfiguration av moduler',
    urlBackground: 'Ta bort bakgrunds-URL',
    instantInspection: 'Visa Starta Direktinspektion'
  },
  actions: {
    downloadJson: 'Ladda ner JSON',
    uploadJson: 'Ladda upp JSON',
    resetToDefault: 'Återställ till standard'
  },
  messages: {
    updateSuccess: 'Inställningar uppdaterade',
    resetSuccess: 'Inställningar återställda till standardvärden',
    invalidJson: 'Ogiltigt JSON-format',
    uploadSuccess: 'Konfiguration uppladdad'
  }
} as const;
