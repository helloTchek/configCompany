export const events = {
  title: 'Hendelser & Webhooks',
  subtitle: 'Konfigurer varslingsmaler og mottakere for forskjellige hendelser',
  events: {
    selfInspectionCreation: 'Opprettelse av selvinspeksjon',
    automatedChaseUp: 'Automatisk oppfølgingsmelding',
    manualChaseUp: 'Manuell oppfølgingsmelding',
    inspectionFinished: 'Inspeksjon fullført melding',
    damageReviewFinished: 'Skaderapport ferdig melding',
    shareUpdatedReport: 'Del oppdatert rapport melding'
  },
  recipients: {
    title: 'Mottakere',
    customerPhone: 'Kundens telefonnummer',
    companyEmail: 'Selskapets e-postadresse',
    agentEmail: 'Agentens e-postadresse',
    webhookUrl: 'Webhook-URL',
    addRecipient: 'Legg til mottaker'
  },
  messageContent: {
    title: 'Meldingsinnhold',
    email: 'E-post',
    sms: 'SMS',
    subject: 'Emne',
    htmlContent: 'HTML-innhold',
    textContent: 'Tekstinnhold',
    characterCount: 'Antall tegn: {{count}}',
    pageLimit: 'Sidegrense: {{limit}}'
  },
  variables: {
    title: 'Tilgjengelige variabler',
    description: 'Klikk på en variabel for å kopiere den til utklippstavlen',
    customerName: 'Kundens navn',
    customerEmail: 'Kundens e-post',
    customerPhone: 'Kundens telefon',
    inspectionId: 'Inspeksjons-ID',
    inspectionLink: 'Inspeksjonslenke',
    vehicleMake: 'Bilmerke',
    vehicleModel: 'Bilmodell',
    licensePlate: 'Registreringsnummer',
    companyName: 'Selskapsnavn',
    agentName: 'Agentnavn',
    inspectionDate: 'Inspeksjonsdato',
    trackingUrl: 'Sporings-URL'
  },
  fields: {
    webhookUrl: 'Webhook-URL',
    senderName: 'Avsenders navn (for alle hendelser)'
  },
  messages: {
    updateSuccess: 'Hendelseskonfigurasjon oppdatert',
    testSuccess: 'Testmelding sendt',
    testError: 'Kunne ikke sende testmelding',
    variableCopied: 'Variabel kopiert til utklippstavlen'
  }
} as const;
