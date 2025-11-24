export const users = {
  title: 'Utilisateurs',
  subtitle: 'Gérer les comptes utilisateurs et les permissions',
  create: 'Créer un Nouvel Utilisateur',
  edit: 'Modifier l’Utilisateur',
  fields: {
    email: 'Email',
    name: 'Nom',
    role: 'Rôle',
    company: 'Entreprise',
    status: 'Statut',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe'
  },
  roles: {
    superAdmin: 'Super Admin',
    admin: 'Admin',
    user: 'Utilisateur'
  },
  status: {
    active: 'Actif',
    inactive: 'Inactif'
  },
  messages: {
    createSuccess: 'Utilisateur créé avec succès',
    updateSuccess: 'Utilisateur mis à jour avec succès',
    deleteSuccess: 'Utilisateur supprimé avec succès',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    emailExists: 'Un utilisateur avec cet email existe déjà',
    lastLoginNever: 'Jamais'
  }
} as const;
