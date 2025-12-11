export const chaseupRules = {
  title: 'Automatiserade Påminnelseregler',
  subtitle: 'Konfigurera automatiserade påminnelsemeddelanden för företag',
  create: 'Skapa Ny Regel',
  edit: 'Redigera Påminnelseregel',
  fields: {
    company: 'Företag',
    type: 'Typ',
    activationDate: 'Aktiveringsdatum',
    utcTime: 'UTC-tid',
    maxSendings: 'Max. Sändningar',
    firstDelay: 'Första Fördröjning',
    secondDelay: 'Andra Fördröjning',
    thirdDelay: 'Tredje Fördröjning',
    actions: 'Åtgärder'
  },
  types: {
    event: 'Händelse',
    anonymization: 'Anonymisering'
  },
  tooltips: {
    edit: 'Redigera',
    duplicate: 'Duplicera',
    delete: 'Ta bort'
  },
  labels: {
    filters: 'Filter',
    days: '{{count}} dagar',
    minutes: '{{count}} min',
    none: 'Ingen',
    targetCompany: 'Målföretag',
    note: 'Notering',
    showingRules: 'Visar {{shown}} av {{total}} regler'
  },
  placeholders: {
    search: 'Sök påminnelseregler...',
    searchCompany: 'Sök och välj ett företag...'
  },
  actions: {
    cancel: 'Avbryt',
    delete: 'Ta bort Regel',
    deleteRule: 'Ta bort Regel',
    duplicate: 'Duplicera Regel',
    duplicateRule: 'Duplicera Regel',
    clearFilters: 'Rensa Alla Filter'
  },
  modals: {
    duplicateTitle: 'Duplicera Påminnelseregel',
    duplicateMessage: 'Duplicera påminnelseregeln från {{company}} till ett företag',
    duplicateNote: 'Påminnelseregeln kommer att dupliceras till det valda företaget med alla inställningar, fördröjningar och meddelandemallar. Du kan välja samma företag för att skapa en kopia.',
    deleteTitle: 'Ta bort Påminnelseregel',
    deleteMessage: 'Är du säker på att du vill ta bort påminnelseregeln för {{company}}? Denna åtgärd kan inte ångras.'
  },
  messages: {
    loading: 'Laddar...',
    loadError: 'Fel vid laddning av påminnelseregler',
    createSuccess: 'Påminnelseregel skapad',
    updateSuccess: 'Påminnelseregel uppdaterad',
    deleteSuccess: 'Påminnelseregel borttagen',
    deleteError: 'Misslyckades att ta bort påminnelseregel',
    duplicateSuccess: 'Påminnelseregel duplicerad',
    duplicateError: 'Misslyckades att duplicera påminnelseregel',
    noRulesFound: 'Inga påminnelseregler hittades som matchar dina kriterier.'
  },
  filters: {
    allTypes: 'Alla Typer',
    allCompanies: 'Alla Företag',
    all: 'Alla'
  }
} as const;
