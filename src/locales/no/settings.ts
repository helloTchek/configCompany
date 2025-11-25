export const settings = {
  title: 'Innstillinger',
  subtitle: 'Konfigurer applikasjonsinnstillinger og stiler',
  sections: {
    styles: 'Stiler',
    reportSettings: 'Rapportinnstillinger',
    configModules: 'Konfigurasjonsmoduler'
  },
  fields: {
    styles: 'Stilkonfigurasjon',
    reportSettings: 'Rapportinnstillingskonfigurasjon',
    configModules: 'Konfigurasjonsmoduler konfigurasjon',
    urlBackground: 'Fjern bakgrunns-URL',
    instantInspection: 'Vis Start Direkte Inspeksjon'
  },
  actions: {
    downloadJson: 'Last ned JSON',
    uploadJson: 'Last opp JSON',
    resetToDefault: 'Tilbakestill til standard'
  },
  messages: {
    updateSuccess: 'Innstillinger oppdatert',
    resetSuccess: 'Innstillinger tilbakestilt til standardverdier',
    invalidJson: 'Ugyldig JSON-format',
    uploadSuccess: 'Konfigurasjon lastet opp'
  }
} as const;
