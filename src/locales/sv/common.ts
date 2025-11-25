export const common = {
  actions: {
    create: 'Skapa',
    edit: 'Redigera',
    delete: 'Ta bort',
    save: 'Spara',
    cancel: 'Avbryt',
    confirm: 'Bekräfta',
    back: 'Tillbaka',
    next: 'Nästa',
    previous: 'Föregående',
    search: 'Sök',
    filter: 'Filtrera',
    export: 'Exportera',
    import: 'Importera',
    upload: 'Ladda upp',
    download: 'Ladda ner',
    duplicate: 'Duplicera',
    view: 'Visa',
    close: 'Stäng',
    refresh: 'Uppdatera',
    reset: 'Återställ',
    clear: 'Rensa',
    apply: 'Tillämpa',
    remove: 'Ta bort',
    add: 'Lägg till',
    update: 'Uppdatera',
    submit: 'Skicka',
    login: 'Logga in',
    logout: 'Logga ut',
    loading: 'Läser in...',
    retry: 'Försök igen',
    select: 'Välj',
    clearFilters: 'Rensa alla filter'
  },
  status: {
    active: 'Aktiv',
    inactive: 'Inaktiv',
    enabled: 'Aktiverad',
    disabled: 'Inaktiverad',
    pending: 'Pågående',
    completed: 'Slutförd',
    failed: 'Misslyckad',
    success: 'Lyckad',
    error: 'Fel',
    warning: 'Varning',
    info: 'Info',
    draft: 'Utkast',
    published: 'Publicerad',
    archived: 'Arkiverad'
  },
  validation: {
    required: 'Detta fält är obligatoriskt',
    email: 'Ange en giltig e-postadress',
    minLength: 'Måste innehålla minst {{min}} tecken',
    maxLength: 'Får inte överstiga {{max}} tecken',
    numeric: 'Måste vara ett nummer',
    positive: 'Måste vara ett positivt nummer',
    url: 'Ange en giltig URL',
    phone: 'Ange ett giltigt telefonnummer',
    password: 'Lösenordet måste innehålla minst 8 tecken med versaler, gemener och siffror'
  },
  messages: {
    noData: 'Inga data tillgängliga',
    noResults: 'Inga resultat hittades',
    loadingError: 'Misslyckades med att läsa in data',
    saveSuccess: 'Sparad framgångsrikt',
    saveError: 'Misslyckades med att spara',
    deleteSuccess: 'Borttagen framgångsrikt',
    deleteError: 'Misslyckades med att ta bort',
    deleteConfirm: 'Är du säker på att du vill ta bort detta objekt?',
    unsavedChanges: 'Du har osparade ändringar. Vill du verkligen lämna sidan?',
    sessionExpired: 'Din session har gått ut. Vänligen logga in igen.',
    accessDenied: 'Åtkomst nekad. Du har inte behörighet att se denna sida.',
    networkError: 'Nätverksfel. Kontrollera din anslutning och försök igen.'
  },
  filters: {
    allTypes: 'Alla typer',
    allCompanies: 'Alla företag',
    allPriorities: 'Alla prioriteringar'
  },
  fields: {
    actions: 'Åtgärder',
    level: 'Nivå'
  },
  sections: {
    basicInformation: 'Grundläggande information',
    configuration: 'Konfiguration'
  },
  navigation: {
    companies: 'Företag',
    users: 'Användare',
    workflows: 'Arbetsflöden',
    costs: 'Kostnadsmatriser',
    sortingRules: 'Sorteringsregler',
    chaseupRules: 'Automatiserade påminnelse-regler',
    profile: 'Profil',
    help: 'Hjälp',
    documentation: 'Dokumentation'
  },
  roles: {
    superAdmin: 'Superadmin',
    admin: 'Admin',
    user: 'Användare'
  },
  languages: {
    en: 'English',
    fr: 'Franska',
    de: 'Tyska',
    it: 'Italienska',
    es: 'Spanska',
    nl: 'Nederländska',
    sv: 'Svenska',
    no: 'Norska'
  }
} as const;
