export const settings = {
  title: 'Impostazioni',
  subtitle: 'Configura le impostazioni e lo stile dell\'applicazione',
  sections: {
    styles: 'Stili',
    reportSettings: 'Impostazioni report',
    configModules: 'Moduli di configurazione'
  },
  fields: {
    styles: 'Configurazione stili',
    reportSettings: 'Configurazione impostazioni report',
    configModules: 'Configurazione moduli',
    urlBackground: 'Rimuovi URL sfondo',
    instantInspection: 'Mostra Avvio Ispezione Istantanea'
  },
  actions: {
    downloadJson: 'Scarica JSON',
    uploadJson: 'Carica JSON',
    resetToDefault: 'Ripristina valori predefiniti'
  },
  messages: {
    updateSuccess: 'Impostazioni aggiornate con successo',
    resetSuccess: 'Impostazioni ripristinate ai valori predefiniti',
    invalidJson: 'Formato JSON non valido',
    uploadSuccess: 'Configurazione caricata con successo'
  }
} as const;
