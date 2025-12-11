export const chaseupRules = {
  title: 'Geautomatiseerde Herinneringsregels',
  subtitle: 'Configureer geautomatiseerde herinneringsberichten voor bedrijven',
  create: 'Nieuwe Regel Aanmaken',
  edit: 'Herinneringsregel Bewerken',
  fields: {
    company: 'Bedrijf',
    type: 'Type',
    activationDate: 'Activeringsdatum',
    utcTime: 'UTC-tijd',
    maxSendings: 'Max. Verzendingen',
    firstDelay: 'Eerste Vertraging',
    secondDelay: 'Tweede Vertraging',
    thirdDelay: 'Derde Vertraging',
    actions: 'Acties'
  },
  types: {
    event: 'Gebeurtenis',
    anonymization: 'Anonimisering'
  },
  tooltips: {
    edit: 'Bewerken',
    duplicate: 'Dupliceren',
    delete: 'Verwijderen'
  },
  labels: {
    filters: 'Filters',
    days: '{{count}} dagen',
    minutes: '{{count}} min',
    none: 'Geen',
    targetCompany: 'Doelbedrijf',
    note: 'Opmerking',
    showingRules: 'Weergave van {{shown}} van {{total}} regels'
  },
  placeholders: {
    search: 'Zoek herinneringsregels...',
    searchCompany: 'Zoek en selecteer een bedrijf...'
  },
  actions: {
    cancel: 'Annuleren',
    delete: 'Regel Verwijderen',
    deleteRule: 'Regel Verwijderen',
    duplicate: 'Regel Dupliceren',
    duplicateRule: 'Regel Dupliceren',
    clearFilters: 'Alle Filters Wissen'
  },
  modals: {
    duplicateTitle: 'Herinneringsregel Dupliceren',
    duplicateMessage: 'Dupliceer de herinneringsregel van {{company}} naar een bedrijf',
    duplicateNote: 'De herinneringsregel wordt gedupliceerd naar het geselecteerde bedrijf met alle instellingen, vertragingen en berichtsjablonen. U kunt hetzelfde bedrijf selecteren om een kopie te maken.',
    deleteTitle: 'Herinneringsregel Verwijderen',
    deleteMessage: 'Weet u zeker dat u de herinneringsregel voor {{company}} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'
  },
  messages: {
    loading: 'Laden...',
    loadError: 'Fout bij het laden van herinneringsregels',
    createSuccess: 'Herinneringsregel succesvol aangemaakt',
    updateSuccess: 'Herinneringsregel succesvol bijgewerkt',
    deleteSuccess: 'Herinneringsregel succesvol verwijderd',
    deleteError: 'Fout bij het verwijderen van de herinneringsregel',
    duplicateSuccess: 'Herinneringsregel succesvol gedupliceerd',
    duplicateError: 'Fout bij het dupliceren van de herinneringsregel',
    noRulesFound: 'Geen herinneringsregels gevonden die voldoen aan uw criteria.'
  },
  filters: {
    allTypes: 'Alle Types',
    allCompanies: 'Alle Bedrijven',
    all: 'Alles'
  }
} as const;
