export const costs = {
  title: 'Cost Matrices',
  subtitle: 'Manage repair costs by part types, locations, and severities',
  create: 'Create New Matrix',
  edit: 'Edit Cost Matrix',
  fields: {
    company: 'Company',
    currency: 'Currency',
    taxRate: 'Tax Rate (%)',
    partsCount: 'Parts Count',
    partType: 'Part Type',
    location: 'Location',
    severity: 'Severity',
    cost: 'Cost'
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
  actions: {
    addPart: 'Add Part',
    removePart: 'Remove Part',
    importCsv: 'Import CSV',
    exportCsv: 'Export CSV',
    bulkEdit: 'Bulk Edit'
  },
  messages: {
    createSuccess: 'Cost matrix created successfully',
    updateSuccess: 'Cost matrix updated successfully',
    deleteSuccess: 'Cost matrix deleted successfully',
    importSuccess: 'CSV imported successfully',
    exportSuccess: 'CSV exported successfully',
    invalidCsv: 'Invalid CSV format'
  }
} as const;