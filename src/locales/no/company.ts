export const company = {
  title: 'Selskaper',
  subtitle: 'Administrer selskaper, deres innstillinger og konfigurasjoner',
  pageTitle: 'Selskapsadministrasjon',
  create: 'Opprett nytt selskap',
  edit: 'Rediger selskap',
  duplicate: 'Dupliser selskap',
  archive: 'Arkiver selskap',
  unarchive: 'Gjenopprett selskap',
  archived: 'ARKIVERT',
  fields: {
    name: 'Firmanavn',
    identifier: 'Identifikator',
    companyId: 'Firma-ID',
    apiToken: 'API-token',
    currentRequests: 'Aktuelle forespørsler',
    maxRequests: 'Maks forespørsler',
    createdDate: 'Opprettelsesdato',
    parentCompany: 'Moderselskap',
    children: 'Datterselskaper',
    chaseupRules: 'Oppfølgingsregler',
    actions: 'Handlinger',
    contractType: 'Kontrakttype',
    companyHierarchy: 'Selskapsstruktur',
    companyStatus: 'Selskapsstatus',
    businessSector: 'Bransje',
    logoUrl: 'Logo-URL',
    retentionPeriod: 'Oppbevaringsperiode (måneder)',
    disableFastTrack: 'Deaktiver hurtigspor',
    enableMileageCapture: 'Aktiver kjørelengde',
    enableBlurDetection: 'Slør registreringsskilt',
    enableVinScanning: 'Aktiver VIN-skanning',
    enableBrandModelDetection: 'Aktiver merke- og modellgjenkjenning',
    iaValidation: 'AI-validering (Joelle-modell)',
    humanValidationEnabled: 'Manuell validering aktivert',
    validationPriority: 'Valideringsprioritet (0-5)',
    maxValidationDelay: 'Maksimal valideringsforsinkelse (minutter)',
    minTaskProcessingDuration: 'Minste behandlingstid for oppgaver (minutter)',
    showStartInstantInspection: 'Vis start av umiddelbar inspeksjon',
    showSendInspectionLink: 'Vis sende inspeksjonslenke',
    childrenCount: 'Antall datterselskaper',
    newCompanyName: 'Nytt selskapsnavn',
    reportSettings: 'Rapportinnstillinger',
    configModules: 'Konfigurasjonsmoduler',
    hierarchy: 'Hierarki',
    senderName: 'Avsenders navn (for alle hendelser)',
    webhookUrl: 'Webhook-URL',
    inheritanceOptions: 'Arvealternativer'
  },
  placeholders: {
    search: 'Søk etter navn, identifikator, firma-ID eller API-token...',
    searchCompanies: 'Søk selskaper...',
    enterNewCompanyName: 'Skriv inn nytt selskapsnavn',
    enterSenderName: 'Skriv inn avsenders navn',
    webhookUrlPlaceholder: 'https://eksempel.com/webhook',
    reportSettingsJson: 'JSON-konfigurasjon for rapportinnstillinger...',
    configModulesJson: 'JSON-konfigurasjon for modulinnstillinger...'
  },
  contractTypes: {
    allTypes: 'Alle typer',
    client: 'Kunde',
    prospect: 'Prospekt',
    test: 'Test',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Forsikring',
    leasing: 'Leasing',
    rental: 'Utleie',
    fleetManagement: 'Flåtestyring',
    automotive: 'Bilindustri'
  },
  hierarchy: {
    allCompanies: 'Alle selskaper',
    parentCompanies: 'Moderselskaper',
    childCompanies: 'Datterselskaper',
    parentCompanyOptional: 'Moderselskap (valgfritt)',
    none: 'Ingen'
  },
  status: {
    activeCompanies: 'Aktive selskaper',
    archivedCompanies: 'Arkiverte selskaper',
    allCompanies: 'Alle selskaper',
    archivedCount: '{{count}} arkiverte'
  },
  chaseup: {
    active: '✓ Aktiv',
    create: '+ Opprett'
  },
  tabs: {
    general: 'Generelle innstillinger',
    hierarchy: 'Hierarki',
    journeySettings: 'Inspeksjonsreise-innstillinger',
    savedJourneys: 'Lagrede reiser'
  },
  sections: {
    generalSettings: 'Generelle innstillinger',
    hubConfiguration: 'Hub-konfigurasjon',
    apiConfiguration: 'API-konfigurasjon',
    validation: 'Validering',
    eventsWebhooks: 'Hendelser & Webhooks',
    companyHierarchy: 'Selskapsstruktur',
    childCompanies: 'Datterselskaper',
    hierarchyActions: 'Hierarki-handlinger'
  },
  filters: {
    filters: 'Filtre',
    clearAllFilters: 'Fjern alle filtre',
    showingCompanies: 'Viser {{filtered}} av {{total}} selskaper'
  },
  pagination: {
    previous: 'Forrige',
    next: 'Neste',
    showing: 'Viser',
    to: 'til',
    of: 'av',
    companies: 'selskaper'
  },
  banners: {
    viewingArchived: 'Viser arkiverte selskaper',
    archivedDescription: 'Du ser for øyeblikket arkiverte selskaper. Disse selskapene har sin API-token deaktivert. Klikk på arkiv-knappen for å gjenopprette tilgang.',
    chaseupRulesTitle: 'Automatiske oppfølgingsregler',
    chaseupRulesDescription: 'Husk å konfigurere automatiske oppfølgingsregler for dine selskaper for å sikre rask oppfølging av åpne inspeksjoner.',
    manageChaseupRules: 'Administrer oppfølgingsregler'
  },
  modals: {
    archive: {
      title: 'Arkiver selskap',
      unarchiveTitle: 'Gjenopprett selskap',
      archiveQuestion: 'Er du sikker på at du vil arkivere <strong>{{name}}</strong>?',
      archiveDescription: 'Dette vil deaktivere API-token og alle brukere fra dette selskapet.',
      unarchiveQuestion: 'Er du sikker på at du vil gjenopprette <strong>{{name}}</strong>?',
      unarchiveDescription: 'Dette vil aktivere API-token igjen og gjøre selskapet aktivt.',
      noteArchive: '<strong>Merk:</strong> Arkiverte selskaper kan gjenopprettes senere ved hjelp av "Vis arkiverte selskaper"-filteret.',
      noteUnarchive: '<strong>Merk:</strong> Gjenoppretting vil gi tilgang til selskapet og dets API-token.',
      confirmArchive: 'Arkiver selskap',
      confirmUnarchive: 'Gjenopprett selskap'
    },
    duplicate: {
      title: 'Dupliser selskap',
      chooseOptions: 'Velg hva som skal kopieres fra kildeselskapet:',
      duplicateJourneys: 'Dupliser inspeksjonsreiser',
      duplicateCostSettings: 'Dupliser kostnadsinnstillinger',
      duplicateSortingRules: 'Dupliser sorteringsregler',
      duplicateWebhookEvents: 'Dupliser Webhook- & hendelseskonfigurasjon',
      editFields: 'Rediger felt',
      senderNameRequired: 'Avsenders navn er påkrevd',
      webhookOptional: 'valgfritt',
      warningTitle: 'Husk:',
      warningMessage: 'Du må opprette brukere for det nye selskapet etter duplisering.',
      detectionSettings: 'Deteksjon, API & valideringsinnstillinger',
      duplicateDetection: 'Dupliser deteksjonsmodellkonfigurasjon',
      duplicateApi: 'Dupliser API-innstillinger',
      duplicateValidation: 'Dupliser valideringsinnstillinger',
      companiesAvailable: '{{count}} selskaper tilgjengelige',
      filtered: 'filtrerte',
      showingAll: 'viser alle',
      createCompany: 'Opprett selskap'
    },
    cancel: 'Avbryt'
  },
  validation: {
    companyNameRequired: 'Firmanavn er påkrevd',
    senderNameRequired: 'Avsenders navn er påkrevd',
    validUrlRequired: 'Oppgi en gyldig URL'
  },
  messages: {
    createSuccess: 'Selskap opprettet',
    updateSuccess: 'Selskap oppdatert',
    deleteSuccess: 'Selskap slettet',
    duplicateSuccess: 'Selskap duplisert',
    deleteConfirm: 'Er du sikker på at du vil slette {{name}}? Denne handlingen kan ikke angres.',
    noChildCompanies: 'Dette selskapet har ingen datterselskaper.',
    duplicateWarning: 'Husk: Du må opprette brukere for det nye selskapet etter duplisering.',
    noCompaniesFound: 'Ingen selskaper funnet som matcher kriteriene.',
    failedToLoadCompanyData: 'Kunne ikke laste selskapsdata'
  },
  actions: {
    edit: 'Rediger',
    duplicate: 'Dupliser',
    archive: 'Arkiver',
    unarchive: 'Gjenopprett',
    archiveTitle: 'Arkiver selskap',
    unarchiveTitle: 'Gjenopprett selskap'
  },
  createForm: {
    pageTitle: 'Opprett nytt selskap',
    backToCompanies: 'Tilbake til selskaper',
    createButton: 'Opprett selskap',
    cancel: 'Avbryt',
    tabs: {
      general: 'Generelle innstillinger',
      eventsWebhooks: 'Hendelser & Webhooks',
      hierarchy: 'Hierarki'
    },
    fields: {
      companyName: 'Firmanavn',
      companyCode: 'Firma-kode',
      logoUrl: 'Logo-URL',
      retentionPeriod: 'Oppbevaringsperiode (måneder)',
      maxApiRequests: 'Maks API-forespørsler',
      expirationDate: 'Utløpsdato',
      styles: 'Stiler',
      reportSettings: 'Rapportinnstillinger',
      configModules: 'Konfigurasjonsmoduler',
      senderName: 'Avsenders navn (for alle hendelser)',
      senderEmail: 'Avsenders e-post (for alle hendelser)',
      webhookUrl: 'Webhook-URL',
      parentCompany: 'Moderselskap (valgfritt)',
      emailAddress: 'E-postadresse',
      agentEmailAddress: 'Agent e-postadresse',
      smsNumber: 'SMS-nummer',
      agentSmsNumber: 'Agent SMS-nummer',
      emailSubject: 'E-post emne',
      emailContent: 'E-post innhold',
      smsContent: 'SMS-innhold',
      language: 'Språk:'
    },
    placeholders: {
      companyName: 'Skriv inn selskapsnavn',
      companyCode: 'Genereres automatisk',
      logoUrl: 'https://eksempel.com/logo.png',
      senderName: 'Ditt firmanavn',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://din-domene.com/webhook',
      searchCompanies: 'Søk selskaper...',
      emailAddress: 'mottaker@eksempel.com',
      agentEmailAddress: 'agent@eksempel.com',
      smsNumber: '+4790123456',
      emailSubject: 'E-post emne',
      emailContent: 'E-post innhold...',
      smsContent: 'SMS-innhold (maks 160 tegn)...',
      noneRootCompany: 'Ingen - Dette blir et rot-selskap'
    },
    helperText: {
      companyCode: 'Genereres fra ObjectID',
      fastTrackTooltip: 'Deaktiverer hurtigspor-funksjonalitet for dette selskapet',
      parentCompany: 'Velg et moderselskap for å lage en hierarkisk struktur',
      availableVariables: 'Fokuser på et malfelt over for å se tilgjengelige variabler',
      characterCount: 'Antall tegn: {{count}}/160',
      companiesAvailable: '{{total}} selskaper tilgjengelig · {{shown}} vist',
      selectedParent: 'Valgt moderselskap: {{name}}'
    },
    sections: {
      generalSettings: 'Generelle innstillinger',
      apiConfiguration: 'API-konfigurasjon',
      hubConfiguration: 'Hub-konfigurasjon',
      validation: 'Validering',
      globalSettings: 'Globale innstillinger',
      availableVariables: 'Tilgjengelige variabler',
      availableVariablesSticky: '📋 Tilgjengelige variabler',
      eventsConfiguration: 'Hendelseskonfigurasjon',
      companyHierarchy: 'Selskapsstruktur'
    },
    checkboxes: {
      disableFastTrack: 'Deaktiver hurtigspor',
      enableMileageCapture: 'Aktiver kjørelengde',
      enableBlurDetection: 'Slør registreringsskilt',
      enableVinScanning: 'Aktiver VIN-skanning',
      enableBrandModelDetection: 'Aktiver merke- og modellgjenkjenning',
      enableInteriorDamageDetection: 'Aktiver deteksjon av innvendige skader',
      enableDashboardWarningLights: 'Aktiver varsellamper på dashbord',
      showStartInstantInspection: 'Vis start av umiddelbar inspeksjon',
      showSendInspectionLink: 'Vis sende inspeksjonslenke',
      iaValidation: 'AI-validering (Joelle-modell)',
      enabled: 'Aktivert',
      sms: 'SMS',
      email: 'E-post',
      enableWebhook: 'Aktiver webhook'
    },
    buttons: {
      uploadLogo: 'Last opp logo',
      uploadJson: 'Last opp JSON',
      clickToInsert: 'Klikk for å sette inn'
    },
    addressees: {
      user: 'Bruker',
      customer: 'Kunde',
      emailAddress: 'E-postadresse',
      agent: 'Agent'
    },
    events: {
      selfInspectionCreation: 'Selvinspeksjon opprettet',
      manualChaseUp: 'Manuell oppfølgingsmelding',
      inspectionFinished: 'Inspeksjon fullført melding',
      damageReviewFinished: 'Skadegjennomgang fullført melding',
      shareUpdatedReport: 'Del oppdatert rapport melding'
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
      companies: 'Laster selskaper...'
    },
    messages: {
      noCompaniesFound: 'Ingen selskaper funnet',
      invalidJson: 'Ugyldig JSON i stiler, rapportinnstillinger eller modulkonfigurasjoner',
      createFailed: 'Kunne ikke opprette selskap: {{error}}'
    },
    validation: {
      companyNameRequired: 'Firmanavn er påkrevd',
      logoUrlRequired: 'Logo-URL er påkrevd',
      validUrlRequired: 'Oppgi en gyldig URL',
      maxApiRequestsRequired: 'Maks API-forespørsler må være større enn 0',
      senderNameRequired: 'Avsenders navn er påkrevd'
    }
  },
  editForm: {
    pageTitle: 'Rediger selskap',
    pageTitleWithName: 'Rediger selskap: {{name}}',
    backToCompanies: 'Tilbake til selskaper',
    saveButton: 'Lagre endringer',
    cancel: 'Avbryt',
    loading: {
      title: 'Rediger selskap',
      message: 'Laster selskapsdata...'
    },
    banners: {
      archived: {
        title: 'Dette selskapet er arkivert',
        description: 'Dette selskapet er arkivert. API-token er deaktivert og brukere kan ikke få tilgang. Du kan gjenopprette det fra selskapslisten.'
      },
      chaseupActive: {
        title: 'Oppfølgingsregler aktive',
        description: 'Dette selskapet har {{count}} automatiske oppfølgingsregel(er) konfigurert for rask oppfølging.'
      },
      chaseupInactive: {
        title: 'Ingen oppfølgingsregler konfigurert',
        description: 'Vurder å konfigurere automatiske oppfølgingsregler for å sikre rask oppfølging av åpne inspeksjoner.'
      }
    },
    buttons: {
      viewRules: 'Vis regler',
      createRules: 'Opprett regler',
      addNewRule: 'Legg til ny regel'
    },
    helperText: {
      fastTrackTooltip: 'Hvis valgt, vises inspeksjoner som fullført så snart de mottas',
      parentCompanyNote: 'Merk: Du kan ikke velge dette selskapet som sitt eget moderselskap',
      configured: '✓ {{count}} konfigurert',
      hasContent: '✓ Har innhold'
    },
    messages: {
      updateSuccess: 'Selskap oppdatert',
      updateFailed: 'Kunne ikke oppdatere selskap: {{error}}',
      loadFailed: 'Kunne ikke laste selskap: {{error}}'
    }
  }
} as const;
