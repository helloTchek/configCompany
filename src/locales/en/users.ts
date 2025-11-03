export const users = {
  title: 'Users',
  subtitle: 'Manage user accounts and permissions',
  create: 'Create New User',
  edit: 'Edit User',
  fields: {
    email: 'Email',
    name: 'Name',
    role: 'Role',
    company: 'Company',
    status: 'Status',
    password: 'Password',
    confirmPassword: 'Confirm Password'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'User'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive'
  },
  messages: {
    createSuccess: 'User created successfully',
    updateSuccess: 'User updated successfully',
    deleteSuccess: 'User deleted successfully',
    deleteConfirm: 'Are you sure you want to delete this user?',
    passwordMismatch: 'Passwords do not match',
    emailExists: 'A user with this email already exists',
    lastLoginNever: 'Never'
  }
} as const;