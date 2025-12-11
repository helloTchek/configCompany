export const users = {
  title: 'Utilisateurs',
  subtitle: 'Gérer les comptes utilisateurs et les permissions',
  create: 'Créer un Nouvel Utilisateur',
  edit: 'Modifier l\'Utilisateur',
  resetPassword: 'Réinitialiser le Mot de Passe',
  fields: {
    email: 'Email',
    name: 'Nom',
    role: 'Rôle',
    company: 'Entreprise',
    status: 'Statut',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    lastLogin: 'Dernière Connexion',
    createdAt: 'Créé le'
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
  placeholders: {
    searchByEmail: 'Rechercher par email ou entreprise...',
    selectRole: 'Sélectionner un rôle',
    selectCompany: 'Sélectionner une entreprise',
    searchCompanies: 'Rechercher des entreprises...',
    searchCompany: 'Rechercher une entreprise...',
    allCompanies: 'Toutes les Entreprises',
    email: 'jean@exemple.com'
  },
  labels: {
    filters: 'Filtres',
    allRoles: 'Tous les Rôles',
    allStatus: 'Tous les Statuts',
    show: 'Afficher',
    perPage: 'par page',
    showing: 'Affichage de {{from}} à {{to}} sur {{total}} utilisateurs',
    noUsers: 'Aucun utilisateur trouvé correspondant à vos critères.',
    clearFilters: 'Effacer les Filtres',
    noCompaniesFound: 'Aucune entreprise trouvée'
  },
  actions: {
    create: 'Créer',
    save: 'Enregistrer les Modifications',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    resetPassword: 'Réinitialiser le Mot de Passe',
    sendResetLink: 'Envoyer le Lien de Réinitialisation',
    closeModal: 'Fermer',
    first: 'Premier',
    previous: 'Précédent',
    next: 'Suivant',
    last: 'Dernier'
  },
  validation: {
    emailRequired: 'L\'email est requis',
    emailInvalid: 'Veuillez entrer une adresse email valide',
    roleRequired: 'Le rôle est requis',
    companyRequired: 'L\'entreprise est requise'
  },
  messages: {
    createSuccess: 'Utilisateur créé avec succès',
    updateSuccess: 'Utilisateur mis à jour avec succès',
    deleteSuccess: 'Utilisateur supprimé avec succès',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer {{email}} ?',
    deleteUserFailed: 'Échec de la suppression de l\'utilisateur',
    updateUserFailed: 'Échec de la mise à jour de l\'utilisateur',
    createUserFailed: 'Échec de la création de l\'utilisateur',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    emailExists: 'Un utilisateur avec cet email existe déjà',
    lastLoginNever: 'Jamais',
    loading: 'Chargement...',
    passwordResetTitle: 'Lien de Réinitialisation du Mot de Passe',
    passwordResetMessage: 'Un lien de réinitialisation du mot de passe a été envoyé à :',
    passwordResetInstructions: 'L\'utilisateur recevra un email avec les instructions pour réinitialiser son mot de passe.',
    passwordResetConfirm: 'Êtes-vous sûr de vouloir envoyer un lien de réinitialisation à {{email}} ?',
    passwordSetupInfo: 'L\'utilisateur recevra un email avec les instructions pour définir son mot de passe après la création du compte.'
  }
} as const;
