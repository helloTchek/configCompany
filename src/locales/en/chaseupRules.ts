export const chaseupRules = {
  title: 'Automated Chase-up Rules',
  subtitle: 'Configure automated chase-up message rules for companies',
  create: 'Create New Rule',
  edit: 'Edit Chase-up Rule',
  fields: {
    company: 'Company',
    type: 'Type',
    activationDate: 'Activation Date',
    utcTime: 'UTC Time',
    maxSendings: 'Max Sendings',
    firstDelay: 'First Delay',
    secondDelay: 'Second Delay',
    thirdDelay: 'Third Delay',
    actions: 'Actions'
  },
  types: {
    event: 'Event',
    anonymization: 'Anonymization'
  },
  tooltips: {
    edit: 'Edit',
    duplicate: 'Duplicate',
    delete: 'Delete'
  },
  labels: {
    filters: 'Filters',
    days: '{{count}} days',
    minutes: '{{count}} min',
    none: 'None',
    targetCompany: 'Target Company',
    note: 'Note',
    showingRules: 'Showing {{shown}} of {{total}} rules'
  },
  placeholders: {
    search: 'Search chase-up rules...',
    searchCompany: 'Search and select a company...'
  },
  actions: {
    cancel: 'Cancel',
    delete: 'Delete Rule',
    deleteRule: 'Delete Rule',
    duplicate: 'Duplicate Rule',
    duplicateRule: 'Duplicate Rule',
    clearFilters: 'Clear All Filters'
  },
  modals: {
    duplicateTitle: 'Duplicate Chase-up Rule',
    duplicateMessage: 'Duplicate the chase-up rule from {{company}} to a company',
    duplicateNote: 'The chase-up rule will be duplicated to the selected company with all its settings, delays, and message templates. You can select the same company to create a copy.',
    deleteTitle: 'Delete Chase-up Rule',
    deleteMessage: 'Are you sure you want to delete the chase-up rule for {{company}}? This action cannot be undone.'
  },
  messages: {
    loading: 'Loading...',
    loadError: 'Error loading chase-up rules',
    createSuccess: 'Chase-up rule created successfully',
    updateSuccess: 'Chase-up rule updated successfully',
    deleteSuccess: 'Chase-up rule deleted successfully',
    deleteError: 'Failed to delete chase-up rule',
    duplicateSuccess: 'Chase-up rule duplicated successfully',
    duplicateError: 'Failed to duplicate chase-up rule',
    noRulesFound: 'No chase-up rules found matching your criteria.'
  },
  filters: {
    allTypes: 'All Types',
    allCompanies: 'All Companies',
    all: 'All'
  }
} as const;
