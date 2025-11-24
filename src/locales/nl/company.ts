export const company = {
  title: 'Bedrijven',
  subtitle: 'Beheer bedrijven, hun instellingen en configuraties',
  create: 'Nieuw bedrijf aanmaken',
  edit: 'Bedrijf bewerken',
  duplicate: 'Bedrijf dupliceren',
  fields: {
    name: 'Bedrijfsnaam',
    identifier: 'Bedrijfsidentificatie',
    contractType: 'Contracttype',
    businessSector: 'Bedrijfstak',
    logoUrl: 'Logo-URL',
    retentionPeriod: 'Bewaartermijn (maanden)',
    disableFastTrack: 'Fast Track uitschakelen',
    enableMileageCapture: 'Kilometerregistratie inschakelen',
    enableBlurDetection: 'Kentekenplaten vervagen',
    enableVinScanning: 'VIN-scannen inschakelen',
    enableBrandModelDetection: 'Merk- en modelherkenning inschakelen',
    iaValidation: 'IA-validatie (Joelle-model)',
    humanValidationEnabled: 'Handmatige validatie ingeschakeld',
    validationPriority: 'Validatieprioriteit (0-5)',
    maxValidationDelay: 'Maximale validatievertraging (minuten)',
    minTaskProcessingDuration: 'Minimale taakverwerkingstijd (minuten)',
    showStartInstantInspection: 'Start instant inspectie tonen',
    showSendInspectionLink: 'Link voor inspectie verzenden tonen',
    parentCompany: 'Moederbedrijf',
    childrenCount: 'Aantal dochterbedrijven'
  },
  contractTypes: {
    client: 'Klant',
    prospect: 'Prospect',
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
  tabs: {
    general: 'Algemene instellingen',
    hierarchy: 'Hiërarchie',
    journeySettings: 'Inspectiereisinstellingen',
    savedJourneys: 'Opgeslagen reizen'
  },
  sections: {
    generalSettings: 'Algemene instellingen',
    hubConfiguration: 'Hub-configuratie',
    apiConfiguration: 'API-configuratie',
    validation: 'Validatie',
    eventsWebhooks: 'Evenementen & Webhooks',
    companyHierarchy: 'Bedrijfshiërarchie',
    childCompanies: 'Dochterbedrijven',
    hierarchyActions: 'Hiërarchieacties'
  },
  messages: {
    createSuccess: 'Bedrijf succesvol aangemaakt',
    updateSuccess: 'Bedrijf succesvol bijgewerkt',
    deleteSuccess: 'Bedrijf succesvol verwijderd',
    duplicateSuccess: 'Bedrijf succesvol gedupliceerd',
    deleteConfirm: 'Weet u zeker dat u {{name}} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.',
    noChildCompanies: 'Dit bedrijf heeft geen dochterbedrijven.',
    duplicateWarning: 'Onthoud: u moet gebruikers aanmaken voor het nieuwe bedrijf na duplicatie.'
  }
} as const;
