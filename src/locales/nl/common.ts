export const common = {
  actions: {
    create: 'Aanmaken',
    edit: 'Bewerken',
    delete: 'Verwijderen',
    save: 'Opslaan',
    cancel: 'Annuleren',
    confirm: 'Bevestigen',
    back: 'Terug',
    next: 'Volgende',
    previous: 'Vorige',
    search: 'Zoeken',
    filter: 'Filteren',
    export: 'Exporteren',
    import: 'Importeren',
    upload: 'Uploaden',
    download: 'Downloaden',
    duplicate: 'Dupliceren',
    view: 'Bekijken',
    close: 'Sluiten',
    refresh: 'Vernieuwen',
    reset: 'Resetten',
    clear: 'Wissen',
    apply: 'Toepassen',
    remove: 'Verwijderen',
    add: 'Toevoegen',
    update: 'Bijwerken',
    submit: 'Verzenden',
    login: 'Inloggen',
    logout: 'Uitloggen',
    loading: 'Laden...',
    retry: 'Opnieuw proberen',
    select: 'Selecteren',
    clearFilters: 'Alle Filters Wissen'
  },
  status: {
    active: 'Actief',
    inactive: 'Inactief',
    enabled: 'Ingeschakeld',
    disabled: 'Uitgeschakeld',
    pending: 'In behandeling',
    completed: 'Voltooid',
    failed: 'Mislukt',
    success: 'Succes',
    error: 'Fout',
    warning: 'Waarschuwing',
    info: 'Info',
    draft: 'Concept',
    published: 'Gepubliceerd',
    archived: 'Gearchiveerd'
  },
  validation: {
    required: 'Dit veld is verplicht',
    email: 'Voer een geldig e-mailadres in',
    minLength: 'Moet minimaal {{min}} karakters bevatten',
    maxLength: 'Mag maximaal {{max}} karakters bevatten',
    numeric: 'Moet een nummer zijn',
    positive: 'Moet een positief nummer zijn',
    url: 'Voer een geldige URL in',
    phone: 'Voer een geldig telefoonnummer in',
    password: 'Wachtwoord moet minimaal 8 karakters bevatten met hoofdletter, kleine letter en cijfer'
  },
  messages: {
    noData: 'Geen gegevens beschikbaar',
    noResults: 'Geen resultaten gevonden',
    loadingError: 'Laden van gegevens mislukt',
    saveSuccess: 'Succesvol opgeslagen',
    saveError: 'Opslaan mislukt',
    deleteSuccess: 'Succesvol verwijderd',
    deleteError: 'Verwijderen mislukt',
    deleteConfirm: 'Weet je zeker dat je dit item wilt verwijderen?',
    unsavedChanges: 'Je hebt niet-opgeslagen wijzigingen. Weet je zeker dat je wilt vertrekken?',
    sessionExpired: 'Je sessie is verlopen. Log opnieuw in.',
    accessDenied: 'Toegang geweigerd. Je hebt geen toestemming om deze pagina te bekijken.',
    networkError: 'Netwerkfout. Controleer je verbinding en probeer opnieuw.',
    showing: 'Toont',
    of: 'van'
  },
  filters: {
    allTypes: 'Alle Types',
    allCompanies: 'Alle Bedrijven',
    allPriorities: 'Alle Prioriteiten'
  },
  fields: {
    actions: 'Acties',
    level: 'Niveau',
    email: 'E-mail',
    password: 'Wachtwoord'
  },
  sections: {
    basicInformation: 'Basisinformatie',
    configuration: 'Configuratie'
  },
  navigation: {
    companies: 'Bedrijven',
    users: 'Gebruikers',
    workflows: 'Workflows',
    costs: 'Kostenmatrices',
    sortingRules: 'Sorteerregels',
    chaseupRules: 'Geautomatiseerde Herinneringsregels',
    dashboard: 'Dashboard'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Gebruiker'
  },
  languages: {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    es: 'Español',
    nl: 'Nederlands',
    sv: 'Svenska',
    no: 'Norsk'
  }
} as const;