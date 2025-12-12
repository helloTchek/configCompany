export const company = {
  title: 'Bedrijven',
  subtitle: 'Beheer bedrijven, hun instellingen en configuraties',
  pageTitle: 'Bedrijfsbeheer',
  create: 'Nieuw Bedrijf Aanmaken',
  edit: 'Bewerk Bedrijf',
  duplicate: 'Dupliceer Bedrijf',
  archive: 'Archiveer Bedrijf',
  unarchive: 'Herstel Bedrijf',
  archived: 'GEARCHIVEERD',
  fields: {
    name: 'Bedrijfsnaam',
    identifier: 'Identificatie',
    companyId: 'Bedrijf ID',
    apiToken: 'API Token',
    currentRequests: 'Huidige Verzoeken',
    maxRequests: 'Max Verzoeken',
    createdDate: 'Aanmaakdatum',
    parentCompany: 'Moederbedrijf',
    children: 'Dochterbedrijven',
    chaseupRules: 'Follow-up Regels',
    actions: 'Acties',
    contractType: 'Contracttype',
    companyHierarchy: 'Bedrijfshiërarchie',
    companyStatus: 'Bedrijfsstatus',
    businessSector: 'Zakelijke Sector',
    logoUrl: 'Logo URL',
    retentionPeriod: 'Bewaarperiode (maanden)',
    disableFastTrack: 'Fast Track Uitschakelen',
    enableMileageCapture: 'Kilometerregistratie Inschakelen',
    enableBlurDetection: 'Kentekens Vervagen',
    enableVinScanning: 'VIN Scannen Inschakelen',
    enableBrandModelDetection: 'Merk & Model Detectie Inschakelen',
    iaValidation: 'IA Validatie (Joelle-model)',
    humanValidationEnabled: 'Menselijke Validatie Ingeschakeld',
    validationPriority: 'Validatieprioriteit (0-5)',
    maxValidationDelay: 'Maximale Validatie Vertraging (minuten)',
    minTaskProcessingDuration: 'Minimale Taakverwerkingstijd (minuten)',
    showStartInstantInspection: 'Toon Start Directe Inspectie',
    showSendInspectionLink: 'Toon Inspectielink Verzenden',
    childrenCount: 'Aantal Dochterbedrijven',
    newCompanyName: 'Nieuwe Bedrijfsnaam',
    reportSettings: 'Rapportinstellingen',
    configModules: 'Configuratiemodule Instellingen',
    hierarchy: 'Hiërarchie',
    senderName: 'Naam Afzender (voor alle gebeurtenissen)',
    webhookUrl: 'Webhook URL',
    inheritanceOptions: 'Overervingsopties'
  },
  placeholders: {
    search: 'Zoek op naam, identificatie, Bedrijf ID of API token...',
    searchCompanies: 'Zoek bedrijven...',
    enterNewCompanyName: 'Voer nieuwe bedrijfsnaam in',
    enterSenderName: 'Voer naam afzender in',
    webhookUrlPlaceholder: 'https://voorbeeld.com/webhook',
    reportSettingsJson: 'JSON-configuratie rapportinstellingen...',
    configModulesJson: 'JSON-configuratie module-instellingen...'
  },
  contractTypes: {
    allTypes: 'Alle Types',
    client: 'Klant',
    prospect: 'Potentiële Klant',
    test: 'Test',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Verzekeringen',
    leasing: 'Leasing',
    rental: 'Verhuur',
    fleetManagement: 'Vlootbeheer',
    automotive: 'Automotive'
  },
  hierarchy: {
    allCompanies: 'Alle Bedrijven',
    parentCompanies: 'Moederbedrijven',
    childCompanies: 'Dochterbedrijven',
    parentCompanyOptional: 'Moederbedrijf (optioneel)',
    none: 'Geen'
  },
  status: {
    activeCompanies: 'Actieve Bedrijven',
    archivedCompanies: 'Gearchiveerde Bedrijven',
    allCompanies: 'Alle Bedrijven',
    archivedCount: '{{count}} gearchiveerd'
  },
  chaseup: {
    active: '✓ Actief',
    create: '+ Maak'
  },
  tabs: {
    general: 'Algemene Instellingen',
    hierarchy: 'Hiërarchie',
    journeySettings: 'Inspectiereis Instellingen',
    savedJourneys: 'Opgeslagen Reizen'
  },
  sections: {
    generalSettings: 'Algemene Instellingen',
    hubConfiguration: 'Hubconfiguratie',
    apiConfiguration: 'API-configuratie',
    validation: 'Validatie',
    eventsWebhooks: 'Evenementen & Webhooks',
    companyHierarchy: 'Bedrijfshiërarchie',
    childCompanies: 'Dochterbedrijven',
    hierarchyActions: 'Hiërarchie Acties'
  },
  filters: {
    filters: 'Filters',
    clearAllFilters: 'Wis Alle Filters',
    showingCompanies: 'Weergeven {{filtered}} van {{total}} bedrijven'
  },
  pagination: {
    previous: 'Vorige',
    next: 'Volgende',
    showing: 'Weergeven',
    to: 'tot',
    of: 'van',
    companies: 'bedrijven'
  },
  banners: {
    viewingArchived: 'Gearchiveerde Bedrijven Bekijken',
    archivedDescription: 'Je bekijkt momenteel gearchiveerde bedrijven. Deze bedrijven hebben hun API-token uitgeschakeld. Klik op de archiefknop om toegang te herstellen.',
    chaseupRulesTitle: 'Automatische Follow-up Regels',
    chaseupRulesDescription: 'Vergeet niet om automatische follow-up regels in te stellen voor je bedrijven om tijdige acties bij openstaande inspecties te waarborgen.',
    manageChaseupRules: 'Beheer Follow-up Regels'
  },
  modals: {
    archive: {
      title: 'Archiveer Bedrijf',
      unarchiveTitle: 'Herstel Bedrijf',
      archiveQuestion: 'Weet je zeker dat je <strong>{{name}}</strong> wilt archiveren?',
      archiveDescription: 'Dit zal het API-token en alle gebruikers van dit bedrijf deactiveren.',
      unarchiveQuestion: 'Weet je zeker dat je <strong>{{name}}</strong> wilt herstellen?',
      unarchiveDescription: 'Dit zal het API-token opnieuw activeren en het bedrijf weer actief maken.',
      noteArchive: '<strong>Opmerking:</strong> Gearchiveerde bedrijven kunnen later worden hersteld via de filter "Gearchiveerde bedrijven tonen".',
      noteUnarchive: '<strong>Opmerking:</strong> Herstellen zal de toegang en het API-token van het bedrijf opnieuw activeren.',
      confirmArchive: 'Archiveer Bedrijf',
      confirmUnarchive: 'Herstel Bedrijf'
    },
    duplicate: {
      title: 'Dupliceer Bedrijf',
      chooseOptions: 'Kies wat gekopieerd moet worden van het bronbedrijf:',
      duplicateJourneys: 'Dupliceer Inspectiereizen',
      duplicateCostSettings: 'Dupliceer Kosteninstellingen',
      duplicateSortingRules: 'Dupliceer Sorteerregels',
      duplicateWebhookEvents: 'Dupliceer Webhook & Evenement Configuratie',
      editFields: 'Bewerk Velden',
      senderNameRequired: 'Naam afzender verplicht',
      webhookOptional: 'optioneel',
      warningTitle: 'Onthoud:',
      warningMessage: 'Je moet na duplicatie gebruikers aanmaken voor het nieuwe bedrijf.',
      detectionSettings: 'Detectie, API & Validatie Instellingen',
      duplicateDetection: 'Dupliceer Detectiemodel Configuratie',
      duplicateApi: 'Dupliceer API-instellingen',
      duplicateValidation: 'Dupliceer Validatie-instellingen',
      companiesAvailable: '{{count}} bedrijven beschikbaar',
      filtered: 'gefilterd',
      showingAll: 'alles weergegeven',
      createCompany: 'Maak Bedrijf'
    },
    cancel: 'Annuleer'
  },
  validation: {
    companyNameRequired: 'Bedrijfsnaam is verplicht',
    senderNameRequired: 'Naam afzender is verplicht',
    validUrlRequired: 'Voer een geldige URL in'
  },
  messages: {
    createSuccess: 'Bedrijf succesvol aangemaakt',
    updateSuccess: 'Bedrijf succesvol bijgewerkt',
    deleteSuccess: 'Bedrijf succesvol verwijderd',
    duplicateSuccess: 'Bedrijf succesvol gedupliceerd',
    deleteConfirm: 'Weet je zeker dat je {{name}} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.',
    noChildCompanies: 'Dit bedrijf heeft geen dochterbedrijven.',
    duplicateWarning: 'Onthoud: je moet gebruikers aanmaken voor het nieuwe bedrijf na duplicatie.',
    noCompaniesFound: 'Geen bedrijven gevonden die aan je criteria voldoen.',
    failedToLoadCompanyData: 'Kan bedrijfsgegevens niet laden'
  },
  actions: {
    edit: 'Bewerk',
    duplicate: 'Dupliceer',
    archive: 'Archiveer',
    unarchive: 'Herstel',
    archiveTitle: 'Archiveer bedrijf',
    unarchiveTitle: 'Herstel bedrijf'
  },
  createForm: {
    pageTitle: 'Nieuw Bedrijf Aanmaken',
    backToCompanies: 'Terug naar Bedrijven',
    createButton: 'Maak Bedrijf',
    cancel: 'Annuleer',
    tabs: {
      general: 'Algemene Instellingen',
      eventsWebhooks: 'Evenementen & Webhooks',
      hierarchy: 'Hiërarchie'
    },
    fields: {
      companyName: 'Bedrijfsnaam',
      companyCode: 'Bedrijfscode',
      logoUrl: 'Logo URL',
      retentionPeriod: 'Bewaarperiode (maanden)',
      maxApiRequests: 'Max API Verzoeken',
      expirationDate: 'Vervaldatum',
      styles: 'Stijlen',
      reportSettings: 'Rapportinstellingen',
      configModules: 'Configuratiemodules',
      senderName: 'Naam Afzender (voor alle gebeurtenissen)',
      senderEmail: 'Afzender Email (voor alle gebeurtenissen)',
      webhookUrl: 'Webhook URL',
      parentCompany: 'Moederbedrijf (optioneel)',
      emailAddress: 'Emailadres',
      agentEmailAddress: 'Agent Emailadres',
      smsNumber: 'SMS Nummer',
      agentSmsNumber: 'Agent SMS Nummer',
      emailSubject: 'Email Onderwerp',
      emailContent: 'Email Inhoud',
      smsContent: 'SMS Inhoud',
      language: 'Taal:'
    },
    placeholders: {
      companyName: 'Voer bedrijfsnaam in',
      companyCode: 'Wordt automatisch gegenereerd',
      logoUrl: 'https://voorbeeld.com/logo.png',
      senderName: 'Naam van uw bedrijf',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://jouwdomein.com/webhook',
      searchCompanies: 'Zoek bedrijven...',
      emailAddress: 'ontvanger@voorbeeld.com',
      agentEmailAddress: 'agent@voorbeeld.com',
      smsNumber: '+31612345678',
      emailSubject: 'Email onderwerp',
      emailContent: 'Email inhoud...',
      smsContent: 'SMS inhoud (max 160 tekens)...',
      noneRootCompany: 'Geen - Dit wordt een root bedrijf'
    },
    helperText: {
      companyCode: 'Gegenereerd uit ObjectID',
      fastTrackTooltip: 'Schakelt fast track functionaliteit uit voor dit bedrijf',
      parentCompany: 'Selecteer een moederbedrijf om een hiërarchische structuur te creëren',
      availableVariables: 'Focus op een templateveld hierboven om beschikbare variabelen te zien',
      characterCount: 'Aantal tekens: {{count}}/160',
      companiesAvailable: '{{total}} bedrijven beschikbaar · {{shown}} weergegeven',
      selectedParent: 'Geselecteerde moeder: {{name}}'
    },
    sections: {
      generalSettings: 'Algemene Instellingen',
      apiConfiguration: 'API-configuratie',
      hubConfiguration: 'Hubconfiguratie',
      validation: 'Validatie',
      globalSettings: 'Globale Instellingen',
      availableVariables: 'Beschikbare Variabelen',
      availableVariablesSticky: '📋 Beschikbare Variabelen',
      eventsConfiguration: 'Evenementen Configuratie',
      companyHierarchy: 'Bedrijfshiërarchie'
    },
    checkboxes: {
      disableFastTrack: 'Fast Track Uitschakelen',
      enableMileageCapture: 'Kilometerregistratie Inschakelen',
      enableBlurDetection: 'Kentekens Vervagen',
      enableVinScanning: 'VIN Scannen Inschakelen',
      enableBrandModelDetection: 'Merk & Model Detectie Inschakelen',
      enableInteriorDamageDetection: 'Detectie Interne Schade Inschakelen',
      enableDashboardWarningLights: 'Detectie Dashboard Waarschuwingen Inschakelen',
      showStartInstantInspection: 'Toon Start Directe Inspectie',
      showSendInspectionLink: 'Toon Inspectielink Verzenden',
      iaValidation: 'IA Validatie (Joelle-model)',
      enabled: 'Ingeschakeld',
      sms: 'SMS',
      email: 'Email',
      enableWebhook: 'Webhook Inschakelen'
    },
    buttons: {
      uploadLogo: 'Upload Logo',
      uploadJson: 'Upload JSON',
      clickToInsert: 'Klik om in te voegen'
    },
    addressees: {
      user: 'Gebruiker',
      customer: 'Klant',
      emailAddress: 'Emailadres',
      agent: 'Agent'
    },
    events: {
      selfInspectionCreation: 'Automatische Inspectie Aanmaak',
      manualChaseUp: 'Handmatig Follow-up Bericht',
      inspectionFinished: 'Inspectie Voltooid Bericht',
      damageReviewFinished: 'Schadebeoordeling Voltooid Bericht',
      shareUpdatedReport: 'Deel Bijgewerkt Rapport Bericht'
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
      companies: 'Bedrijven laden...'
    },
    messages: {
      noCompaniesFound: 'Geen bedrijven gevonden',
      invalidJson: 'Ongeldige JSON in stijlen, rapportinstellingen of moduleconfiguraties',
      createFailed: 'Bedrijf aanmaken mislukt: {{error}}'
    },
    validation: {
      companyNameRequired: 'Bedrijfsnaam is verplicht',
      logoUrlRequired: 'Logo URL is verplicht',
      validUrlRequired: 'Voer een geldige URL in',
      maxApiRequestsRequired: 'Max API verzoeken moet groter zijn dan 0',
      senderNameRequired: 'Naam afzender is verplicht'
    }
  },
  editForm: {
    pageTitle: 'Bewerk Bedrijf',
    pageTitleWithName: 'Bewerk Bedrijf: {{name}}',
    backToCompanies: 'Terug naar Bedrijven',
    saveButton: 'Wijzigingen Opslaan',
    cancel: 'Annuleer',
    loading: {
      title: 'Bewerk Bedrijf',
      message: 'Bedrijfsgegevens laden...'
    },
    banners: {
      archived: {
        title: 'Dit bedrijf is gearchiveerd',
        description: 'Dit bedrijf is momenteel gearchiveerd. Het API-token is uitgeschakeld en gebruikers hebben geen toegang. Je kunt het herstellen vanuit de bedrijfslijst.'
      },
      chaseupActive: {
        title: 'Follow-up Regels Actief',
        description: 'Dit bedrijf heeft {{count}} automatische follow-up regel(s) ingesteld voor tijdige acties.'
      },
      chaseupInactive: {
        title: 'Geen Follow-up Regels Ingesteld',
        description: 'Overweeg het instellen van automatische follow-up regels om tijdige acties bij openstaande inspecties te waarborgen.'
      }
    },
    buttons: {
      viewRules: 'Bekijk Regels',
      createRules: 'Maak Regels',
      addNewRule: 'Nieuwe Regel Toevoegen'
    },
    helperText: {
      fastTrackTooltip: 'Indien geselecteerd, worden inspecties direct als voltooid weergegeven bij ontvangst',
      parentCompanyNote: 'Opmerking: je kunt dit bedrijf niet als eigen moederbedrijf selecteren',
      configured: '✓ {{count}} geconfigureerd',
      hasContent: '✓ Bevat inhoud'
    },
    messages: {
      updateSuccess: 'Bedrijf succesvol bijgewerkt',
      updateFailed: 'Bedrijf bijwerken mislukt: {{error}}',
      loadFailed: 'Bedrijf laden mislukt: {{error}}'
    }
  }
} as const;
