export const company = {
  title: 'Unternehmen',
  subtitle: 'Unternehmen, ihre Einstellungen und Konfigurationen verwalten',
  create: 'Neues Unternehmen erstellen',
  edit: 'Unternehmen bearbeiten',
  duplicate: 'Unternehmen duplizieren',
  fields: {
    name: 'Unternehmensname',
    identifier: 'Unternehmenskennung',
    contractType: 'Vertragstyp',
    businessSector: 'Geschäftsbereich',
    logoUrl: 'Logo-URL',
    retentionPeriod: 'Aufbewahrungsdauer (Monate)',
    disableFastTrack: 'Fast Track deaktivieren',
    enableMileageCapture: 'Kilometererfassung aktivieren',
    enableBlurDetection: 'Kennzeichenerkennung unkenntlich machen',
    enableVinScanning: 'VIN-Scan aktivieren',
    enableBrandModelDetection: 'Marken- und Modellerkennung aktivieren',
    iaValidation: 'IA-Validierung (Joelle-Modell)',
    humanValidationEnabled: 'Manuelle Validierung aktiviert',
    validationPriority: 'Validierungspriorität (0–5)',
    maxValidationDelay: 'Maximale Validierungsverzögerung (Minuten)',
    minTaskProcessingDuration: 'Mindestverarbeitungsdauer (Minuten)',
    showStartInstantInspection: 'Start der Sofortinspektion anzeigen',
    showSendInspectionLink: 'Inspektionslink senden anzeigen',
    parentCompany: 'Mutterunternehmen',
    childrenCount: 'Anzahl der Tochterunternehmen'
  },
  contractTypes: {
    client: 'Kunde',
    prospect: 'Interessent',
    test: 'Test',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Versicherung',
    leasing: 'Leasing',
    rental: 'Vermietung',
    fleetManagement: 'Fuhrparkmanagement',
    automotive: 'Automobil'
  },
  tabs: {
    general: 'Allgemeine Einstellungen',
    hierarchy: 'Hierarchie',
    journeySettings: 'Einstellungen für den Inspektionsablauf',
    savedJourneys: 'Gespeicherte Abläufe'
  },
  sections: {
    generalSettings: 'Allgemeine Einstellungen',
    hubConfiguration: 'Hub-Konfiguration',
    apiConfiguration: 'API-Konfiguration',
    validation: 'Validierung',
    eventsWebhooks: 'Ereignisse & Webhooks',
    companyHierarchy: 'Unternehmenshierarchie',
    childCompanies: 'Tochterunternehmen',
    hierarchyActions: 'Hierarchieaktionen'
  },
  messages: {
    createSuccess: 'Unternehmen erfolgreich erstellt',
    updateSuccess: 'Unternehmen erfolgreich aktualisiert',
    deleteSuccess: 'Unternehmen erfolgreich gelöscht',
    duplicateSuccess: 'Unternehmen erfolgreich dupliziert',
    deleteConfirm: 'Sind Sie sicher, dass Sie {{name}} löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    noChildCompanies: 'Dieses Unternehmen hat keine Tochterunternehmen.',
    duplicateWarning: 'Denken Sie daran: Sie müssen nach der Duplizierung Benutzer für das neue Unternehmen erstellen.'
  }
} as const;
