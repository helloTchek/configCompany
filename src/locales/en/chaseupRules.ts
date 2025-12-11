export const chaseupRules = {
  title: 'Automated Chase-up Rules',
  subtitle: 'Configure automated chase-up message rules for companies',
  create: 'Create New Rule',
  edit: 'Edit Chase-up Rule',
  createTitle: 'Create Chase-up Rule',
  editTitle: 'Edit Chase-up Rule',
  backToList: 'Back to Chase-up Rules',

  fields: {
    company: 'Company',
    type: 'Type',
    activationDate: 'Activation Date',
    utcTime: 'UTC Time',
    maxSendings: 'Max Sendings',
    firstDelay: 'First Delay',
    secondDelay: 'Second Delay',
    thirdDelay: 'Third Delay',
    actions: 'Actions'
  },

  types: {
    event: 'Event',
    anonymization: 'Anonymization'
  },

  tooltips: {
    edit: 'Edit',
    duplicate: 'Duplicate',
    delete: 'Delete'
  },

  labels: {
    filters: 'Filters',
    days: '{{count}} days',
    minutes: '{{count}} min',
    none: 'None',
    targetCompany: 'Target Company',
    note: 'Note',
    showingRules: 'Showing {{shown}} of {{total}} rules'
  },

  placeholders: {
    search: 'Search chase-up rules...',
    searchCompany: 'Search and select a company...'
  },

  actions: {
    cancel: 'Cancel',
    save: 'Save',
    create: 'Create Rule',
    update: 'Update Rule',
    delete: 'Delete Rule',
    deleteRule: 'Delete Rule',
    duplicate: 'Duplicate Rule',
    duplicateRule: 'Duplicate Rule',
    clearFilters: 'Clear All Filters',
    creating: 'Creating...',
    updating: 'Updating...'
  },

  sections: {
    basicConfiguration: 'Basic Configuration',
    affectedStatuses: 'Affected Inspection Statuses',
    delayConfiguration: 'Delay Configuration',
    firstReminder: 'First Reminder',
    secondReminder: 'Second Reminder',
    availableVariables: 'Available Variables'
  },

  form: {
    company: 'Company',
    companyRequired: 'Company is required',
    type: 'Type',
    activationDate: 'Activation Date',
    activationDateRequired: 'Activation date is required',
    utcSendingTime: 'UTC Sending Time',
    maxSendings: 'Max Sendings',
    firstDelayDays: 'First Delay (Days)',
    firstDelayMinutes: 'First Delay (Minutes)',
    secondDelayDays: 'Second Delay (Days)',
    secondDelayMinutes: 'Second Delay (Minutes)',
    loadingCompanies: 'Loading companies...',
    searchCompany: 'Search and select a company...',
    clickToInsert: 'Click to insert',
    statusesHelp: 'Rules will apply only to inspections in the selected statuses'
  },

  statuses: {
    inspectionCreated: 'Inspection Created',
    inspectionInProgress: 'Inspection In Progress',
    detectionFinished: 'Detection Finished',
    damageReviewOngoing: 'Damage Review Ongoing',
    completed: 'Completed',
    chasedUpManually: 'Chased-up Manually'
  },

  reminder: {
    webhook: 'Enable Webhook',
    enabled: 'Enabled',
    user: 'User',
    customer: 'Customer',
    emailAddress: 'Email Address',
    userEmailAddress: 'User Email Address',
    smsNumber: 'SMS Number',
    userSmsNumber: 'User SMS Number',
    sms: 'SMS',
    email: 'Email',
    language: 'Language',
    emailSubject: 'Email Subject',
    emailContent: 'Email Content',
    smsContent: 'SMS Content',
    smsMaxLength: 'SMS content (160 characters max)...',
    characterCount: 'Character count: {{count}}/160'
  },

  variables: {
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

  modals: {
    duplicateTitle: 'Duplicate Chase-up Rule',
    duplicateMessage: 'Duplicate the chase-up rule from {{company}} to a company',
    duplicateNote: 'The chase-up rule will be duplicated to the selected company with all its settings, delays, and message templates. You can select the same company to create a copy.',
    deleteTitle: 'Delete Chase-up Rule',
    deleteMessage: 'Are you sure you want to delete the chase-up rule for {{company}}? This action cannot be undone.'
  },

  messages: {
    loading: 'Loading...',
    loadError: 'Error loading chase-up rules',
    createSuccess: 'Chase-up rule created successfully',
    updateSuccess: 'Chase-up rule updated successfully',
    deleteSuccess: 'Chase-up rule deleted successfully',
    deleteError: 'Failed to delete chase-up rule',
    duplicateSuccess: 'Chase-up rule duplicated successfully',
    duplicateError: 'Failed to duplicate chase-up rule',
    noRulesFound: 'No chase-up rules found matching your criteria.',
    ruleNotFound: 'Rule Not Found',
    ruleNotFoundMessage: 'The chase-up rule you\'re looking for doesn\'t exist.'
  },

  filters: {
    allTypes: 'All Types',
    allCompanies: 'All Companies',
    all: 'All'
  }
} as const;
