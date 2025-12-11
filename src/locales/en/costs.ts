export const costs = {
  title: 'Cost Matrices',
  subtitle: 'Manage cost matrices for vehicle repair estimates',
  create: 'Create New Matrix',
  edit: 'Edit Cost Matrix',
  fields: {
    company: 'Company',
    currency: 'Currency',
    taxRate: 'Tax Rate',
    partsCount: 'Parts Count',
    partType: 'Part Type',
    location: 'Location',
    severity: 'Severity',
    cost: 'Cost',
    matrix: 'Matrix',
    currencyAndTax: 'Currency & Tax',
    status: 'Status',
    lastUpdated: 'Last Updated',
    actions: 'Actions'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive'
  },
  severities: {
    minor: 'Minor',
    moderate: 'Moderate',
    major: 'Major',
    severe: 'Severe'
  },
  locations: {
    front: 'Front',
    rear: 'Rear',
    left: 'Left',
    right: 'Right',
    roof: 'Roof',
    interior: 'Interior'
  },
  tooltips: {
    view: 'View',
    edit: 'Edit',
    duplicate: 'Duplicate',
    delete: 'Delete'
  },
  labels: {
    costMatrices: 'Cost Matrices',
    manageMatrices: 'Select and manage your repair cost matrices',
    noMatrices: 'No cost matrices found',
    tryAdjustingSearch: 'Try adjusting your search',
    createToStart: 'Create a new cost matrix to get started',
    matrixConfig: 'Cost matrix configuration',
    tax: 'Tax',
    unknown: 'Unknown',
    unnamed: 'Unnamed',
    notAvailable: 'N/A',
    thisCompany: 'this company',
    showing: 'Showing {{from}} to {{to}} of {{total}} cost matrices',
    totalEntries: 'Total Entries',
    validated: 'Validated',
    created: 'Created',
    lastUpdated: 'Last Updated',
    newMatrixName: 'New matrix name',
    copy: '(Copy)',
    unknownError: 'Unknown error'
  },
  placeholders: {
    searchMatrices: 'Search cost matrices...',
    duplicatedMatrixName: 'Duplicated matrix name'
  },
  actions: {
    addPart: 'Add Part',
    removePart: 'Remove Part',
    importCsv: 'Import CSV',
    exportCsv: 'Export CSV',
    bulkEdit: 'Bulk Edit',
    downloadTemplate: 'Download Template',
    createMatrix: 'Create Matrix',
    previous: 'Previous',
    next: 'Next',
    cancel: 'Cancel',
    delete: 'Delete',
    duplicate: 'Duplicate',
    close: 'Close',
    editMatrix: 'Edit Matrix',
    confirmDelete: 'Yes, delete',
    deleting: 'Deleting...',
    duplicating: 'Duplicating...'
  },
  modals: {
    deleteTitle: 'Confirm Deletion',
    deleteConfirm: 'Are you sure you want to delete this matrix?',
    deleteMessage: 'You are about to delete the cost matrix "{{name}}" for {{company}}.',
    deleteWarning: 'This action is irreversible. All associated cost parameters will also be permanently deleted.',
    viewTitle: 'Cost Matrix Details',
    duplicateTitle: 'Duplicate Cost Matrix',
    duplicateHeading: 'Duplicate "{{name}}"',
    duplicateMessage: 'A complete copy of this cost matrix will be created with all its associated parameters.'
  },
  messages: {
    loading: 'Loading cost matrices...',
    loadError: 'Error loading cost matrices',
    createSuccess: 'Cost matrix created successfully',
    updateSuccess: 'Cost matrix updated successfully',
    deleteSuccess: 'Cost matrix deleted successfully',
    deleteError: 'Failed to delete: {{error}}',
    duplicateSuccess: 'Cost matrix "{{name}}" duplicated successfully',
    duplicateError: 'Failed to duplicate: {{error}}',
    importSuccess: 'CSV imported successfully',
    exportSuccess: 'CSV exported successfully',
    invalidCsv: 'Invalid CSV format'
  }
} as const;