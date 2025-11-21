export const company = {
  title: 'Aziende',
  subtitle: 'Gestisci le aziende, le loro impostazioni e configurazioni',
  create: 'Crea nuova azienda',
  edit: 'Modifica azienda',
  duplicate: 'Duplica azienda',
  fields: {
    name: 'Nome azienda',
    identifier: 'Identificativo azienda',
    contractType: 'Tipo di contratto',
    businessSector: 'Settore aziendale',
    logoUrl: 'URL del logo',
    retentionPeriod: 'Periodo di conservazione (mesi)',
    disableFastTrack: 'Disabilita Fast Track',
    enableMileageCapture: 'Abilita registrazione chilometraggio',
    enableBlurDetection: 'Oscura targhe',
    enableVinScanning: 'Abilita scansione VIN',
    enableBrandModelDetection: 'Abilita rilevamento marca e modello',
    iaValidation: 'Validazione IA (modello Joelle)',
    humanValidationEnabled: 'Validazione umana abilitata',
    validationPriority: 'Priorità di validazione (0-5)',
    maxValidationDelay: 'Ritardo massimo validazione (minuti)',
    minTaskProcessingDuration: 'Durata minima elaborazione task (minuti)',
    showStartInstantInspection: 'Mostra avvio ispezione istantanea',
    showSendInspectionLink: 'Mostra invio link ispezione',
    parentCompany: 'Azienda madre',
    childrenCount: 'Numero di aziende figlie'
  },
  contractTypes: {
    client: 'Cliente',
    prospect: 'Prospect',
    test: 'Test',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Assicurazioni',
    leasing: 'Leasing',
    rental: 'Noleggio',
    fleetManagement: 'Gestione flotte',
    automotive: 'Automotive'
  },
  tabs: {
    general: 'Impostazioni generali',
    hierarchy: 'Gerarchia',
    journeySettings: 'Impostazioni percorso ispezione',
    savedJourneys: 'Percorsi salvati'
  },
  sections: {
    generalSettings: 'Impostazioni generali',
    hubConfiguration: 'Configurazione hub',
    apiConfiguration: 'Configurazione API',
    validation: 'Validazione',
    eventsWebhooks: 'Eventi & Webhook',
    companyHierarchy: 'Gerarchia aziendale',
    childCompanies: 'Aziende figlie',
    hierarchyActions: 'Azioni gerarchia'
  },
  messages: {
    createSuccess: 'Azienda creata con successo',
    updateSuccess: 'Azienda aggiornata con successo',
    deleteSuccess: 'Azienda eliminata con successo',
    duplicateSuccess: 'Azienda duplicata con successo',
    deleteConfirm: 'Sei sicuro di voler eliminare {{name}}? Questa azione non può essere annullata.',
    noChildCompanies: 'Questa azienda non ha aziende figlie.',
    duplicateWarning: 'Ricorda: dovrai creare utenti per la nuova azienda dopo la duplicazione.'
  }
} as const;
