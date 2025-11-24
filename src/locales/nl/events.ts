export const events = {
  title: 'Evenementen & Webhooks',
  subtitle: 'Configureer notificatiesjablonen en ontvangers voor verschillende evenementen',
  events: {
    selfInspectionCreation: 'Zelfinspectie Aanmaak',
    automatedChaseUp: 'Geautomatiseerd Achtervolgingsbericht',
    manualChaseUp: 'Handmatig Achtervolgingsbericht',
    inspectionFinished: 'Inspectie Voltooid Bericht',
    damageReviewFinished: 'Schadebeoordeling Voltooid Bericht',
    shareUpdatedReport: 'Bijgewerkt Rapport Delen Bericht'
  },
  recipients: {
    title: 'Ontvangers',
    customerPhone: 'Telefoonnummer Klant',
    companyEmail: 'E-mailadres Bedrijf',
    agentEmail: 'E-mailadres Agent',
    webhookUrl: 'Webhook URL',
    addRecipient: 'Ontvanger Toevoegen'
  },
  messageContent: {
    title: 'Berichtinhoud',
    email: 'E-mail',
    sms: 'SMS',
    subject: 'Onderwerp',
    htmlContent: 'HTML-inhoud',
    textContent: 'Tekstinhoud',
    characterCount: 'Aantal tekens: {{count}}',
    pageLimit: 'Paginalimiet: {{limit}}'
  },
  variables: {
    title: 'Beschikbare Variabelen',
    description: 'Klik op een variabele om deze naar je klembord te kopiëren',
    customerName: 'Naam Klant',
    customerEmail: 'E-mail Klant',
    customerPhone: 'Telefoon Klant',
    inspectionId: 'Inspectie-ID',
    inspectionLink: 'Inspectielink',
    vehicleMake: 'Merk Voertuig',
    vehicleModel: 'Model Voertuig',
    licensePlate: 'Kenteken',
    companyName: 'Bedrijfsnaam',
    agentName: 'Naam Agent',
    inspectionDate: 'Inspectiedatum',
    trackingUrl: 'Tracking URL'
  },
  fields: {
    webhookUrl: 'Webhook URL',
    senderName: 'Naam Afzender (voor alle evenementen)'
  },
  messages: {
    updateSuccess: 'Evenementconfiguratie succesvol bijgewerkt',
    testSuccess: 'Testbericht succesvol verzonden',
    testError: 'Testbericht verzenden mislukt',
    variableCopied: 'Variabele naar klembord gekopieerd'
  }
} as const;
