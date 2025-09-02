export const events = {
  title: 'Events & Webhooks',
  subtitle: 'Configure notification templates and recipients for different events',
  events: {
    selfInspectionCreation: 'Self Inspection Creation',
    automatedChaseUp: 'Automated Chase-up Message',
    manualChaseUp: 'Manual Chase-up Message',
    inspectionFinished: 'Inspection Finished Message',
    damageReviewFinished: 'Damage Review Finished Message',
    shareUpdatedReport: 'Share Updated Report Message'
  },
  recipients: {
    title: 'Recipients',
    customerPhone: 'Customer Phone Number',
    companyEmail: 'Company Email Address',
    agentEmail: 'Agent Email Address',
    webhookUrl: 'Webhook URL',
    addRecipient: 'Add Recipient'
  },
  messageContent: {
    title: 'Message Content',
    email: 'Email',
    sms: 'SMS',
    subject: 'Subject',
    htmlContent: 'HTML Content',
    textContent: 'Text Content',
    characterCount: 'Character count: {{count}}',
    pageLimit: 'Page limit: {{limit}}'
  },
  variables: {
    title: 'Available Variables',
    description: 'Click any variable to copy it to your clipboard',
    customerName: 'Customer Name',
    customerEmail: 'Customer Email',
    customerPhone: 'Customer Phone',
    inspectionId: 'Inspection ID',
    inspectionLink: 'Inspection Link',
    vehicleMake: 'Vehicle Make',
    vehicleModel: 'Vehicle Model',
    licensePlate: 'License Plate',
    companyName: 'Company Name',
    agentName: 'Agent Name',
    inspectionDate: 'Inspection Date',
    trackingUrl: 'Tracking URL'
  },
  fields: {
    webhookUrl: 'Webhook URL',
    senderName: 'Sender Name (for all events)'
  },
  messages: {
    updateSuccess: 'Event configuration updated successfully',
    testSuccess: 'Test message sent successfully',
    testError: 'Failed to send test message',
    variableCopied: 'Variable copied to clipboard'
  }
} as const;