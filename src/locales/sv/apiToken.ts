export const apiToken = {
  title: 'API Tokens',
  subtitle: 'Manage API tokens and request limits',
  fields: {
    token: 'API Token',
    currentRequests: 'Current Requests',
    maxRequests: 'Max Requests',
    expiryDate: 'Expiry Date',
    decisionTree: 'Decision Tree Configuration',
    company: 'Company'
  },
  actions: {
    regenerate: 'Regenerate Token',
    resetRequests: 'Reset Request Count',
    extendExpiry: 'Extend Expiry Date'
  },
  messages: {
    regenerateConfirm: 'Are you sure you want to regenerate this token? The old token will stop working immediately.',
    regenerateSuccess: 'Token regenerated successfully',
    resetSuccess: 'Request count reset successfully',
    extendSuccess: 'Expiry date extended successfully'
  }
} as const;