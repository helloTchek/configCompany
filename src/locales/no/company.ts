export const company = {
  title: 'Selskaper',
  subtitle: 'Administrer selskaper, deres innstillinger og konfigurasjoner',
  create: 'Opprett nytt selskap',
  edit: 'Rediger selskap',
  duplicate: 'Dupliser selskap',
  fields: {
    name: 'Firmanavn',
    identifier: 'Firma-ID',
    contractType: 'Kontrakttype',
    businessSector: 'Bransje',
    logoUrl: 'Logo-URL',
    retentionPeriod: 'Oppbevaringsperiode (måneder)',
    disableFastTrack: 'Deaktiver hurtigspor',
    enableMileageCapture: 'Aktiver kilometermåling',
    enableBlurDetection: 'Uskarphetsdeteksjon på skilt',
    enableVinScanning: 'Aktiver VIN-skanning',
    enableBrandModelDetection: 'Aktiver merke- og modellgjenkjenning',
    iaValidation: 'IA-validering (Joelle-modell)',
    humanValidationEnabled: 'Menneskelig validering aktivert',
    validationPriority: 'Valideringsprioritet (0-5)',
    maxValidationDelay: 'Maks valideringsforsinkelse (minutter)',
    minTaskProcessingDuration: 'Min. oppgavebehandlingstid (minutter)',
    showStartInstantInspection: 'Vis Start Umiddelbar Inspeksjon',
    showSendInspectionLink: 'Vis Send Inspeksjonslenke',
    parentCompany: 'Morselskap',
    childrenCount: 'Antall datterselskaper'
  },
  contractTypes: {
    client: 'Kunde',
    prospect: 'Potensiell kunde',
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
    eventsWebhooks: 'Hendelser og webhooks',
    companyHierarchy: 'Selskapsstruktur',
    childCompanies: 'Datterselskaper',
    hierarchyActions: 'Hierarki-handlinger'
  },
  messages: {
    createSuccess: 'Selskap opprettet',
    updateSuccess: 'Selskap oppdatert',
    deleteSuccess: 'Selskap slettet',
    duplicateSuccess: 'Selskap duplisert',
    deleteConfirm: 'Er du sikker på at du vil slette {{name}}? Denne handlingen kan ikke angres.',
    noChildCompanies: 'Dette selskapet har ingen datterselskaper.',
    duplicateWarning: 'Husk: Du må opprette brukere for det nye selskapet etter duplisering.'
  }
} as const;
