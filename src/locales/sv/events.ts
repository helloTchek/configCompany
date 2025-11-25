export const events = {
  title: 'Händelser & Webhooks',
  subtitle: 'Konfigurera meddelandemallar och mottagare för olika händelser',
  events: {
    selfInspectionCreation: 'Skapande av självinspektion',
    automatedChaseUp: 'Automatiskt uppföljningsmeddelande',
    manualChaseUp: 'Manuellt uppföljningsmeddelande',
    inspectionFinished: 'Inspektion slutförd',
    damageReviewFinished: 'Skaderevision slutförd',
    shareUpdatedReport: 'Dela uppdaterad rapport'
  },
  recipients: {
    title: 'Mottagare',
    customerPhone: 'Kundens telefonnummer',
    companyEmail: 'Företagets e-postadress',
    agentEmail: 'Agentens e-postadress',
    webhookUrl: 'Webhook-URL',
    addRecipient: 'Lägg till mottagare'
  },
  messageContent: {
    title: 'Meddelandeinnehåll',
    email: 'E-post',
    sms: 'SMS',
    subject: 'Ämne',
    htmlContent: 'HTML-innehåll',
    textContent: 'Textinnehåll',
    characterCount: 'Antal tecken: {{count}}',
    pageLimit: 'Sidgräns: {{limit}}'
  },
  variables: {
    title: 'Tillgängliga variabler',
    description: 'Klicka på en variabel för att kopiera den till urklipp',
    customerName: 'Kundnamn',
    customerEmail: 'Kundens e-post',
    customerPhone: 'Kundens telefon',
    inspectionId: 'Inspektions-ID',
    inspectionLink: 'Inspektionslänk',
    vehicleMake: 'Fordonstillverkare',
    vehicleModel: 'Fordonsmodell',
    licensePlate: 'Registreringsskylt',
    companyName: 'Företagsnamn',
    agentName: 'Agentnamn',
    inspectionDate: 'Inspektionsdatum',
    trackingUrl: 'Spårnings-URL'
  },
  fields: {
    webhookUrl: 'Webhook-URL',
    senderName: 'Avsändarnamn (för alla händelser)'
  },
  messages: {
    updateSuccess: 'Händelsekonfiguration uppdaterad',
    testSuccess: 'Testmeddelande skickat',
    testError: 'Misslyckades med att skicka testmeddelande',
    variableCopied: 'Variabel kopierad till urklipp'
  }
} as const;
