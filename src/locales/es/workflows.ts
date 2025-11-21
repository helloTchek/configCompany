export const workflows = {
  title: 'Workflows',
  subtitle: 'Create and manage inspection journey workflows',
  create: 'Create New Journey',
  edit: 'Edit Journey',
  duplicate: 'Duplicate Journey',
  fields: {
    name: 'Journey Name',
    description: 'Description',
    company: 'Company',
    blocksCount: 'Blocks Count',
    status: 'Status',
    isActive: 'Active'
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
    createSuccess: 'Journey created successfully',
    updateSuccess: 'Journey updated successfully',
    deleteSuccess: 'Journey deleted successfully',
    duplicateSuccess: 'Journey duplicated successfully',
    deleteConfirm: 'Are you sure you want to delete this journey?',
    noBlocks: 'No blocks added yet. Click "Add Block" to start building your journey.',
    nameRequired: 'Please enter a journey name',
    blocksRequired: 'Please add at least one block to the journey'
  }
} as const;