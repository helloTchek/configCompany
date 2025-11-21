export const settings = {
  title: 'Einstellungen',
  subtitle: 'Anwendungseinstellungen und Stile konfigurieren',
  sections: {
    styles: 'Stile',
    reportSettings: 'Berichteinstellungen',
    configModules: 'Konfigurationsmodule'
  },
  fields: {
    styles: 'Stilkonfiguration',
    reportSettings: 'Berichteinstellungen konfigurieren',
    configModules: 'Konfigurationsmodule konfigurieren',
    urlBackground: 'Hintergrund-URL entfernen',
    instantInspection: 'Start der Sofortinspektion anzeigen'
  },
  actions: {
    downloadJson: 'JSON herunterladen',
    uploadJson: 'JSON hochladen',
    resetToDefault: 'Auf Standard zurücksetzen'
  },
  messages: {
    updateSuccess: 'Einstellungen erfolgreich aktualisiert',
    resetSuccess: 'Einstellungen auf Standardwerte zurückgesetzt',
    invalidJson: 'Ungültiges JSON-Format',
    uploadSuccess: 'Konfiguration erfolgreich hochgeladen'
  }
} as const;
