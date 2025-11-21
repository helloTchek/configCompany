export const shootInspect = {
  title: 'Shoot Inspection Configuration',
  subtitle: 'Configure photo capture workflow and settings',
  fields: {
    name: 'Configuration Name',
    description: 'Description',
    maxRetries: 'Max Retries',
    qualityCheckEnabled: 'Quality Check Enabled',
    photoAngles: 'Photo Angles',
    allowedDamageTypes: 'Allowed Damage Types'
  },
  angles: {
    front: 'Front',
    back: 'Back',
    leftSide: 'Left Side',
    rightSide: 'Right Side',
    interior: 'Interior',
    dashboard: 'Dashboard'
  },
  damageTypes: {
    carBody: 'Car Body',
    interior: 'Interior',
    glazings: 'Glazings',
    dashboard: 'Dashboard',
    declaration: 'Declaration',
    documents: 'Documents'
  },
  steps: {
    title: 'Inspection Steps',
    addStep: 'Add Step',
    editStep: 'Edit Step',
    removeStep: 'Remove Step',
    stepOrder: 'Step {{order}}',
    stepTitle: 'Step Title',
    stepDescription: 'Step Description',
    isOptional: 'Optional Step',
    showHelp: 'Show Help',
    runDetection: 'Run Detection',
    thumbnailUrl: 'Thumbnail URL',
    overlayUrl: 'Overlay URL'
  },
  messages: {
    createSuccess: 'Shoot inspection configuration created successfully',
    updateSuccess: 'Shoot inspection configuration updated successfully',
    deleteSuccess: 'Shoot inspection configuration deleted successfully',
    stepAdded: 'Step added successfully',
    stepRemoved: 'Step removed successfully',
    invalidConfiguration: 'Invalid configuration format'
  }
} as const;