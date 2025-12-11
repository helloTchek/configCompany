export const workflows = {
  title: 'Inspection Journeys',
  subtitle: 'Journey Management',
  description: 'Create and manage inspection journey workflows',
  create: 'Create New Journey',
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
    newJourneyName: 'New Journey Name'
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
    enterJourneyName: 'Enter new journey name'
  },
  actions: {
    cancel: 'Cancel',
    delete: 'Delete Journey',
    duplicate: 'Duplicate Journey',
    clearFilters: 'Clear All Filters',
    previous: 'Previous',
    next: 'Next'
  },
  modals: {
    duplicateTitle: 'Duplicate Journey',
    duplicateMessage: 'Create a copy of',
    deleteTitle: 'Delete Journey',
    deleteMessage: 'Are you sure you want to delete {{name}}? This action cannot be undone.'
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
  configuration: {
    title: 'Journey Configuration',
    importJson: 'Import JSON',
    exportJson: 'Export JSON'
  },
  messages: {
    loading: 'Loading journeys...',
    noCompanySelected: 'No company selected',
    loadError: 'Failed to load journeys',
    createSuccess: 'Journey created successfully',
    updateSuccess: 'Journey updated successfully',
    deleteSuccess: 'Journey deleted successfully',
    deleteError: 'Failed to delete journey',
    duplicateSuccess: 'Journey duplicated successfully',
    duplicateError: 'Failed to duplicate journey',
    deleteConfirm: 'Are you sure you want to delete this journey?',
    noBlocks: 'No blocks added yet. Click "Add Block" to start building your journey.',
    nameRequired: 'Please enter a journey name',
    blocksRequired: 'Please add at least one block to the journey',
    viewAllWorkflows: 'View all workflows from all companies',
    workflowsPaginated: 'Workflows are paginated for better performance',
    noJourneysFound: 'No journeys found matching your criteria.'
  }
} as const;