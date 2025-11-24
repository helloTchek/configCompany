export const users = {
  title: 'Gebruikers',
  subtitle: 'Beheer gebruikersaccounts en machtigingen',
  create: 'Nieuwe gebruiker aanmaken',
  edit: 'Gebruiker bewerken',
  fields: {
    email: 'E-mail',
    name: 'Naam',
    role: 'Rol',
    company: 'Bedrijf',
    status: 'Status',
    password: 'Wachtwoord',
    confirmPassword: 'Bevestig wachtwoord'
  },
  roles: {
    superAdmin: 'Superbeheerder',
    admin: 'Beheerder',
    user: 'Gebruiker'
  },
  status: {
    active: 'Actief',
    inactive: 'Inactief'
  },
  messages: {
    createSuccess: 'Gebruiker succesvol aangemaakt',
    updateSuccess: 'Gebruiker succesvol bijgewerkt',
    deleteSuccess: 'Gebruiker succesvol verwijderd',
    deleteConfirm: 'Weet u zeker dat u deze gebruiker wilt verwijderen?',
    passwordMismatch: 'Wachtwoorden komen niet overeen',
    emailExists: 'Er bestaat al een gebruiker met dit e-mailadres',
    lastLoginNever: 'Nooit'
  }
} as const;
