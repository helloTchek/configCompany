export const users = {
  title: 'Benutzer',
  subtitle: 'Benutzerkonten und Berechtigungen verwalten',
  create: 'Neuen Benutzer erstellen',
  edit: 'Benutzer bearbeiten',
  fields: {
    email: 'E-Mail',
    name: 'Name',
    role: 'Rolle',
    company: 'Unternehmen',
    status: 'Status',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen'
  },
  roles: {
    superAdmin: 'Superadmin',
    admin: 'Admin',
    user: 'Benutzer'
  },
  status: {
    active: 'Aktiv',
    inactive: 'Inaktiv'
  },
  messages: {
    createSuccess: 'Benutzer erfolgreich erstellt',
    updateSuccess: 'Benutzer erfolgreich aktualisiert',
    deleteSuccess: 'Benutzer erfolgreich gelöscht',
    deleteConfirm: 'Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?',
    passwordMismatch: 'Passwörter stimmen nicht überein',
    emailExists: 'Ein Benutzer mit dieser E-Mail existiert bereits',
    lastLoginNever: 'Nie'
  }
} as const;
