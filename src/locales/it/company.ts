export const company = {
  title: 'Aziende',
  subtitle: 'Gestisci aziende, le loro impostazioni e configurazioni',
  pageTitle: 'Gestione aziende',
  create: 'Crea nuova azienda',
  edit: 'Modifica azienda',
  duplicate: 'Duplica azienda',
  archive: 'Archivia azienda',
  unarchive: 'Ripristina azienda',
  archived: 'ARCHIVIATA',
  fields: {
    name: 'Nome azienda',
    identifier: 'Identificatore',
    companyId: 'ID azienda',
    apiToken: 'Token API',
    currentRequests: 'Richieste correnti',
    maxRequests: 'Richieste massime',
    createdDate: 'Data creazione',
    parentCompany: 'Azienda madre',
    children: 'Figli',
    chaseupRules: 'Regole di follow-up',
    actions: 'Azioni',
    contractType: 'Tipo contratto',
    companyHierarchy: 'Gerarchia aziendale',
    companyStatus: 'Stato azienda',
    businessSector: 'Settore aziendale',
    logoUrl: 'URL logo',
    retentionPeriod: 'Periodo di conservazione (mesi)',
    disableFastTrack: 'Disabilita Fast Track',
    enableMileageCapture: 'Abilita acquisizione chilometraggio',
    enableBlurDetection: 'Offusca targhe',
    enableVinScanning: 'Abilita scansione VIN',
    enableBrandModelDetection: 'Abilita rilevamento marca e modello',
    iaValidation: 'Validazione IA (modello Joelle)',
    humanValidationEnabled: 'Validazione umana abilitata',
    validationPriority: 'Priorità validazione (0-5)',
    maxValidationDelay: 'Ritardo massimo validazione (minuti)',
    minTaskProcessingDuration: 'Durata minima elaborazione (minuti)',
    showStartInstantInspection: 'Mostra inizio ispezione istantanea',
    showSendInspectionLink: 'Mostra link ispezione',
    childrenCount: 'Numero di filiali',
    newCompanyName: 'Nome nuova azienda',
    reportSettings: 'Impostazioni report',
    configModules: 'Configurazioni moduli',
    hierarchy: 'Gerarchia',
    senderName: 'Nome mittente (per tutti gli eventi)',
    webhookUrl: 'URL webhook',
    inheritanceOptions: 'Opzioni ereditarietà'
  },
  placeholders: {
    search: 'Cerca per nome, identificatore, ID azienda o token API...',
    searchCompanies: 'Cerca aziende...',
    enterNewCompanyName: 'Inserisci il nome della nuova azienda',
    enterSenderName: 'Inserisci il nome del mittente',
    webhookUrlPlaceholder: 'https://esempio.com/webhook',
    reportSettingsJson: 'Configurazione JSON report...',
    configModulesJson: 'Configurazione JSON moduli...'
  },
  contractTypes: {
    allTypes: 'Tutti i tipi',
    client: 'Cliente',
    prospect: 'Prospetto',
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
  hierarchy: {
    allCompanies: 'Tutte le aziende',
    parentCompanies: 'Aziende madri',
    childCompanies: 'Figli',
    parentCompanyOptional: 'Azienda madre (opzionale)',
    none: 'Nessuna'
  },
  status: {
    activeCompanies: 'Aziende attive',
    archivedCompanies: 'Aziende archiviate',
    allCompanies: 'Tutte le aziende',
    archivedCount: '{{count}} archiviate'
  },
  chaseup: {
    active: '✓ Attiva',
    create: '+ Crea'
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
    eventsWebhooks: 'Eventi e webhook',
    companyHierarchy: 'Gerarchia aziendale',
    childCompanies: 'Filiali',
    hierarchyActions: 'Azioni gerarchia'
  },
  filters: {
    filters: 'Filtri',
    clearAllFilters: 'Cancella tutti i filtri',
    showingCompanies: 'Mostrando {{filtered}} di {{total}} aziende'
  },
  pagination: {
    previous: 'Precedente',
    next: 'Successivo',
    showing: 'Mostrando',
    to: 'a',
    of: 'di',
    companies: 'aziende'
  },
  banners: {
    viewingArchived: 'Visualizzazione aziende archiviate',
    archivedDescription: 'Stai visualizzando aziende archiviate. I loro token API sono disabilitati. Clicca su archivia per ripristinare l’accesso.',
    chaseupRulesTitle: 'Regole di follow-up automatiche',
    chaseupRulesDescription: 'Non dimenticare di configurare regole di follow-up automatiche per garantire il follow-up delle ispezioni in sospeso.',
    manageChaseupRules: 'Gestisci regole di follow-up'
  },
  modals: {
    archive: {
      title: 'Archivia azienda',
      unarchiveTitle: 'Ripristina azienda',
      archiveQuestion: 'Sei sicuro di voler archiviare <strong>{{name}}</strong>?',
      archiveDescription: 'Questo disabiliterà il token API e tutti gli utenti di questa azienda.',
      unarchiveQuestion: 'Sei sicuro di voler ripristinare <strong>{{name}}</strong>?',
      unarchiveDescription: 'Questo riattiverà il token API e renderà l’azienda nuovamente attiva.',
      noteArchive: '<strong>Nota:</strong> Le aziende archiviate possono essere ripristinate in seguito usando il filtro "Mostra aziende archiviate".',
      noteUnarchive: '<strong>Nota:</strong> Ripristinare l’azienda riattiverà l’accesso e il token API.',
      confirmArchive: 'Archivia azienda',
      confirmUnarchive: 'Ripristina azienda'
    },
    duplicate: {
      title: 'Duplica azienda',
      chooseOptions: 'Scegli cosa copiare dall’azienda sorgente:',
      duplicateJourneys: 'Duplica percorsi di ispezione',
      duplicateCostSettings: 'Duplica impostazioni costi',
      duplicateSortingRules: 'Duplica regole di ordinamento',
      duplicateWebhookEvents: 'Duplica eventi e webhook',
      editFields: 'Modifica campi',
      senderNameRequired: 'Nome mittente richiesto',
      webhookOptional: 'opzionale',
      warningTitle: 'Ricorda:',
      warningMessage: 'Dovrai creare utenti per la nuova azienda dopo la duplicazione.',
      detectionSettings: 'Impostazioni rilevamento, API e validazione',
      duplicateDetection: 'Duplica configurazione modello rilevamento',
      duplicateApi: 'Duplica configurazione API',
      duplicateValidation: 'Duplica configurazione validazione',
      companiesAvailable: '{{count}} aziende disponibili',
      filtered: 'filtrate',
      showingAll: 'mostrando tutte',
      createCompany: 'Crea azienda'
    },
    cancel: 'Annulla'
  },
  validation: {
    companyNameRequired: 'Il nome azienda è obbligatorio',
    senderNameRequired: 'Il nome mittente è obbligatorio',
    validUrlRequired: 'Inserisci un URL valido'
  },
  messages: {
    createSuccess: 'Azienda creata con successo',
    updateSuccess: 'Azienda aggiornata con successo',
    deleteSuccess: 'Azienda eliminata con successo',
    duplicateSuccess: 'Azienda duplicata con successo',
    deleteConfirm: 'Sei sicuro di voler eliminare {{name}}? Questa azione non può essere annullata.',
    noChildCompanies: 'Questa azienda non ha filiali.',
    duplicateWarning: 'Ricorda: dovrai creare utenti per la nuova azienda dopo la duplicazione.',
    noCompaniesFound: 'Nessuna azienda trovata con i criteri specificati.',
    failedToLoadCompanyData: 'Errore nel caricamento dati azienda'
  },
  actions: {
    edit: 'Modifica',
    duplicate: 'Duplica',
    archive: 'Archivia',
    unarchive: 'Ripristina',
    archiveTitle: 'Archivia azienda',
    unarchiveTitle: 'Ripristina azienda'
  },
  createForm: {
    pageTitle: 'Crea nuova azienda',
    backToCompanies: 'Torna alle aziende',
    createButton: 'Crea azienda',
    cancel: 'Annulla',
    tabs: {
      general: 'Impostazioni generali',
      eventsWebhooks: 'Eventi e webhook',
      hierarchy: 'Gerarchia'
    },
    fields: {
      companyName: 'Nome azienda',
      companyCode: 'Codice azienda',
      logoUrl: 'URL logo',
      retentionPeriod: 'Periodo di conservazione (mesi)',
      maxApiRequests: 'Richieste API massime',
      expirationDate: 'Data scadenza',
      styles: 'Stili',
      reportSettings: 'Impostazioni report',
      configModules: 'Moduli configurazione',
      senderName: 'Nome mittente (per tutti gli eventi)',
      senderEmail: 'Email mittente (per tutti gli eventi)',
      webhookUrl: 'URL Webhook',
      parentCompany: 'Azienda madre (opzionale)',
      emailAddress: 'Email',
      agentEmailAddress: 'Email agente',
      smsNumber: 'Numero SMS',
      agentSmsNumber: 'Numero SMS agente',
      emailSubject: 'Oggetto email',
      emailContent: 'Contenuto email',
      smsContent: 'Contenuto SMS',
      language: 'Lingua:'
    },
    placeholders: {
      companyName: 'Inserisci nome azienda',
      companyCode: 'Generato automaticamente',
      logoUrl: 'https://esempio.com/logo.png',
      senderName: 'Nome della tua azienda',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://tuo-dominio.com/webhook',
      searchCompanies: 'Cerca aziende...',
      emailAddress: 'destinatario@esempio.com',
      agentEmailAddress: 'agente@esempio.com',
      smsNumber: '+391234567890',
      emailSubject: 'Oggetto email',
      emailContent: 'Contenuto email...',
      smsContent: 'Contenuto SMS (max 160 caratteri)...',
      noneRootCompany: 'Nessuna - Questa sarà un’azienda principale'
    },
    helperText: {
      companyCode: 'Generato da ObjectID',
      fastTrackTooltip: 'Disabilita Fast Track per questa azienda',
      parentCompany: 'Seleziona un’azienda madre per creare una struttura gerarchica',
      availableVariables: 'Seleziona un campo modello sopra per vedere le variabili disponibili',
      characterCount: 'Conteggio caratteri: {{count}}/160',
      companiesAvailable: '{{total}} aziende disponibili · {{shown}} visualizzate',
      selectedParent: 'Azienda madre selezionata: {{name}}'
    },
    sections: {
      generalSettings: 'Impostazioni generali',
      apiConfiguration: 'Configurazione API',
      hubConfiguration: 'Configurazione hub',
      validation: 'Validazione',
      globalSettings: 'Impostazioni globali',
      availableVariables: 'Variabili disponibili',
      availableVariablesSticky: '📋 Variabili disponibili',
      eventsConfiguration: 'Configurazione eventi',
      companyHierarchy: 'Gerarchia aziendale'
    },
    checkboxes: {
      disableFastTrack: 'Disabilita Fast Track',
      enableMileageCapture: 'Abilita acquisizione chilometraggio',
      enableBlurDetection: 'Attiva offuscamento targhe',
      enableVinScanning: 'Abilita scansione VIN',
      enableBrandModelDetection: 'Attiva rilevamento marca e modello',
      enableInteriorDamageDetection: 'Attiva rilevamento danni interni',
      enableDashboardWarningLights: 'Attiva rilevamento spie cruscotto',
      showStartInstantInspection: 'Mostra inizio ispezione istantanea',
      showSendInspectionLink: 'Mostra link ispezione',
      iaValidation: 'Validazione IA (modello Joelle)',
      enabled: 'Abilitato',
      sms: 'SMS',
      email: 'Email',
      enableWebhook: 'Abilita Webhook'
    },
    buttons: {
      uploadLogo: 'Carica logo',
      uploadJson: 'Carica JSON',
      clickToInsert: 'Clicca per inserire'
    },
    addressees: {
      user: 'Utente',
      customer: 'Cliente',
      emailAddress: 'Email',
      agent: 'Agente'
    },
    events: {
      selfInspectionCreation: 'Creazione auto-ispezione',
      manualChaseUp: 'Messaggio follow-up manuale',
      inspectionFinished: 'Messaggio ispezione completata',
      damageReviewFinished: 'Messaggio revisione danni completata',
      shareUpdatedReport: 'Messaggio condivisione report aggiornato'
    },
    languages: {
      en: 'Inglese',
      fr: 'Francese',
      de: 'Tedesco',
      it: 'Italiano',
      es: 'Spagnolo',
      nl: 'Olandese',
      sv: 'Svedese',
      no: 'Norvegese'
    },
    loading: {
      companies: 'Caricamento aziende...'
    },
    messages: {
      noCompaniesFound: 'Nessuna azienda trovata',
      invalidJson: 'JSON non valido in stili, impostazioni report o moduli',
      createFailed: 'Creazione azienda fallita: {{error}}'
    },
    validation: {
      companyNameRequired: 'Nome azienda obbligatorio',
      logoUrlRequired: 'URL logo obbligatorio',
      validUrlRequired: 'Inserisci un URL valido',
      maxApiRequestsRequired: 'Le richieste API massime devono essere maggiori di 0',
      senderNameRequired: 'Nome mittente obbligatorio'
    }
  },
  editForm: {
    pageTitle: 'Modifica azienda',
    pageTitleWithName: 'Modifica azienda: {{name}}',
    backToCompanies: 'Torna alle aziende',
    saveButton: 'Salva modifiche',
    cancel: 'Annulla',
    loading: {
      title: 'Modifica azienda',
      message: 'Caricamento dati azienda...'
    },
    banners: {
      archived: {
        title: 'Questa azienda è archiviata',
        description: 'Questa azienda è attualmente archiviata. Il token API è disabilitato e gli utenti non possono accedere. Puoi ripristinarla dalla lista aziende.'
      },
      chaseupActive: {
        title: 'Regole follow-up attive',
        description: 'Questa azienda ha {{count}} regola/e follow-up automatica configurata/e per un follow-up tempestivo.'
      },
      chaseupInactive: {
        title: 'Nessuna regola follow-up configurata',
        description: 'Considera di configurare regole follow-up automatiche per garantire il follow-up delle ispezioni in sospeso.'
      }
    },
    buttons: {
      viewRules: 'Visualizza regole',
      createRules: 'Crea regole',
      addNewRule: 'Aggiungi nuova regola'
    },
    helperText: {
      fastTrackTooltip: 'Se selezionato, le ispezioni appariranno completate non appena ricevute',
      parentCompanyNote: 'Nota: Non puoi selezionare questa azienda come sua stessa azienda madre',
      configured: '✓ {{count}} configurato',
      hasContent: '✓ Contenuto presente'
    },
    messages: {
      updateSuccess: 'Azienda aggiornata con successo',
      updateFailed: 'Errore aggiornamento azienda: {{error}}',
      loadFailed: 'Errore caricamento azienda: {{error}}'
    }
  }
} as const;
