export const common = {
  actions: {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    upload: 'Upload',
    download: 'Download',
    duplicate: 'Duplicate',
    view: 'View',
    close: 'Close',
    refresh: 'Refresh',
    reset: 'Reset',
    clear: 'Clear',
    apply: 'Apply',
    remove: 'Remove',
    add: 'Add',
    update: 'Update',
    submit: 'Submit',
    login: 'Login',
    logout: 'Logout',
    loading: 'Loading...',
    retry: 'Retry',
    select: 'Select',
    clearFilters: 'Clear All Filters'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive',
    enabled: 'Enabled',
    disabled: 'Disabled',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived'
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: 'Must be at least {{min}} characters',
    maxLength: 'Must be no more than {{max}} characters',
    numeric: 'Must be a number',
    positive: 'Must be a positive number',
    url: 'Please enter a valid URL',
    phone: 'Please enter a valid phone number',
    password: 'Password must be at least 8 characters with uppercase, lowercase, and number'
  },
  messages: {
    noData: 'No data available',
    noResults: 'No results found',
    loadingError: 'Failed to load data',
    saveSuccess: 'Saved successfully',
    saveError: 'Failed to save',
    deleteSuccess: 'Deleted successfully',
    deleteError: 'Failed to delete',
    deleteConfirm: 'Are you sure you want to delete this item?',
    unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
    sessionExpired: 'Your session has expired. Please log in again.',
    accessDenied: 'Access denied. You do not have permission to view this page.',
    networkError: 'Network error. Please check your connection and try again.'
  },
  filters: {
    allTypes: 'All Types',
    allCompanies: 'All Companies',
    allPriorities: 'All Priorities'
  },
  fields: {
    actions: 'Actions',
    level: 'Level'
  },
  sections: {
    basicInformation: 'Basic Information',
    configuration: 'Configuration'
  },
  navigation: {
    companies: 'Companies',
    users: 'Users',
    workflows: 'Workflows',
    costs: 'Cost Matrices',
    sortingRules: 'Sorting Rules',
    chaseupRules: 'Automated Chase-up Rules',
    profile: 'Profile',
    help: 'Help',
    documentation: 'Documentation'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'User'
  },
  languages: {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    es: 'Español',
    nl: 'Nederlands',
    sv: 'Svenska',
    no: 'Norsk'
  }
} as const;