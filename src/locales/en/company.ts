export const company = {
  title: 'Companies',
  subtitle: 'Manage companies, their settings, and configurations',
  create: 'Create New Company',
  edit: 'Edit Company',
  duplicate: 'Duplicate Company',
  fields: {
    name: 'Company Name',
    identifier: 'Company Identifier',
    companyCode: 'Company Code',
    contractType: 'Contract Type',
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
    parentCompany: 'Parent Company',
    childrenCount: 'Children Count'
  },
  contractTypes: {
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
  messages: {
    createSuccess: 'Company created successfully',
    updateSuccess: 'Company updated successfully',
    deleteSuccess: 'Company deleted successfully',
    duplicateSuccess: 'Company duplicated successfully',
    deleteConfirm: 'Are you sure you want to delete {{name}}? This action cannot be undone.',
    noChildCompanies: 'This company has no child companies.',
    duplicateWarning: 'Remember: You will need to create users for the new company after duplication.'
  }
} as const;