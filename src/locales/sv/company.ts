export const company = {
  title: 'Företag',
  subtitle: 'Hantera företag, deras inställningar och konfigurationer',
  pageTitle: 'Företagshantering',
  create: 'Skapa nytt företag',
  edit: 'Redigera företag',
  duplicate: 'Duplicera företag',
  archive: 'Arkivera företag',
  unarchive: 'Återställ företag',
  archived: 'ARKIVERAD',
  fields: {
    name: 'Företagsnamn',
    identifier: 'Identifierare',
    companyId: 'Företags-ID',
    apiToken: 'API-token',
    currentRequests: 'Aktuella förfrågningar',
    maxRequests: 'Maxförfrågningar',
    createdDate: 'Skapandedatum',
    parentCompany: 'Moderföretag',
    children: 'Dotterföretag',
    chaseupRules: 'Uppföljningsregler',
    actions: 'Åtgärder',
    contractType: 'Kontrakttyp',
    companyHierarchy: 'Företagshierarki',
    companyStatus: 'Företagsstatus',
    businessSector: 'Bransch',
    logoUrl: 'Logo-URL',
    retentionPeriod: 'Behållningsperiod (månader)',
    disableFastTrack: 'Inaktivera snabbsökning',
    enableMileageCapture: 'Aktivera körsträcka',
    enableBlurDetection: 'Blanda registreringsskyltar',
    enableVinScanning: 'Aktivera VIN-skanning',
    enableBrandModelDetection: 'Aktivera märke & modell-detektion',
    iaValidation: 'AI-validering (Joelle-modell)',
    humanValidationEnabled: 'Manuell validering aktiverad',
    validationPriority: 'Valideringsprioritet (0-5)',
    maxValidationDelay: 'Maximal valideringsfördröjning (minuter)',
    minTaskProcessingDuration: 'Minsta behandlingstid för uppgift (minuter)',
    showStartInstantInspection: 'Visa start av omedelbar inspektion',
    showSendInspectionLink: 'Visa skicka inspektionslänk',
    childrenCount: 'Antal dotterföretag',
    newCompanyName: 'Nytt företagsnamn',
    reportSettings: 'Rapportinställningar',
    configModules: 'Konfigurationsmodulinställningar',
    hierarchy: 'Hierarki',
    senderName: 'Avsändarnamn (för alla händelser)',
    webhookUrl: 'Webhook-URL',
    inheritanceOptions: 'Arvsalternativ'
  },
  placeholders: {
    search: 'Sök efter namn, identifierare, företags-ID eller API-token...',
    searchCompanies: 'Sök företag...',
    enterNewCompanyName: 'Ange nytt företagsnamn',
    enterSenderName: 'Ange avsändarnamn',
    webhookUrlPlaceholder: 'https://exempel.com/webhook',
    reportSettingsJson: 'JSON-konfiguration för rapportinställningar...',
    configModulesJson: 'JSON-konfiguration för modulinställningar...'
  },
  contractTypes: {
    allTypes: 'Alla typer',
    client: 'Kund',
    prospect: 'Prospekt',
    test: 'Test',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Försäkring',
    leasing: 'Leasing',
    rental: 'Uthyrning',
    fleetManagement: 'Flottahantering',
    automotive: 'Bilindustri'
  },
  hierarchy: {
    allCompanies: 'Alla företag',
    parentCompanies: 'Moderföretag',
    childCompanies: 'Dotterföretag',
    parentCompanyOptional: 'Moderföretag (valfritt)',
    none: 'Ingen'
  },
  status: {
    activeCompanies: 'Aktiva företag',
    archivedCompanies: 'Arkiverade företag',
    allCompanies: 'Alla företag',
    archivedCount: '{{count}} arkiverade'
  },
  chaseup: {
    active: '✓ Aktiv',
    create: '+ Skapa'
  },
  tabs: {
    general: 'Allmänna inställningar',
    hierarchy: 'Hierarki',
    journeySettings: 'Inspektionsresans inställningar',
    savedJourneys: 'Sparade resor'
  },
  sections: {
    generalSettings: 'Allmänna inställningar',
    hubConfiguration: 'Hub-konfiguration',
    apiConfiguration: 'API-konfiguration',
    validation: 'Validering',
    eventsWebhooks: 'Händelser & Webhooks',
    companyHierarchy: 'Företagshierarki',
    childCompanies: 'Dotterföretag',
    hierarchyActions: 'Hierarkiåtgärder'
  },
  filters: {
    filters: 'Filter',
    clearAllFilters: 'Rensa alla filter',
    showingCompanies: 'Visar {{filtered}} av {{total}} företag'
  },
  pagination: {
    previous: 'Föregående',
    next: 'Nästa',
    showing: 'Visar',
    to: 'till',
    of: 'av',
    companies: 'företag'
  },
  banners: {
    viewingArchived: 'Visar arkiverade företag',
    archivedDescription: 'Du tittar på arkiverade företag. Dessa företag har sina API-token inaktiverade. Klicka på arkivknappen för att återställa åtkomst.',
    chaseupRulesTitle: 'Automatiska uppföljningsregler',
    chaseupRulesDescription: 'Glöm inte att konfigurera automatiska uppföljningsregler för dina företag för att säkerställa snabba åtgärder på öppna inspektioner.',
    manageChaseupRules: 'Hantera uppföljningsregler'
  },
  modals: {
    archive: {
      title: 'Arkivera företag',
      unarchiveTitle: 'Återställ företag',
      archiveQuestion: 'Är du säker på att du vill arkivera <strong>{{name}}</strong>?',
      archiveDescription: 'Detta kommer att inaktivera API-token och alla användare från detta företag.',
      unarchiveQuestion: 'Är du säker på att du vill återställa <strong>{{name}}</strong>?',
      unarchiveDescription: 'Detta kommer att återaktivera API-token och göra företaget aktivt igen.',
      noteArchive: '<strong>Obs:</strong> Arkiverade företag kan återställas senare med filtret "Visa arkiverade företag".',
      noteUnarchive: '<strong>Obs:</strong> Återställning återaktiverar åtkomst till företaget och dess API-token.',
      confirmArchive: 'Arkivera företag',
      confirmUnarchive: 'Återställ företag'
    },
    duplicate: {
      title: 'Duplicera företag',
      chooseOptions: 'Välj vad som ska kopieras från källföretaget:',
      duplicateJourneys: 'Duplicera inspektionsresor',
      duplicateCostSettings: 'Duplicera kostnadsinställningar',
      duplicateSortingRules: 'Duplicera sorteringsregler',
      duplicateWebhookEvents: 'Duplicera Webhook & händelsekonfiguration',
      editFields: 'Redigera fält',
      senderNameRequired: 'Avsändarnamn krävs',
      webhookOptional: 'valfritt',
      warningTitle: 'Kom ihåg:',
      warningMessage: 'Du måste skapa användare för det nya företaget efter duplicering.',
      detectionSettings: 'Detektion, API & valideringsinställningar',
      duplicateDetection: 'Duplicera detektionsmodellkonfiguration',
      duplicateApi: 'Duplicera API-inställningar',
      duplicateValidation: 'Duplicera valideringsinställningar',
      companiesAvailable: '{{count}} företag tillgängliga',
      filtered: 'filtrerade',
      showingAll: 'visar alla',
      createCompany: 'Skapa företag'
    },
    cancel: 'Avbryt'
  },
  validation: {
    companyNameRequired: 'Företagsnamn krävs',
    senderNameRequired: 'Avsändarnamn krävs',
    validUrlRequired: 'Ange en giltig URL'
  },
  messages: {
    createSuccess: 'Företag skapades framgångsrikt',
    updateSuccess: 'Företag uppdaterades framgångsrikt',
    deleteSuccess: 'Företag raderades framgångsrikt',
    duplicateSuccess: 'Företag duplicerades framgångsrikt',
    deleteConfirm: 'Är du säker på att du vill radera {{name}}? Denna åtgärd kan inte ångras.',
    noChildCompanies: 'Detta företag har inga dotterföretag.',
    duplicateWarning: 'Kom ihåg: du måste skapa användare för det nya företaget efter duplicering.',
    noCompaniesFound: 'Inga företag hittades som matchar dina kriterier.',
    failedToLoadCompanyData: 'Misslyckades med att ladda företagsdata'
  },
  actions: {
    edit: 'Redigera',
    duplicate: 'Duplicera',
    archive: 'Arkivera',
    unarchive: 'Återställ',
    archiveTitle: 'Arkivera företag',
    unarchiveTitle: 'Återställ företag'
  },
  createForm: {
    pageTitle: 'Skapa nytt företag',
    backToCompanies: 'Tillbaka till företag',
    createButton: 'Skapa företag',
    cancel: 'Avbryt',
    tabs: {
      general: 'Allmänna inställningar',
      eventsWebhooks: 'Händelser & Webhooks',
      hierarchy: 'Hierarki'
    },
    fields: {
      companyName: 'Företagsnamn',
      companyCode: 'Företagskod',
      logoUrl: 'Logo-URL',
      retentionPeriod: 'Behållningsperiod (månader)',
      maxApiRequests: 'Max API-förfrågningar',
      expirationDate: 'Utgångsdatum',
      styles: 'Stilar',
      reportSettings: 'Rapportinställningar',
      configModules: 'Konfigurationsmoduler',
      senderName: 'Avsändarnamn (för alla händelser)',
      senderEmail: 'Avsändarens e-post (för alla händelser)',
      webhookUrl: 'Webhook-URL',
      parentCompany: 'Moderföretag (valfritt)',
      emailAddress: 'E-postadress',
      agentEmailAddress: 'Agent e-postadress',
      smsNumber: 'SMS-nummer',
      agentSmsNumber: 'Agent SMS-nummer',
      emailSubject: 'E-postämne',
      emailContent: 'E-postinnehåll',
      smsContent: 'SMS-innehåll',
      language: 'Språk:'
    },
    placeholders: {
      companyName: 'Ange företagsnamn',
      companyCode: 'Genereras automatiskt',
      logoUrl: 'https://exempel.com/logo.png',
      senderName: 'Ditt företagsnamn',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://din-domän.com/webhook',
      searchCompanies: 'Sök företag...',
      emailAddress: 'mottagare@exempel.com',
      agentEmailAddress: 'agent@exempel.com',
      smsNumber: '+46701234567',
      emailSubject: 'E-postämne',
      emailContent: 'E-postinnehåll...',
      smsContent: 'SMS-innehåll (max 160 tecken)...',
      noneRootCompany: 'Ingen - Detta blir ett root-företag'
    },
    helperText: {
      companyCode: 'Genereras från ObjectID',
      fastTrackTooltip: 'Inaktiverar snabbsökfunktion för detta företag',
      parentCompany: 'Välj ett moderföretag för att skapa en hierarkisk struktur',
      availableVariables: 'Fokusera på ett mallfält ovan för att se tillgängliga variabler',
      characterCount: 'Antal tecken: {{count}}/160',
      companiesAvailable: '{{total}} företag tillgängliga · {{shown}} visade',
      selectedParent: 'Valt moderföretag: {{name}}'
    },
    sections: {
      generalSettings: 'Allmänna inställningar',
      apiConfiguration: 'API-konfiguration',
      hubConfiguration: 'Hub-konfiguration',
      validation: 'Validering',
      globalSettings: 'Globala inställningar',
      availableVariables: 'Tillgängliga variabler',
      availableVariablesSticky: '📋 Tillgängliga variabler',
      eventsConfiguration: 'Händelsekonfiguration',
      companyHierarchy: 'Företagshierarki'
    },
    checkboxes: {
      disableFastTrack: 'Inaktivera snabbsökning',
      enableMileageCapture: 'Aktivera körsträcka',
      enableBlurDetection: 'Blanda registreringsskyltar',
      enableVinScanning: 'Aktivera VIN-skanning',
      enableBrandModelDetection: 'Aktivera märke & modell-detektion',
      enableInteriorDamageDetection: 'Aktivera detektion av inre skador',
      enableDashboardWarningLights: 'Aktivera varningslampor på instrumentpanelen',
      showStartInstantInspection: 'Visa start av omedelbar inspektion',
      showSendInspectionLink: 'Visa skicka inspektionslänk',
      iaValidation: 'AI-validering (Joelle-modell)',
      enabled: 'Aktiverad',
      sms: 'SMS',
      email: 'E-post',
      enableWebhook: 'Aktivera webhook'
    },
    buttons: {
      uploadLogo: 'Ladda upp logotyp',
      uploadJson: 'Ladda upp JSON',
      clickToInsert: 'Klicka för att infoga'
    },
    addressees: {
      user: 'Användare',
      customer: 'Kund',
      emailAddress: 'E-postadress',
      agent: 'Agent'
    },
    events: {
      selfInspectionCreation: 'Självinspektionsskapande',
      manualChaseUp: 'Manuellt uppföljningsmeddelande',
      inspectionFinished: 'Inspektion slutförd meddelande',
      damageReviewFinished: 'Skadereview slutförd meddelande',
      shareUpdatedReport: 'Dela uppdaterad rapport meddelande'
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
    },
    loading: {
      companies: 'Laddar företag...'
    },
    messages: {
      noCompaniesFound: 'Inga företag hittades',
      invalidJson: 'Ogiltig JSON i stilar, rapportinställningar eller modulkonfigurationer',
      createFailed: 'Misslyckades med att skapa företag: {{error}}'
    },
    validation: {
      companyNameRequired: 'Företagsnamn krävs',
      logoUrlRequired: 'Logo-URL krävs',
      validUrlRequired: 'Ange en giltig URL',
      maxApiRequestsRequired: 'Max API-förfrågningar måste vara större än 0',
      senderNameRequired: 'Avsändarnamn krävs'
    }
  },
  editForm: {
    pageTitle: 'Redigera företag',
    pageTitleWithName: 'Redigera företag: {{name}}',
    backToCompanies: 'Tillbaka till företag',
    saveButton: 'Spara ändringar',
    cancel: 'Avbryt',
    loading: {
      title: 'Redigera företag',
      message: 'Laddar företagsdata...'
    },
    banners: {
      archived: {
        title: 'Detta företag är arkiverat',
        description: 'Detta företag är för närvarande arkiverat. Dess API-token är inaktiverad och användare kan inte komma åt det. Du kan återställa det från företagslistan.'
      },
      chaseupActive: {
        title: 'Uppföljningsregler aktiva',
        description: 'Detta företag har {{count}} automatiska uppföljningsregel(er) konfigurerade för snabba åtgärder.'
      },
      chaseupInactive: {
        title: 'Inga uppföljningsregler konfigurerade',
        description: 'Överväg att konfigurera automatiska uppföljningsregler för att säkerställa snabba åtgärder vid öppna inspektioner.'
      }
    },
    buttons: {
      viewRules: 'Visa regler',
      createRules: 'Skapa regler',
      addNewRule: 'Lägg till ny regel'
    },
    helperText: {
      fastTrackTooltip: 'Om markerad visas inspektioner som slutförda direkt vid mottagande',
      parentCompanyNote: 'Observera: Du kan inte välja detta företag som sitt eget moderföretag',
      configured: '✓ {{count}} konfigurerad',
      hasContent: '✓ Innehåller innehåll'
    },
    messages: {
      updateSuccess: 'Företag uppdaterades framgångsrikt',
      updateFailed: 'Misslyckades med att uppdatera företag: {{error}}',
      loadFailed: 'Misslyckades med att ladda företag: {{error}}'
    }
  }
} as const;
