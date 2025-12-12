export const company = {
  title: 'Unternehmen',
  subtitle: 'Verwalten Sie Unternehmen, ihre Einstellungen und Konfigurationen',
  pageTitle: 'Unternehmensverwaltung',
  create: 'Neues Unternehmen erstellen',
  edit: 'Unternehmen bearbeiten',
  duplicate: 'Unternehmen duplizieren',
  archive: 'Unternehmen archivieren',
  unarchive: 'Archivierung aufheben',
  archived: 'ARCHIVIERT',
  fields: {
    name: 'Unternehmensname',
    identifier: 'Kennung',
    companyId: 'Unternehmens-ID',
    apiToken: 'API-Token',
    currentRequests: 'Aktuelle Anfragen',
    maxRequests: 'Maximale Anfragen',
    createdDate: 'Erstellungsdatum',
    parentCompany: 'Mutterunternehmen',
    children: 'Untergeordnete Unternehmen',
    chaseupRules: 'Erinnerungsregeln',
    actions: 'Aktionen',
    contractType: 'Vertragstyp',
    companyHierarchy: 'Unternehmenshierarchie',
    companyStatus: 'Unternehmensstatus',
    businessSector: 'Branche',
    logoUrl: 'Logo-URL',
    retentionPeriod: 'Aufbewahrungsdauer (Monate)',
    disableFastTrack: 'Fast Track deaktivieren',
    enableMileageCapture: 'Kilometererfassung aktivieren',
    enableBlurDetection: 'Kennzeichenerkennung unscharf machen',
    enableVinScanning: 'VIN-Scan aktivieren',
    enableBrandModelDetection: 'Marken- & Modellerkennung aktivieren',
    iaValidation: 'IA-Validierung (Joelle-Modell)',
    humanValidationEnabled: 'Menschliche Validierung aktiviert',
    validationPriority: 'Validierungspriorität (0-5)',
    maxValidationDelay: 'Max. Validierungsverzögerung (Minuten)',
    minTaskProcessingDuration: 'Min. Bearbeitungsdauer (Minuten)',
    showStartInstantInspection: 'Sofortinspektion starten anzeigen',
    showSendInspectionLink: 'Inspektionslink senden anzeigen',
    childrenCount: 'Anzahl untergeordneter Unternehmen',
    newCompanyName: 'Neuer Unternehmensname',
    reportSettings: 'Berichtseinstellungen',
    configModules: 'Modulkonfiguration',
    hierarchy: 'Hierarchie',
    senderName: 'Absendername (für alle Ereignisse)',
    webhookUrl: 'Webhook-URL',
    inheritanceOptions: 'Vererbungsoptionen'
  },
  placeholders: {
    search: 'Nach Name, Kennung, Unternehmens-ID oder API-Token suchen...',
    searchCompanies: 'Unternehmen suchen...',
    enterNewCompanyName: 'Neuen Unternehmensnamen eingeben',
    enterSenderName: 'Absendernamen eingeben',
    webhookUrlPlaceholder: 'https://beispiel.com/webhook',
    reportSettingsJson: 'JSON-Konfiguration für Berichtseinstellungen...',
    configModulesJson: 'JSON-Konfiguration für Moduleinstellungen...'
  },
  contractTypes: {
    allTypes: 'Alle Typen',
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
  hierarchy: {
    allCompanies: 'Alle Unternehmen',
    parentCompanies: 'Mutterunternehmen',
    childCompanies: 'Untergeordnete Unternehmen',
    parentCompanyOptional: 'Mutterunternehmen (optional)',
    none: 'Keines'
  },
  status: {
    activeCompanies: 'Aktive Unternehmen',
    archivedCompanies: 'Archivierte Unternehmen',
    allCompanies: 'Alle Unternehmen',
    archivedCount: '{{count}} archiviert'
  },
  chaseup: {
    active: '✓ Aktiv',
    create: '+ Erstellen'
  },
  tabs: {
    general: 'Allgemeine Einstellungen',
    hierarchy: 'Hierarchie',
    journeySettings: 'Einstellungen für Inspektionsablauf',
    savedJourneys: 'Gespeicherte Abläufe'
  },
  sections: {
    generalSettings: 'Allgemeine Einstellungen',
    hubConfiguration: 'Hub-Konfiguration',
    apiConfiguration: 'API-Konfiguration',
    validation: 'Validierung',
    eventsWebhooks: 'Ereignisse & Webhooks',
    companyHierarchy: 'Unternehmenshierarchie',
    childCompanies: 'Untergeordnete Unternehmen',
    hierarchyActions: 'Hierarchieaktionen'
  },
  filters: {
    filters: 'Filter',
    clearAllFilters: 'Alle Filter löschen',
    showingCompanies: '{{filtered}} von {{total}} Unternehmen angezeigt'
  },
  pagination: {
    previous: 'Zurück',
    next: 'Weiter',
    showing: 'Anzeige',
    to: 'bis',
    of: 'von',
    companies: 'Unternehmen'
  },
  banners: {
    viewingArchived: 'Archivierte Unternehmen werden angezeigt',
    archivedDescription:
      'Sie sehen derzeit archivierte Unternehmen. Deren API-Tokens sind deaktiviert. Klicken Sie auf „Archiv aufheben“, um den Zugriff wiederherzustellen.',
    chaseupRulesTitle: 'Automatisierte Erinnerungsregeln',
    chaseupRulesDescription:
      'Vergessen Sie nicht, automatisierte Erinnerungsregeln zu konfigurieren, um rechtzeitige Nachverfolgungen sicherzustellen.',
    manageChaseupRules: 'Erinnerungsregeln verwalten'
  },
  modals: {
    archive: {
      title: 'Unternehmen archivieren',
      unarchiveTitle: 'Archivierung aufheben',
      archiveQuestion: 'Möchten Sie <strong>{{name}}</strong> wirklich archivieren?',
      archiveDescription: 'Dadurch wird das API-Token sowie alle Benutzer des Unternehmens deaktiviert.',
      unarchiveQuestion: 'Möchten Sie die Archivierung von <strong>{{name}}</strong> wirklich aufheben?',
      unarchiveDescription: 'Dadurch wird das API-Token wieder aktiviert und das Unternehmen reaktiviert.',
      noteArchive: '<strong>Hinweis:</strong> Archivierte Unternehmen können über den Filter „Archivierte Unternehmen anzeigen“ wiederhergestellt werden.',
      noteUnarchive: '<strong>Hinweis:</strong> Durch die Aufhebung der Archivierung wird der Zugriff wiederhergestellt.',
      confirmArchive: 'Unternehmen archivieren',
      confirmUnarchive: 'Unternehmen wiederherstellen'
    },
    duplicate: {
      title: 'Unternehmen duplizieren',
      chooseOptions: 'Wählen Sie, was aus dem Quellunternehmen kopiert werden soll:',
      duplicateJourneys: 'Inspektionsabläufe duplizieren',
      duplicateCostSettings: 'Kosteneinstellungen duplizieren',
      duplicateSortingRules: 'Sortierregeln duplizieren',
      duplicateWebhookEvents: 'Webhook- & Ereigniskonfiguration duplizieren',
      editFields: 'Felder bearbeiten',
      senderNameRequired: 'Absendername ist erforderlich',
      webhookOptional: 'optional',
      warningTitle: 'Denken Sie daran:',
      warningMessage: 'Sie müssen nach der Duplizierung Benutzer für das neue Unternehmen erstellen.',
      detectionSettings: 'Erkennungs-, API- & Validierungseinstellungen',
      duplicateDetection: 'Erkennungsmodell-Konfiguration duplizieren',
      duplicateApi: 'API-Einstellungen duplizieren',
      duplicateValidation: 'Validierungseinstellungen duplizieren',
      companiesAvailable: '{{count}} Unternehmen verfügbar',
      filtered: 'gefiltert',
      showingAll: 'alle anzeigen',
      createCompany: 'Unternehmen erstellen'
    },
    cancel: 'Abbrechen'
  },
  validation: {
    companyNameRequired: 'Unternehmensname ist erforderlich',
    senderNameRequired: 'Absendername ist erforderlich',
    validUrlRequired: 'Bitte geben Sie eine gültige URL ein'
  },
  messages: {
    createSuccess: 'Unternehmen erfolgreich erstellt',
    updateSuccess: 'Unternehmen erfolgreich aktualisiert',
    deleteSuccess: 'Unternehmen erfolgreich gelöscht',
    duplicateSuccess: 'Unternehmen erfolgreich dupliziert',
    deleteConfirm: 'Sind Sie sicher, dass Sie {{name}} löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    noChildCompanies: 'Dieses Unternehmen hat keine untergeordneten Unternehmen.',
    duplicateWarning: 'Denken Sie daran: Sie müssen für das neue Unternehmen Benutzer erstellen.',
    noCompaniesFound: 'Keine Unternehmen gefunden, die Ihren Kriterien entsprechen.',
    failedToLoadCompanyData: 'Unternehmensdaten konnten nicht geladen werden'
  },
  actions: {
    edit: 'Bearbeiten',
    duplicate: 'Duplizieren',
    archive: 'Archivieren',
    unarchive: 'Archivierung aufheben',
    archiveTitle: 'Unternehmen archivieren',
    unarchiveTitle: 'Archivierung aufheben'
  },
  createForm: {
    pageTitle: 'Neues Unternehmen erstellen',
    backToCompanies: 'Zurück zu Unternehmen',
    createButton: 'Unternehmen erstellen',
    cancel: 'Abbrechen',
    tabs: {
      general: 'Allgemeine Einstellungen',
      eventsWebhooks: 'Ereignisse & Webhooks',
      hierarchy: 'Hierarchie'
    },
    fields: {
      companyName: 'Unternehmensname',
      companyCode: 'Unternehmenscode',
      logoUrl: 'Logo-URL',
      retentionPeriod: 'Aufbewahrungsdauer (Monate)',
      maxApiRequests: 'Max. API-Anfragen',
      expirationDate: 'Ablaufdatum',
      styles: 'Stile',
      reportSettings: 'Berichtseinstellungen',
      configModules: 'Modulkonfiguration',
      senderName: 'Absendername (für alle Ereignisse)',
      senderEmail: 'Absender-E-Mail (für alle Ereignisse)',
      webhookUrl: 'Webhook-URL',
      parentCompany: 'Mutterunternehmen (optional)',
      emailAddress: 'E-Mail-Adresse',
      agentEmailAddress: 'Agenten-E-Mail',
      smsNumber: 'SMS-Nummer',
      agentSmsNumber: 'Agenten-SMS-Nummer',
      emailSubject: 'Betreff',
      emailContent: 'E-Mail-Inhalt',
      smsContent: 'SMS-Inhalt',
      language: 'Sprache:'
    },
    placeholders: {
      companyName: 'Unternehmensname eingeben',
      companyCode: 'Wird automatisch generiert',
      logoUrl: 'https://example.com/logo.png',
      senderName: 'Ihr Unternehmensname',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://ihr-domain.com/webhook',
      searchCompanies: 'Unternehmen suchen...',
      emailAddress: 'empfaenger@example.com',
      agentEmailAddress: 'agent@example.com',
      smsNumber: '+491701234567',
      emailSubject: 'Betreff der E-Mail',
      emailContent: 'E-Mail-Inhalt...',
      smsContent: 'SMS-Inhalt (max. 160 Zeichen)...',
      noneRootCompany: 'Keine – dies wird ein Stammunternehmen sein'
    },
    helperText: {
      companyCode: 'Generiert aus ObjectID',
      fastTrackTooltip: 'Deaktiviert Fast-Track-Funktionen für dieses Unternehmen',
      parentCompany: 'Wählen Sie ein Mutterunternehmen, um eine Hierarchie zu erstellen',
      availableVariables: 'Wählen Sie ein Feld, um verfügbare Variablen anzuzeigen',
      characterCount: 'Zeichenanzahl: {{count}}/160',
      companiesAvailable: '{{total}} Unternehmen verfügbar · {{shown}} angezeigt',
      selectedParent: 'Ausgewähltes Mutterunternehmen: {{name}}'
    },
    sections: {
      generalSettings: 'Allgemeine Einstellungen',
      apiConfiguration: 'API-Konfiguration',
      hubConfiguration: 'Hub-Konfiguration',
      validation: 'Validierung',
      globalSettings: 'Globale Einstellungen',
      availableVariables: 'Verfügbare Variablen',
      availableVariablesSticky: '📋 Verfügbare Variablen',
      eventsConfiguration: 'Ereigniskonfiguration',
      companyHierarchy: 'Unternehmenshierarchie'
    },
    checkboxes: {
      disableFastTrack: 'Fast Track deaktivieren',
      enableMileageCapture: 'Kilometererfassung aktivieren',
      enableBlurDetection: 'Blur-Erkennung aktivieren',
      enableVinScanning: 'VIN-Scan aktivieren',
      enableBrandModelDetection: 'Marken- & Modellerkennung aktivieren',
      enableInteriorDamageDetection: 'Erkennung von Innenraumschäden aktivieren',
      enableDashboardWarningLights: 'Erkennung von Warnleuchten aktivieren',
      showStartInstantInspection: 'Sofortinspektion starten anzeigen',
      showSendInspectionLink: 'Inspektionslink senden anzeigen',
      iaValidation: 'IA-Validierung (Joelle-Modell)',
      enabled: 'Aktiviert',
      sms: 'SMS',
      email: 'E-Mail',
      enableWebhook: 'Webhook aktivieren'
    },
    buttons: {
      uploadLogo: 'Logo hochladen',
      uploadJson: 'JSON hochladen',
      clickToInsert: 'Zum Einfügen klicken'
    },
    addressees: {
      user: 'Benutzer',
      customer: 'Kunde',
      emailAddress: 'E-Mail-Adresse',
      agent: 'Agent'
    },
    events: {
      selfInspectionCreation: 'Erstellung der Selbstinspektion',
      manualChaseUp: 'Manuelle Erinnerung',
      inspectionFinished: 'Meldung: Inspektion abgeschlossen',
      damageReviewFinished: 'Meldung: Schadensprüfung abgeschlossen',
      shareUpdatedReport: 'Meldung: Aktualisierten Bericht teilen'
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
      companies: 'Lade Unternehmen...'
    },
    messages: {
      noCompaniesFound: 'Keine Unternehmen gefunden',
      invalidJson: 'Ungültiges JSON in Styles, Berichtseinstellungen oder Modulen',
      createFailed: 'Unternehmen konnte nicht erstellt werden: {{error}}'
    },
    validation: {
      companyNameRequired: 'Unternehmensname ist erforderlich',
      logoUrlRequired: 'Logo-URL ist erforderlich',
      validUrlRequired: 'Bitte geben Sie eine gültige URL ein',
      maxApiRequestsRequired: 'Maximale API-Anfragen müssen größer als 0 sein',
      senderNameRequired: 'Absendername ist erforderlich'
    }
  },
  editForm: {
    pageTitle: 'Unternehmen bearbeiten',
    pageTitleWithName: 'Unternehmen bearbeiten: {{name}}',
    backToCompanies: 'Zurück zu Unternehmen',
    saveButton: 'Änderungen speichern',
    cancel: 'Abbrechen',
    loading: {
      title: 'Unternehmen bearbeiten',
      message: 'Lade Unternehmensdaten...'
    },
    banners: {
      archived: {
        title: 'Dieses Unternehmen ist archiviert',
        description:
          'Dieses Unternehmen ist derzeit archiviert. Das API-Token ist deaktiviert und Benutzer haben keinen Zugriff. Sie können die Archivierung in der Unternehmensliste aufheben.'
      },
      chaseupActive: {
        title: 'Erinnerungsregeln aktiv',
        description:
          'Dieses Unternehmen hat {{count}} automatisierte Erinnerungsregel{{plural}} eingerichtet.'
      },
      chaseupInactive: {
        title: 'Keine Erinnerungsregeln konfiguriert',
        description:
          'Erwägen Sie das Einrichten automatisierter Erinnerungen, um rechtzeitige Nachverfolgungen sicherzustellen.'
      }
    },
    buttons: {
      viewRules: 'Regeln anzeigen',
      createRules: 'Regeln erstellen',
      addNewRule: 'Neue Regel hinzufügen'
    },
    helperText: {
      fastTrackTooltip: 'Wenn aktiviert, erscheint eine Inspektion sofort als abgeschlossen',
      parentCompanyNote: 'Hinweis: Dieses Unternehmen kann nicht als sein eigenes Mutterunternehmen ausgewählt werden',
      configured: '✓ {{count}} konfiguriert',
      hasContent: '✓ Inhalt vorhanden'
    },
    messages: {
      updateSuccess: 'Unternehmen erfolgreich aktualisiert',
      updateFailed: 'Aktualisierung fehlgeschlagen: {{error}}',
      loadFailed: 'Unternehmen konnte nicht geladen werden: {{error}}'
    }
  }
} as const;
