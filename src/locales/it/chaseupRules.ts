export const chaseupRules = {
  title: 'Regole di Sollecito Automatizzate',
  subtitle: 'Configura regole di messaggi di sollecito automatizzati per le aziende',
  create: 'Crea Nuova Regola',
  edit: 'Modifica Regola di Sollecito',
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
    delete: 'Elimina Regola',
    deleteRule: 'Elimina Regola',
    duplicate: 'Duplica Regola',
    duplicateRule: 'Duplica Regola',
    clearFilters: 'Cancella Tutti i Filtri'
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
    noRulesFound: 'Nessuna regola di sollecito trovata corrispondente ai criteri.'
  },
  filters: {
    allTypes: 'Tutti i Tipi',
    allCompanies: 'Tutte le Aziende',
    all: 'Tutto'
  }
} as const;
