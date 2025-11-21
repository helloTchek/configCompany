export const users = {
  title: 'Utenti',
  subtitle: 'Gestisci account utente e permessi',
  create: 'Crea Nuovo Utente',
  edit: 'Modifica Utente',
  fields: {
    email: 'Email',
    name: 'Nome',
    role: 'Ruolo',
    company: 'Azienda',
    status: 'Stato',
    password: 'Password',
    confirmPassword: 'Conferma Password'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Utente'
  },
  status: {
    active: 'Attivo',
    inactive: 'Inattivo'
  },
  messages: {
    createSuccess: 'Utente creato con successo',
    updateSuccess: 'Utente aggiornato con successo',
    deleteSuccess: 'Utente eliminato con successo',
    deleteConfirm: 'Sei sicuro di voler eliminare questo utente?',
    passwordMismatch: 'Le password non corrispondono',
    emailExists: 'Esiste già un utente con questa email',
    lastLoginNever: 'Mai'
  }
} as const;
