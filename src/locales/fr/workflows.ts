export const workflows = {
  title: 'Flux de Travail',
  subtitle: 'Créer et gérer les flux de parcours d’inspection',
  create: 'Créer un Nouveau Parcours',
  edit: 'Modifier le Parcours',
  duplicate: 'Dupliquer le Parcours',
  fields: {
    name: 'Nom du Parcours',
    description: 'Description',
    company: 'Entreprise',
    blocksCount: 'Nombre de Blocs',
    status: 'Statut',
    isActive: 'Actif'
  },
  blocks: {
    title: 'Blocs du Parcours',
    addBlock: 'Ajouter un Bloc',
    form: 'Bloc Formulaire',
    shootInspection: 'Bloc Inspection Photo',
    fastTrack: 'Bloc Fast Track',
    addDamage: 'Bloc Ajouter Dommage',
    static: 'Bloc Écran Statique'
  },
  blockTypes: {
    form: {
      name: 'Bloc Formulaire',
      description: 'Formulaire personnalisé avec configuration JSON'
    },
    shootInspection: {
      name: 'Bloc Inspection Photo',
      description: 'Flux de capture photo'
    },
    fastTrack: {
      name: 'Bloc Fast Track',
      description: 'Processus d’inspection rapide'
    },
    addDamage: {
      name: 'Bloc Ajouter Dommage',
      description: 'Signalement manuel de dommages'
    },
    static: {
      name: 'Bloc Écran Statique',
      description: 'Écrans de contenu statique (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Configuration du Parcours',
    importJson: 'Importer JSON',
    exportJson: 'Exporter JSON'
  },
  messages: {
    createSuccess: 'Parcours créé avec succès',
    updateSuccess: 'Parcours mis à jour avec succès',
    deleteSuccess: 'Parcours supprimé avec succès',
    duplicateSuccess: 'Parcours dupliqué avec succès',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce parcours ?',
    noBlocks: 'Aucun bloc ajouté pour le moment. Cliquez sur "Ajouter un Bloc" pour commencer à construire votre parcours.',
    nameRequired: 'Veuillez saisir un nom de parcours',
    blocksRequired: 'Veuillez ajouter au moins un bloc au parcours'
  }
} as const;
