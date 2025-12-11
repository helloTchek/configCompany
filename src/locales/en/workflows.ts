export const workflows = {
  title: 'Inspection Journeys',
  subtitle: 'Journey Management',
  description: 'Create and manage inspection journey workflows',
  create: 'Create New Journey',
  createTitle: 'Create Inspection Journey',
  edit: 'Edit Journey',
  duplicate: 'Duplicate Journey',
  fields: {
    name: 'Journey Name',
    journeyName: 'Journey Name',
    description: 'Description',
    company: 'Company',
    blocksCount: 'Blocks Count',
    status: 'Status',
    isActive: 'Active',
    actions: 'Actions',
    newJourneyName: 'New Journey Name',
    blockName: 'Block Name',
    activeStatus: 'Active Status'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive'
  },
  tooltips: {
    edit: 'Edit',
    duplicate: 'Duplicate',
    delete: 'Delete'
  },
  labels: {
    copy: '(Copy)',
    filters: 'Filters',
    showing: 'Showing {{count}} of {{total}} journeys',
    showingPagination: 'Showing {{from}} to {{to}} of {{total}} workflows'
  },
  placeholders: {
    searchJourneys: 'Search journeys...',
    allStatus: 'All Status',
    allCompanies: 'All Companies',
    searchCompany: 'Search and select company...',
    enterJourneyName: 'Enter journey name',
    enterNewJourneyName: 'Enter new journey name',
    enterDescription: 'Enter description (optional)',
    enterJourneyDescription: 'Enter journey description',
    enterBlockName: 'Enter block name',
    enterBlockDescription: 'Enter block description'
  },
  actions: {
    cancel: 'Cancel',
    delete: 'Delete Journey',
    duplicate: 'Duplicate Journey',
    clearFilters: 'Clear All Filters',
    previous: 'Previous',
    next: 'Next',
    back: 'Back',
    backToJourneys: 'Back to Journeys',
    save: 'Save Journey',
    saveAndAddAnother: 'Save & Add Another',
    configure: 'Configure',
    edit: 'Edit',
    remove: 'Remove',
    importJson: 'Import JSON',
    exportJson: 'Export JSON'
  },
  modals: {
    duplicateTitle: 'Duplicate Journey',
    duplicateMessage: 'Create a copy of',
    deleteTitle: 'Delete Journey',
    deleteMessage: 'Are you sure you want to delete {{name}}? This action cannot be undone.',
    addBlockTitle: 'Add Journey Block',
    selectBlockType: 'Select Block Type',
    configureShootInspection: 'Configure Shoot Inspection Block',
    configureStaticScreen: 'Configure Static Screen',
    configureFormBlock: 'Configure Form Block',
    configure: 'Configure {{blockType}}'
  },
  blocks: {
    title: 'Journey Blocks',
    addBlock: 'Add Block',
    form: 'Form Block',
    shootInspection: 'Shoot Inspection Block',
    fastTrack: 'Fast Track Block',
    addDamage: 'Add Damage Block',
    static: 'Static Screen Block'
  },
  blockTypes: {
    form: {
      name: 'Form Block',
      description: 'Custom form with JSON configuration'
    },
    shootInspection: {
      name: 'Shoot Inspection Block',
      description: 'Photo capture workflow'
    },
    fastTrack: {
      name: 'Fast Track Block',
      description: 'Quick inspection process'
    },
    addDamage: {
      name: 'Add Damage Block',
      description: 'Manual damage reporting'
    },
    static: {
      name: 'Static Screen Block',
      description: 'Static content screens (onboarding/offboarding)'
    }
  },
  messages: {
    loading: 'Loading journeys...',
    noCompanySelected: 'No company selected',
    loadError: 'Failed to load journeys',
    createSuccess: 'Journey created successfully',
    createError: 'Failed to create journey',
    updateSuccess: 'Journey updated successfully',
    deleteSuccess: 'Journey deleted successfully',
    deleteError: 'Failed to delete journey',
    duplicateSuccess: 'Journey duplicated successfully',
    duplicateError: 'Failed to duplicate journey',
    deleteConfirm: 'Are you sure you want to delete this journey?',
    noBlocks: 'No blocks added yet. Click "Add Block" to start building your journey.',
    nameRequired: 'Please enter a journey name',
    companyRequired: 'Please select a company',
    blocksRequired: 'Please add at least one block',
    viewAllWorkflows: 'View all workflows from all companies',
    workflowsPaginated: 'Workflows are paginated for better performance',
    noJourneysFound: 'No journeys found matching your criteria.',
    loadCompaniesError: 'Failed to load companies',
    invalidJson: 'Invalid JSON file',
    invalidJsonConfiguration: 'Invalid JSON configuration',
    configurationImported: 'Configuration imported successfully',
    formConfigArrayEmpty: 'Form configuration array is empty',
    staticConfigArrayEmpty: 'Static configuration array is empty',
    formConfigIdRequired: 'Form configuration must have an "id" field',
    staticConfigIdRequired: 'Static configuration must have an "id" field',
    saving: 'Saving...',
    configureThisBlock: 'Configure this block',
    noConfiguration: 'No configuration',
    block: 'Block'
  },
  configuration: {
    title: 'Journey Configuration',
    importJson: 'Import JSON',
    exportJson: 'Export JSON',
    formConfiguration: 'Form Configuration (Complete JSON)',
    staticScreensConfiguration: 'Static Screens Configuration',
    jsonContent: 'JSON Content',
    showExample: 'Show example structure',
    formConfigHelp: 'Enter the complete form configuration JSON including id, name, description, and config fields.',
    staticConfigHelp: 'Configure static screens (onboarding/offboarding). Enter the screens array configuration.',
    formConfigTip: 'Paste your complete form JSON including id, name, description, and config',
    staticConfigTip: 'Screen types: onboarding, offboarding, info',
    allowedDamageTypes: 'Allowed Damage Types'
  },
  sections: {
    journeyDetails: 'Journey Details'
  }
} as const;