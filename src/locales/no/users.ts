export const users = {
  title: 'Brukere',
  subtitle: 'Administrer brukerkontoer og tillatelser',
  create: 'Opprett ny bruker',
  edit: 'Rediger bruker',
  fields: {
    email: 'E-post',
    name: 'Navn',
    role: 'Rolle',
    company: 'Selskap',
    status: 'Status',
    password: 'Passord',
    confirmPassword: 'Bekreft passord'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Bruker'
  },
  status: {
    active: 'Aktiv',
    inactive: 'Inaktiv'
  },
  messages: {
    createSuccess: 'Bruker opprettet',
    updateSuccess: 'Bruker oppdatert',
    deleteSuccess: 'Bruker slettet',
    deleteConfirm: 'Er du sikker på at du vil slette denne brukeren?',
    passwordMismatch: 'Passordene stemmer ikke overens',
    emailExists: 'En bruker med denne e-posten eksisterer allerede',
    lastLoginNever: 'Aldri'
  }
} as const;
