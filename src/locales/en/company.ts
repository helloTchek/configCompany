export const company = {
  title: 'Companies',
  subtitle: 'Manage companies, their settings, and configurations',
  pageTitle: 'Company Management',
  create: 'Create New Company',
  edit: 'Edit Company',
  duplicate: 'Duplicate Company',
  archive: 'Archive Company',
  unarchive: 'Unarchive Company',
  archived: 'ARCHIVED',
  fields: {
    name: 'Company Name',
    identifier: 'Identifier',
    companyId: 'Company ID',
    apiToken: 'API Token',
    currentRequests: 'Current Requests',
    maxRequests: 'Max Requests',
    createdDate: 'Created Date',
    parentCompany: 'Parent Company',
    children: 'Children',
    chaseupRules: 'Chase-up Rules',
    actions: 'Actions',
    contractType: 'Contract Type',
    companyHierarchy: 'Company Hierarchy',
    companyStatus: 'Company Status',
    businessSector: 'Business Sector',
    logoUrl: 'Logo URL',
    retentionPeriod: 'Retention Period (months)',
    disableFastTrack: 'Disable Fast Track',
    enableMileageCapture: 'Enable Mileage Capture',
    enableBlurDetection: 'Blur License plates',
    enableVinScanning: 'Enable VIN Scanning',
    enableBrandModelDetection: 'Enable Brand & Model Detection',
    iaValidation: 'IA Validation (Joelle model)',
    humanValidationEnabled: 'Human Validation Enabled',
    validationPriority: 'Validation Priority (0-5)',
    maxValidationDelay: 'Max Validation Delay (minutes)',
    minTaskProcessingDuration: 'Min Task Processing Duration (minutes)',
    showStartInstantInspection: 'Show Start Instant Inspection',
    showSendInspectionLink: 'Show Send Inspection Link',
    childrenCount: 'Children Count',
    newCompanyName: 'New Company Name',
    reportSettings: 'Report Settings',
    configModules: 'Config Modules Settings',
    hierarchy: 'Hierarchy',
    senderName: 'Sender Name (for all events)',
    webhookUrl: 'Webhook URL',
    inheritanceOptions: 'Inheritance Options'
  },
  placeholders: {
    search: 'Search by name, identifier, company ID, or API token...',
    searchCompanies: 'Search companies...',
    enterNewCompanyName: 'Enter new company name',
    enterSenderName: 'Enter sender name',
    webhookUrlPlaceholder: 'https://example.com/webhook',
    reportSettingsJson: 'Report settings JSON configuration...',
    configModulesJson: 'Config modules JSON configuration...'
  },
  contractTypes: {
    allTypes: 'All Types',
    client: 'Client',
    prospect: 'Prospect',
    test: 'Test',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Insurance',
    leasing: 'Leasing',
    rental: 'Rental',
    fleetManagement: 'Fleet Management',
    automotive: 'Automotive'
  },
  hierarchy: {
    allCompanies: 'All Companies',
    parentCompanies: 'Parent Companies',
    childCompanies: 'Child Companies',
    parentCompanyOptional: 'Parent Company (optional)',
    none: 'None'
  },
  status: {
    activeCompanies: 'Active Companies',
    archivedCompanies: 'Archived Companies',
    allCompanies: 'All Companies',
    archivedCount: '{{count}} archived'
  },
  chaseup: {
    active: '✓ Active',
    create: '+ Create'
  },
  tabs: {
    general: 'General Settings',
    hierarchy: 'Hierarchy',
    journeySettings: 'Inspection Journey Settings',
    savedJourneys: 'Saved Journeys'
  },
  sections: {
    generalSettings: 'General Settings',
    hubConfiguration: 'Hub Configuration',
    apiConfiguration: 'API Configuration',
    validation: 'Validation',
    eventsWebhooks: 'Events & Webhooks',
    companyHierarchy: 'Company Hierarchy',
    childCompanies: 'Child Companies',
    hierarchyActions: 'Hierarchy Actions'
  },
  filters: {
    filters: 'Filters',
    clearAllFilters: 'Clear All Filters',
    showingCompanies: 'Showing {{filtered}} of {{total}} companies'
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    companies: 'companies'
  },
  banners: {
    viewingArchived: 'Viewing Archived Companies',
    archivedDescription: 'You are currently viewing archived companies. These companies have their API tokens disabled. Click the archive button to unarchive and restore access.',
    chaseupRulesTitle: 'Automated Chase-up Rules',
    chaseupRulesDescription: 'Don\'t forget to configure automated chase-up rules for your companies to ensure timely follow-ups on pending inspections.',
    manageChaseupRules: 'Manage Chase-up Rules'
  },
  modals: {
    archive: {
      title: 'Archive Company',
      unarchiveTitle: 'Unarchive Company',
      archiveQuestion: 'Are you sure you want to archive <strong>{{name}}</strong>?',
      archiveDescription: 'This will disable the API token and all users from this company.',
      unarchiveQuestion: 'Are you sure you want to unarchive <strong>{{name}}</strong>?',
      unarchiveDescription: 'This will re-enable the API token and make the company active again.',
      noteArchive: '<strong>Note:</strong> Archived companies can be restored later using the "Show archived companies" filter.',
      noteUnarchive: '<strong>Note:</strong> Unarchiving will restore access to the company and its API token.',
      confirmArchive: 'Archive Company',
      confirmUnarchive: 'Unarchive Company'
    },
    duplicate: {
      title: 'Duplicate Company',
      chooseOptions: 'Choose what should be copied from the source company:',
      duplicateJourneys: 'Duplicate Inspection Journeys',
      duplicateCostSettings: 'Duplicate Cost Settings',
      duplicateSortingRules: 'Duplicate Sorting Rules',
      duplicateWebhookEvents: 'Duplicate Webhook & Events Configuration',
      editFields: 'Edit Fields',
      senderNameRequired: 'Sender name is required',
      webhookOptional: 'optional',
      warningTitle: 'Remember:',
      warningMessage: 'You will need to create users for the new company after duplication.',
      detectionSettings: 'Detection, API & Validation Settings',
      duplicateDetection: 'Duplicate Detection Model Configuration',
      duplicateApi: 'Duplicate API Settings',
      duplicateValidation: 'Duplicate Validation Settings',
      companiesAvailable: '{{count}} companies available',
      filtered: 'filtered',
      showingAll: 'showing all',
      createCompany: 'Create Company'
    },
    cancel: 'Cancel'
  },
  validation: {
    companyNameRequired: 'Company name is required',
    senderNameRequired: 'Sender name is required',
    validUrlRequired: 'Please enter a valid URL'
  },
  messages: {
    createSuccess: 'Company created successfully',
    updateSuccess: 'Company updated successfully',
    deleteSuccess: 'Company deleted successfully',
    duplicateSuccess: 'Company duplicated successfully',
    deleteConfirm: 'Are you sure you want to delete {{name}}? This action cannot be undone.',
    noChildCompanies: 'This company has no child companies.',
    duplicateWarning: 'Remember: You will need to create users for the new company after duplication.',
    noCompaniesFound: 'No companies found matching your criteria.',
    failedToLoadCompanyData: 'Failed to load company data'
  },
  actions: {
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive',
    unarchive: 'Unarchive',
    archiveTitle: 'Archive company',
    unarchiveTitle: 'Unarchive company'
  },
  createForm: {
    pageTitle: 'Create New Company',
    backToCompanies: 'Back to Companies',
    createButton: 'Create Company',
    cancel: 'Cancel',
    tabs: {
      general: 'General Settings',
      eventsWebhooks: 'Events & Webhooks',
      hierarchy: 'Hierarchy'
    },
    fields: {
      companyName: 'Company Name',
      companyCode: 'Company Code',
      logoUrl: 'Logo URL',
      retentionPeriod: 'Retention Period (months)',
      maxApiRequests: 'Max API Requests',
      expirationDate: 'Expiration Date',
      styles: 'Styles',
      reportSettings: 'Report Settings',
      configModules: 'Config Modules',
      senderName: 'Sender Name (for all events)',
      senderEmail: 'Sender Email (for all events)',
      webhookUrl: 'Webhook URL',
      parentCompany: 'Parent Company (optional)',
      emailAddress: 'Email Address',
      agentEmailAddress: 'Agent Email Address',
      smsNumber: 'SMS Number',
      agentSmsNumber: 'Agent SMS Number',
      emailSubject: 'Email Subject',
      emailContent: 'Email Content',
      smsContent: 'SMS Content',
      language: 'Language:'
    },
    placeholders: {
      companyName: 'Enter company name',
      companyCode: 'Will be auto-generated',
      logoUrl: 'https://example.com/logo.png',
      senderName: 'Your Company Name',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://your-domain.com/webhook',
      searchCompanies: 'Search companies...',
      emailAddress: 'recipient@example.com',
      agentEmailAddress: 'agent@example.com',
      smsNumber: '+33612345678',
      emailSubject: 'Email subject',
      emailContent: 'Email content...',
      smsContent: 'SMS content (160 characters max)...',
      noneRootCompany: 'None - This will be a root company'
    },
    helperText: {
      companyCode: 'Generated from ObjectID',
      fastTrackTooltip: 'Disables fast track functionality for this company',
      parentCompany: 'Select a parent company to create a hierarchical structure',
      availableVariables: 'Focus on a template field above to see variables for easy insertion',
      characterCount: 'Character count: {{count}}/160',
      companiesAvailable: '{{total}} companies available · {{shown}} shown',
      selectedParent: 'Selected parent: {{name}}'
    },
    sections: {
      generalSettings: 'General Settings',
      apiConfiguration: 'API Configuration',
      hubConfiguration: 'Hub Configuration',
      validation: 'Validation',
      globalSettings: 'Global Settings',
      availableVariables: 'Available Variables',
      availableVariablesSticky: '📋 Available Variables',
      eventsConfiguration: 'Events Configuration',
      companyHierarchy: 'Company Hierarchy'
    },
    checkboxes: {
      disableFastTrack: 'Disable Fast Track',
      enableMileageCapture: 'Enable Mileage Capture',
      enableBlurDetection: 'Enable Blur Detection',
      enableVinScanning: 'Enable VIN Scanning',
      enableBrandModelDetection: 'Enable Brand & Model Detection',
      enableInteriorDamageDetection: 'Enable Interior Damage Detection',
      enableDashboardWarningLights: 'Enable Dashboard Warning Lights Detection',
      showStartInstantInspection: 'Show Start Instant Inspection',
      showSendInspectionLink: 'Show Send Inspection Link',
      iaValidation: 'IA Validation (Joelle model)',
      enabled: 'Enabled',
      sms: 'SMS',
      email: 'Email',
      enableWebhook: 'Enable Webhook'
    },
    buttons: {
      uploadLogo: 'Upload Logo',
      uploadJson: 'Upload JSON',
      clickToInsert: 'Click to insert'
    },
    addressees: {
      user: 'User',
      customer: 'Customer',
      emailAddress: 'Email Address',
      agent: 'Agent'
    },
    events: {
      selfInspectionCreation: 'Self Inspection Creation',
      manualChaseUp: 'Manual Chase-up Message',
      inspectionFinished: 'Inspection Finished Message',
      damageReviewFinished: 'Damage Review Finished Message',
      shareUpdatedReport: 'Share Updated Report Message'
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
      companies: 'Loading companies...'
    },
    messages: {
      noCompaniesFound: 'No companies found',
      invalidJson: 'Invalid JSON in styles, report settings, or config modules',
      createFailed: 'Failed to create company: {{error}}'
    },
    validation: {
      companyNameRequired: 'Company name is required',
      logoUrlRequired: 'Logo URL is required',
      validUrlRequired: 'Please enter a valid URL',
      maxApiRequestsRequired: 'Max API requests must be greater than 0',
      senderNameRequired: 'Sender name is required'
    }
  },
  editForm: {
    pageTitle: 'Edit Company',
    pageTitleWithName: 'Edit Company: {{name}}',
    backToCompanies: 'Back to Companies',
    saveButton: 'Save Changes',
    cancel: 'Cancel',
    loading: {
      title: 'Edit Company',
      message: 'Loading company data...'
    },
    banners: {
      archived: {
        title: 'This company is archived',
        description: 'This company is currently archived. Its API token is disabled and users cannot access it. You can unarchive it from the companies list to restore access.'
      },
      chaseupActive: {
        title: 'Chase-up Rules Active',
        description: 'This company has {{count}} automated chase-up rule{{plural}} configured for timely follow-ups.'
      },
      chaseupInactive: {
        title: 'No Chase-up Rules Configured',
        description: 'Consider setting up automated chase-up rules to ensure timely follow-ups on pending inspections.'
      }
    },
    buttons: {
      viewRules: 'View Rules',
      createRules: 'Create Rules',
      addNewRule: 'Add New Rule'
    },
    helperText: {
      fastTrackTooltip: 'If checked, inspections will appear as completed as soon as received',
      parentCompanyNote: 'Note: You cannot select this company as its own parent',
      configured: '✓ {{count}} configured',
      hasContent: '✓ Has content'
    },
    messages: {
      updateSuccess: 'Company updated successfully',
      updateFailed: 'Failed to update company: {{error}}',
      loadFailed: 'Failed to load company: {{error}}'
    }
  }
} as const;