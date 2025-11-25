export const users = {
  title: 'Användare',
  subtitle: 'Hantera användarkonton och behörigheter',
  create: 'Skapa Ny Användare',
  edit: 'Redigera Användare',
  fields: {
    email: 'E-post',
    name: 'Namn',
    role: 'Roll',
    company: 'Företag',
    status: 'Status',
    password: 'Lösenord',
    confirmPassword: 'Bekräfta Lösenord'
  },
  roles: {
    superAdmin: 'Superadmin',
    admin: 'Admin',
    user: 'Användare'
  },
  status: {
    active: 'Aktiv',
    inactive: 'Inaktiv'
  },
  messages: {
    createSuccess: 'Användare skapad',
    updateSuccess: 'Användare uppdaterad',
    deleteSuccess: 'Användare borttagen',
    deleteConfirm: 'Är du säker på att du vill ta bort denna användare?',
    passwordMismatch: 'Lösenorden matchar inte',
    emailExists: 'En användare med denna e-postadress finns redan',
    lastLoginNever: 'Aldrig'
  }
} as const;
