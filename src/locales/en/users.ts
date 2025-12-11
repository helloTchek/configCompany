export const users = {
  title: 'Users',
  subtitle: 'Manage user accounts and permissions',
  create: 'Create New User',
  edit: 'Edit User',
  resetPassword: 'Reset Password',
  fields: {
    email: 'Email',
    name: 'Name',
    role: 'Role',
    company: 'Company',
    status: 'Status',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    lastLogin: 'Last Login',
    createdAt: 'Created At',
    actions: 'Actions'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'User'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive',
    disabled: 'Disabled'
  },
  tooltips: {
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    sendPasswordReset: 'Send Password Reset Email'
  },
  placeholders: {
    searchByEmail: 'Search by email or company...',
    selectRole: 'Select role',
    selectCompany: 'Select a company',
    searchCompanies: 'Search companies...',
    searchCompany: 'Search company...',
    allCompanies: 'All Companies',
    email: 'john@example.com'
  },
  labels: {
    filters: 'Filters',
    allRoles: 'All Roles',
    allStatus: 'All Status',
    show: 'Show',
    perPage: 'per page',
    showing: 'Showing {{from}} to {{to}} of {{total}} users',
    noUsers: 'No users found matching your criteria.',
    clearFilters: 'Clear Filters',
    noCompaniesFound: 'No companies found'
  },
  actions: {
    create: 'Create',
    save: 'Save Changes',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    resetPassword: 'Reset Password',
    sendResetLink: 'Send Reset Link',
    closeModal: 'Close',
    first: 'First',
    previous: 'Previous',
    next: 'Next',
    last: 'Last'
  },
  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    roleRequired: 'Role is required',
    companyRequired: 'Company is required'
  },
  messages: {
    createSuccess: 'User created successfully',
    updateSuccess: 'User updated successfully',
    deleteSuccess: 'User deleted successfully',
    deleteConfirm: 'Are you sure you want to delete {{email}}?',
    deleteUserFailed: 'Failed to delete user',
    updateUserFailed: 'Failed to update user',
    createUserFailed: 'Failed to create user',
    passwordMismatch: 'Passwords do not match',
    emailExists: 'A user with this email already exists',
    lastLoginNever: 'Never',
    loading: 'Loading...',
    passwordResetTitle: 'Password Reset Link',
    passwordResetMessage: 'A password reset link has been sent to:',
    passwordResetInstructions: 'The user will receive an email with instructions to reset their password.',
    passwordResetConfirm: 'Are you sure you want to send a password reset link to {{email}}?',
    passwordSetupInfo: 'The user will receive an email with instructions to set their password after account creation.',
    sendPasswordResetEmail: 'Send Password Reset Email',
    sendPasswordResetConfirm: 'Are you sure you want to send a password reset email to',
    passwordResetNote: 'The user will receive an email with instructions to reset their password.',
    sendResetEmail: 'Send Reset Email',
    passwordResetEmailSent: 'Password Reset Email Sent',
    emailSentSuccessfully: 'Email Sent Successfully',
    passwordResetSentTo: 'Password reset instructions have been sent to',
    whatHappensNext: 'What happens next:',
    resetStep1: 'The user will receive an email with a secure reset link',
    resetStep2: 'The link will expire in 24 hours for security',
    resetStep3: 'They can create a new password using the link',
    gotIt: 'Got it'
  }
} as const;