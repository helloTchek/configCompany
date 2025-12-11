export const sortingRules = {
  title: 'Sorting Rules',
  subtitle: 'Configure automated filtering and update rules per company',
  create: 'Create New Rule',
  edit: 'Edit Sorting Rule',
  fields: {
    company: 'Company',
    type: 'Type',
    fromCollection: 'From Collection',
    targetCollection: 'Target Collection',
    referenceKey: 'Reference Key',
    referencePrefix: 'Reference Prefix',
    filters: 'Filters (JSON)',
    updates: 'Updates (JSON)',
    processingPriority: 'Processing Priority',
    priority: 'Priority',
    actions: 'Actions'
  },
  types: {
    detectionPhase: 'Detection Phase',
    validationPhase: 'Validation Phase',
    reportGeneration: 'Report Generation'
  },
  priorities: {
    highest: '1 - Highest Priority',
    high: '2 - High Priority',
    medium: '3 - Medium Priority',
    low: '4 - Low Priority',
    lowest: '5 - Lowest Priority',
    highLevel: 'High Priority (1-2)',
    mediumLevel: 'Medium Priority (3-4)'
  },
  tooltips: {
    edit: 'Edit Sorting Rule',
    delete: 'Delete Sorting Rule'
  },
  labels: {
    filters: 'Filters',
    allTypes: 'All Types',
    allCompanies: 'All Companies',
    allPriorities: 'All Priorities',
    priorityLevel: 'Priority Level'
  },
  placeholders: {
    search: 'Search sorting rules...'
  },
  actions: {
    cancel: 'Cancel',
    delete: 'Delete',
    clearFilters: 'Clear All Filters'
  },
  modals: {
    deleteTitle: 'Delete Sorting Rule',
    deleteMessage: 'Are you sure you want to delete the sorting rule {{type}} ({{from}} → {{to}})?'
  },
  examples: {
    title: 'Configuration Examples',
    filterExamples: 'Filter Examples:',
    updateExamples: 'Update Examples:',
    filtersHelp: 'JSON object defining the filter criteria',
    updatesHelp: 'JSON object defining the updates to apply'
  },
  messages: {
    createSuccess: 'Sorting rule created successfully',
    updateSuccess: 'Sorting rule updated successfully',
    deleteSuccess: 'Sorting rule deleted successfully',
    invalidJson: 'Invalid JSON format',
    loadingRule: 'Loading sorting rule...',
    showingResults: 'Showing {{count}} of {{total}} sorting rules',
    noResults: 'No sorting rules found'
  }
} as const;