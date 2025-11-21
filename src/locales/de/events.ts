export const events = {
  title: 'Ereignisse & Webhooks',
  subtitle: 'Benachrichtigungsvorlagen und Empfänger für verschiedene Ereignisse konfigurieren',
  events: {
    selfInspectionCreation: 'Erstellung der Selbstinspektion',
    automatedChaseUp: 'Automatische Mahnung',
    manualChaseUp: 'Manuelle Mahnung',
    inspectionFinished: 'Nachricht: Inspektion abgeschlossen',
    damageReviewFinished: 'Nachricht: Schadensprüfung abgeschlossen',
    shareUpdatedReport: 'Nachricht: Aktualisierten Bericht teilen'
  },
  recipients: {
    title: 'Empfänger',
    customerPhone: 'Telefonnummer des Kunden',
    companyEmail: 'E-Mail-Adresse des Unternehmens',
    agentEmail: 'E-Mail-Adresse des Agenten',
    webhookUrl: 'Webhook-URL',
    addRecipient: 'Empfänger hinzufügen'
  },
  messageContent: {
    title: 'Nachrichteninhalt',
    email: 'E-Mail',
    sms: 'SMS',
    subject: 'Betreff',
    htmlContent: 'HTML-Inhalt',
    textContent: 'Textinhalt',
    characterCount: 'Zeichenanzahl: {{count}}',
    pageLimit: 'Seitenlimit: {{limit}}'
  },
  variables: {
    title: 'Verfügbare Variablen',
    description: 'Klicken Sie auf eine Variable, um sie in die Zwischenablage zu kopieren',
    customerName: 'Name des Kunden',
    customerEmail: 'E-Mail des Kunden',
    customerPhone: 'Telefonnummer des Kunden',
    inspectionId: 'Inspektions-ID',
    inspectionLink: 'Inspektionslink',
    vehicleMake: 'Fahrzeugmarke',
    vehicleModel: 'Fahrzeugmodell',
    licensePlate: 'Kennzeichen',
    companyName: 'Unternehmensname',
    agentName: 'Name des Agenten',
    inspectionDate: 'Inspektionsdatum',
    trackingUrl: 'Tracking-URL'
  },
  fields: {
    webhookUrl: 'Webhook-URL',
    senderName: 'Absendername (für alle Ereignisse)'
  },
  messages: {
    updateSuccess: 'Ereigniskonfiguration erfolgreich aktualisiert',
    testSuccess: 'Testnachricht erfolgreich gesendet',
    testError: 'Fehler beim Senden der Testnachricht',
    variableCopied: 'Variable in die Zwischenablage kopiert'
  }
} as const;
