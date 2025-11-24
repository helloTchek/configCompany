export const events = {
  title: 'Événements & Webhooks',
  subtitle: 'Configurer les modèles de notification et les destinataires pour différents événements',
  events: {
    selfInspectionCreation: 'Création d’Auto-Inspection',
    automatedChaseUp: 'Relance Automatisée',
    manualChaseUp: 'Relance Manuelle',
    inspectionFinished: 'Message de Fin d’Inspection',
    damageReviewFinished: 'Message de Fin d’Analyse des Dommages',
    shareUpdatedReport: 'Message de Partage du Rapport Mis à Jour'
  },
  recipients: {
    title: 'Destinataires',
    customerPhone: 'Numéro de Téléphone du Client',
    companyEmail: 'Adresse Email de l’Entreprise',
    agentEmail: 'Adresse Email de l’Agent',
    webhookUrl: 'URL du Webhook',
    addRecipient: 'Ajouter un Destinataire'
  },
  messageContent: {
    title: 'Contenu du Message',
    email: 'Email',
    sms: 'SMS',
    subject: 'Objet',
    htmlContent: 'Contenu HTML',
    textContent: 'Contenu Texte',
    characterCount: 'Nombre de caractères : {{count}}',
    pageLimit: 'Limite de pages : {{limit}}'
  },
  variables: {
    title: 'Variables Disponibles',
    description: 'Cliquez sur une variable pour la copier dans votre presse-papiers',
    customerName: 'Nom du Client',
    customerEmail: 'Email du Client',
    customerPhone: 'Téléphone du Client',
    inspectionId: 'ID de l’Inspection',
    inspectionLink: 'Lien de l’Inspection',
    vehicleMake: 'Marque du Véhicule',
    vehicleModel: 'Modèle du Véhicule',
    licensePlate: 'Plaque d’Immatriculation',
    companyName: 'Nom de l’Entreprise',
    agentName: 'Nom de l’Agent',
    inspectionDate: 'Date de l’Inspection',
    trackingUrl: 'URL de Suivi'
  },
  fields: {
    webhookUrl: 'URL du Webhook',
    senderName: 'Nom de l’Expéditeur (pour tous les événements)'
  },
  messages: {
    updateSuccess: 'Configuration des événements mise à jour avec succès',
    testSuccess: 'Message de test envoyé avec succès',
    testError: 'Échec de l’envoi du message de test',
    variableCopied: 'Variable copiée dans le presse-papiers'
  }
} as const;
