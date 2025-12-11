export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'no', name: 'Norsk' }
];

export const getVariables = (t: (key: string) => string) => [
  { key: '{{customerName}}', name: t('chaseupRules.variables.customerName') },
  { key: '{{customerEmail}}', name: t('chaseupRules.variables.customerEmail') },
  { key: '{{customerPhone}}', name: t('chaseupRules.variables.customerPhone') },
  { key: '{{inspectionId}}', name: t('chaseupRules.variables.inspectionId') },
  { key: '{{inspectionLink}}', name: t('chaseupRules.variables.inspectionLink') },
  { key: '{{vehicleMake}}', name: t('chaseupRules.variables.vehicleMake') },
  { key: '{{vehicleModel}}', name: t('chaseupRules.variables.vehicleModel') },
  { key: '{{licensePlate}}', name: t('chaseupRules.variables.licensePlate') },
  { key: '{{companyName}}', name: t('chaseupRules.variables.companyName') },
  { key: '{{agentName}}', name: t('chaseupRules.variables.agentName') },
  { key: '{{inspectionDate}}', name: t('chaseupRules.variables.inspectionDate') },
  { key: '{{trackingUrl}}', name: t('chaseupRules.variables.trackingUrl') }
];
