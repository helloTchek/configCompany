export const settings = {
  title: 'Settings',
  subtitle: 'Configure application settings and styles',
  sections: {
    styles: 'Styles',
    reportSettings: 'Report Settings',
    configModules: 'Config Modules'
  },
  fields: {
    styles: 'Styles Configuration',
    reportSettings: 'Report Settings Configuration',
    configModules: 'Config Modules Configuration',
    urlBackground: 'Remove Background URL',
    instantInspection: 'Show Start Instant Inspection'
  },
  actions: {
    downloadJson: 'Download JSON',
    uploadJson: 'Upload JSON',
    resetToDefault: 'Reset to Default'
  },
  messages: {
    updateSuccess: 'Settings updated successfully',
    resetSuccess: 'Settings reset to default values',
    invalidJson: 'Invalid JSON format',
    uploadSuccess: 'Configuration uploaded successfully'
  }
} as const;