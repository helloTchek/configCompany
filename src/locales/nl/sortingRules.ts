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
    priority: 'Priority'
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
    loadingRule: 'Loading sorting rule...'
  }
} as const;