export const company = {
  title: 'Företag',
  subtitle: 'Hantera företag, deras inställningar och konfigurationer',
  create: 'Skapa nytt företag',
  edit: 'Redigera företag',
  duplicate: 'Duplicera företag',
  fields: {
    name: 'Företagsnamn',
    identifier: 'Företagsidentifierare',
    contractType: 'Kontrakttyp',
    businessSector: 'Bransch',
    logoUrl: 'Logotyp-URL',
    retentionPeriod: 'Bevarandeperiod (månader)',
    disableFastTrack: 'Inaktivera snabbspår',
    enableMileageCapture: 'Aktivera mätarställesregistrering',
    enableBlurDetection: 'Blanda registreringsskyltar',
    enableVinScanning: 'Aktivera VIN-skanning',
    enableBrandModelDetection: 'Aktivera märke- och modelligenkänning',
    iaValidation: 'AI-validering (Joelle-modell)',
    humanValidationEnabled: 'Mänsklig validering aktiverad',
    validationPriority: 'Valideringsprioritet (0-5)',
    maxValidationDelay: 'Maximal valideringsfördröjning (minuter)',
    minTaskProcessingDuration: 'Minsta uppgiftshanteringstid (minuter)',
    showStartInstantInspection: 'Visa Starta Direktinspektion',
    showSendInspectionLink: 'Visa Skicka Inspektionslänk',
    parentCompany: 'Moderföretag',
    childrenCount: 'Antal dotterföretag'
  },
  contractTypes: {
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
    hierarchyActions: 'Hierarkihantering'
  },
  messages: {
    createSuccess: 'Företaget skapades framgångsrikt',
    updateSuccess: 'Företaget uppdaterades framgångsrikt',
    deleteSuccess: 'Företaget raderades framgångsrikt',
    duplicateSuccess: 'Företaget duplicerades framgångsrikt',
    deleteConfirm: 'Är du säker på att du vill ta bort {{name}}? Denna åtgärd kan inte ångras.',
    noChildCompanies: 'Detta företag har inga dotterföretag.',
    duplicateWarning: 'Kom ihåg: Du måste skapa användare för det nya företaget efter duplicering.'
  }
} as const;
