export const common = {
  actions: {
    create: 'Opprett',
    edit: 'Rediger',
    delete: 'Slett',
    save: 'Lagre',
    cancel: 'Avbryt',
    confirm: 'Bekreft',
    back: 'Tilbake',
    next: 'Neste',
    previous: 'Forrige',
    search: 'Søk',
    filter: 'Filtrer',
    export: 'Eksporter',
    import: 'Importer',
    upload: 'Last opp',
    download: 'Last ned',
    duplicate: 'Dupliser',
    view: 'Se',
    close: 'Lukk',
    refresh: 'Oppdater',
    reset: 'Tilbakestill',
    clear: 'Fjern',
    apply: 'Bruk',
    remove: 'Fjern',
    add: 'Legg til',
    update: 'Oppdater',
    submit: 'Send inn',
    login: 'Logg inn',
    logout: 'Logg ut',
    loading: 'Laster...',
    retry: 'Prøv igjen',
    select: 'Velg',
    clearFilters: 'Fjern alle filtre'
  },
  status: {
    active: 'Aktiv',
    inactive: 'Inaktiv',
    enabled: 'Aktivert',
    disabled: 'Deaktivert',
    pending: 'Venter',
    completed: 'Fullført',
    failed: 'Mislyktes',
    success: 'Suksess',
    error: 'Feil',
    warning: 'Advarsel',
    info: 'Info',
    draft: 'Utkast',
    published: 'Publisert',
    archived: 'Arkivert'
  },
  validation: {
    required: 'Dette feltet er påkrevd',
    email: 'Vennligst oppgi en gyldig e-postadresse',
    minLength: 'Må være minst {{min}} tegn',
    maxLength: 'Kan ikke overstige {{max}} tegn',
    numeric: 'Må være et tall',
    positive: 'Må være et positivt tall',
    url: 'Vennligst oppgi en gyldig URL',
    phone: 'Vennligst oppgi et gyldig telefonnummer',
    password: 'Passordet må være minst 8 tegn med store, små bokstaver og tall'
  },
  messages: {
    noData: 'Ingen tilgjengelige data',
    noResults: 'Ingen resultater funnet',
    loadingError: 'Feil ved lasting av data',
    saveSuccess: 'Lagret vellykket',
    saveError: 'Kunne ikke lagre',
    deleteSuccess: 'Slettet vellykket',
    deleteError: 'Kunne ikke slette',
    deleteConfirm: 'Er du sikker på at du vil slette dette elementet?',
    unsavedChanges: 'Du har ikke lagrede endringer. Er du sikker på at du vil forlate?',
    sessionExpired: 'Økten din har utløpt. Vennligst logg inn igjen.',
    accessDenied: 'Tilgang nektet. Du har ikke tillatelse til å se denne siden.',
    networkError: 'Nettverksfeil. Vennligst sjekk tilkoblingen og prøv igjen.'
  },
  filters: {
    allTypes: 'Alle typer',
    allCompanies: 'Alle selskaper',
    allPriorities: 'Alle prioriteringer'
  },
  fields: {
    actions: 'Handlinger',
    level: 'Nivå'
  },
  sections: {
    basicInformation: 'Grunnleggende informasjon',
    configuration: 'Konfigurasjon'
  },
  navigation: {
    companies: 'Selskaper',
    users: 'Brukere',
    workflows: 'Arbeidsflyter',
    costs: 'Kostnadsmatriser',
    sortingRules: 'Sortereregler',
    chaseupRules: 'Automatiserte oppfølgingsregler',
    profile: 'Profil',
    help: 'Hjelp',
    documentation: 'Dokumentasjon'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Bruker'
  },
  languages: {
    en: 'Engelsk',
    fr: 'Fransk',
    de: 'Tysk',
    it: 'Italiensk',
    es: 'Spansk',
    nl: 'Nederlandsk',
    sv: 'Svensk',
    no: 'Norsk'
  }
} as const;
