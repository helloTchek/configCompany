export const chaseupRules = {
  title: 'Regole di Sollecito Automatizzate',
  subtitle: 'Configura regole di messaggi di sollecito automatizzati per le aziende',
  create: 'Crea Nuova Regola',
  edit: 'Modifica Regola di Sollecito',
  createTitle: 'Crea Regola di Sollecito',
  editTitle: 'Modifica Regola di Sollecito',
  backToList: 'Torna alle Regole di Sollecito',

  fields: {
    company: 'Azienda',
    type: 'Tipo',
    activationDate: 'Data di Attivazione',
    utcTime: 'Ora UTC',
    maxSendings: 'Invii Massimi',
    firstDelay: 'Primo Ritardo',
    secondDelay: 'Secondo Ritardo',
    thirdDelay: 'Terzo Ritardo',
    actions: 'Azioni'
  },

  types: {
    event: 'Evento',
    anonymization: 'Anonimizzazione'
  },

  tooltips: {
    edit: 'Modifica',
    duplicate: 'Duplica',
    delete: 'Elimina'
  },

  labels: {
    filters: 'Filtri',
    days: '{{count}} giorni',
    minutes: '{{count}} min',
    none: 'Nessuno',
    targetCompany: 'Azienda Target',
    note: 'Nota',
    showingRules: 'Visualizzazione di {{shown}} su {{total}} regole'
  },

  placeholders: {
    search: 'Cerca regole di sollecito...',
    searchCompany: 'Cerca e seleziona un\'azienda...'
  },

  actions: {
    cancel: 'Annulla',
    save: 'Salva',
    create: 'Crea Regola',
    update: 'Aggiorna Regola',
    delete: 'Elimina Regola',
    deleteRule: 'Elimina Regola',
    duplicate: 'Duplica Regola',
    duplicateRule: 'Duplica Regola',
    clearFilters: 'Cancella Tutti i Filtri',
    creating: 'Creazione...',
    updating: 'Aggiornamento...'
  },

  sections: {
    basicConfiguration: 'Configurazione Base',
    affectedStatuses: 'Stati di Ispezione Interessati',
    delayConfiguration: 'Configurazione Ritardi',
    firstReminder: 'Primo Promemoria',
    secondReminder: 'Secondo Promemoria',
    availableVariables: 'Variabili Disponibili'
  },

  form: {
    company: 'Azienda',
    companyRequired: 'L\'azienda è obbligatoria',
    type: 'Tipo',
    activationDate: 'Data di Attivazione',
    activationDateRequired: 'La data di attivazione è obbligatoria',
    utcSendingTime: 'Ora di Invio UTC',
    maxSendings: 'Invii Massimi',
    firstDelayDays: 'Primo Ritardo (Giorni)',
    firstDelayMinutes: 'Primo Ritardo (Minuti)',
    secondDelayDays: 'Secondo Ritardo (Giorni)',
    secondDelayMinutes: 'Secondo Ritardo (Minuti)',
    loadingCompanies: 'Caricamento aziende...',
    searchCompany: 'Cerca e seleziona un\'azienda...',
    clickToInsert: 'Clicca per inserire',
    statusesHelp: 'Le regole si applicheranno solo alle ispezioni negli stati selezionati'
  },

  statuses: {
    inspectionCreated: 'Ispezione Creata',
    inspectionInProgress: 'Ispezione in Corso',
    detectionFinished: 'Rilevamento Completato',
    damageReviewOngoing: 'Revisione Danni in Corso',
    completed: 'Completato',
    chasedUpManually: 'Sollecitato Manualmente'
  },

  reminder: {
    webhook: 'Abilita Webhook',
    enabled: 'Abilitato',
    user: 'Utente',
    customer: 'Cliente',
    emailAddress: 'Indirizzo Email',
    userEmailAddress: 'Indirizzo Email Utente',
    smsNumber: 'Numero SMS',
    userSmsNumber: 'Numero SMS Utente',
    sms: 'SMS',
    email: 'Email',
    language: 'Lingua',
    emailSubject: 'Oggetto Email',
    emailContent: 'Contenuto Email',
    smsContent: 'Contenuto SMS',
    smsMaxLength: 'Contenuto SMS (max 160 caratteri)...',
    characterCount: 'Conteggio caratteri: {{count}}/160'
  },

  variables: {
    customerName: 'Nome Cliente',
    customerEmail: 'Email Cliente',
    customerPhone: 'Telefono Cliente',
    inspectionId: 'ID Ispezione',
    inspectionLink: 'Link Ispezione',
    vehicleMake: 'Marca Veicolo',
    vehicleModel: 'Modello Veicolo',
    licensePlate: 'Targa',
    companyName: 'Nome Azienda',
    agentName: 'Nome Agente',
    inspectionDate: 'Data Ispezione',
    trackingUrl: 'URL di Tracciamento'
  },

  modals: {
    duplicateTitle: 'Duplica Regola di Sollecito',
    duplicateMessage: 'Duplica la regola di sollecito da {{company}} a un\'azienda',
    duplicateNote: 'La regola di sollecito verrà duplicata all\'azienda selezionata con tutte le sue impostazioni, ritardi e modelli di messaggi. Puoi selezionare la stessa azienda per creare una copia.',
    deleteTitle: 'Elimina Regola di Sollecito',
    deleteMessage: 'Sei sicuro di voler eliminare la regola di sollecito per {{company}}? Questa azione non può essere annullata.'
  },

  messages: {
    loading: 'Caricamento...',
    loadError: 'Errore nel caricamento delle regole di sollecito',
    createSuccess: 'Regola di sollecito creata con successo',
    updateSuccess: 'Regola di sollecito aggiornata con successo',
    deleteSuccess: 'Regola di sollecito eliminata con successo',
    deleteError: 'Errore nell\'eliminazione della regola di sollecito',
    duplicateSuccess: 'Regola di sollecito duplicata con successo',
    duplicateError: 'Errore nella duplicazione della regola di sollecito',
    noRulesFound: 'Nessuna regola di sollecito trovata corrispondente ai criteri.',
    ruleNotFound: 'Regola non Trovata',
    ruleNotFoundMessage: 'La regola di sollecito che stai cercando non esiste.'
  },

  filters: {
    allTypes: 'Tutti i Tipi',
    allCompanies: 'Tutte le Aziende',
    all: 'Tutto'
  }
} as const;
