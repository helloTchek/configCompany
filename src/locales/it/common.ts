export const common = {
  actions: {
    create: 'Crea',
    edit: 'Modifica',
    delete: 'Elimina',
    save: 'Salva',
    cancel: 'Annulla',
    confirm: 'Conferma',
    back: 'Indietro',
    next: 'Avanti',
    previous: 'Precedente',
    search: 'Cerca',
    filter: 'Filtra',
    export: 'Esporta',
    import: 'Importa',
    upload: 'Carica',
    download: 'Scarica',
    duplicate: 'Duplica',
    view: 'Visualizza',
    close: 'Chiudi',
    refresh: 'Aggiorna',
    reset: 'Reimposta',
    clear: 'Pulisci',
    apply: 'Applica',
    remove: 'Rimuovi',
    add: 'Aggiungi',
    update: 'Aggiorna',
    submit: 'Invia',
    login: 'Accesso',
    logout: 'Disconnetti',
    loading: 'Caricamento...',
    retry: 'Riprova',
    select: 'Seleziona',
    clearFilters: 'Cancella tutti i filtri'
  },
  status: {
    active: 'Attivo',
    inactive: 'Inattivo',
    enabled: 'Abilitato',
    disabled: 'Disabilitato',
    pending: 'In sospeso',
    completed: 'Completato',
    failed: 'Fallito',
    success: 'Successo',
    error: 'Errore',
    warning: 'Avviso',
    info: 'Info',
    draft: 'Bozza',
    published: 'Pubblicato',
    archived: 'Archiviato'
  },
  validation: {
    required: 'Questo campo è obbligatorio',
    email: 'Inserisci un indirizzo e-mail valido',
    minLength: 'Deve contenere almeno {{min}} caratteri',
    maxLength: 'Non deve superare {{max}} caratteri',
    numeric: 'Deve essere un numero',
    positive: 'Deve essere un numero positivo',
    url: 'Inserisci un URL valido',
    phone: 'Inserisci un numero di telefono valido',
    password: 'La password deve contenere almeno 8 caratteri, inclusi maiuscole, minuscole e numeri'
  },
  messages: {
    noData: 'Nessun dato disponibile',
    noResults: 'Nessun risultato trovato',
    loadingError: 'Errore nel caricamento dei dati',
    saveSuccess: 'Salvataggio avvenuto con successo',
    saveError: 'Errore durante il salvataggio',
    deleteSuccess: 'Eliminazione avvenuta con successo',
    deleteError: 'Errore durante l\'eliminazione',
    deleteConfirm: 'Sei sicuro di voler eliminare questo elemento?',
    unsavedChanges: 'Ci sono modifiche non salvate. Sei sicuro di voler uscire?',
    sessionExpired: 'La tua sessione è scaduta. Effettua nuovamente l\'accesso.',
    accessDenied: 'Accesso negato. Non hai l\'autorizzazione per visualizzare questa pagina.',
    networkError: 'Errore di rete. Controlla la tua connessione e riprova.'
  },
  filters: {
    allTypes: 'Tutti i tipi',
    allCompanies: 'Tutte le aziende',
    allPriorities: 'Tutte le priorità'
  },
  fields: {
    actions: 'Azioni',
    level: 'Livello'
  },
  sections: {
    basicInformation: 'Informazioni di base',
    configuration: 'Configurazione'
  },
  navigation: {
    companies: 'Aziende',
    users: 'Utenti',
    workflows: 'Flussi di lavoro',
    costs: 'Matrici dei costi',
    sortingRules: 'Regole di ordinamento',
    chaseupRules: 'Regole di sollecito automatico',
    profile: 'Profilo',
    help: 'Aiuto',
    documentation: 'Documentazione'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Utente'
  },
  languages: {
    en: 'English',
    fr: 'Francese',
    de: 'Tedesco',
    it: 'Italiano',
    es: 'Spagnolo',
    nl: 'Olandese',
    sv: 'Svedese',
    no: 'Norvegese'
  }
} as const;
