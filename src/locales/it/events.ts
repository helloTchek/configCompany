export const events = {
  title: 'Eventi & Webhook',
  subtitle: 'Configura modelli di notifica e destinatari per diversi eventi',
  events: {
    selfInspectionCreation: 'Creazione ispezione autonoma',
    automatedChaseUp: 'Messaggio di sollecito automatico',
    manualChaseUp: 'Messaggio di sollecito manuale',
    inspectionFinished: 'Messaggio ispezione completata',
    damageReviewFinished: 'Messaggio revisione danni completata',
    shareUpdatedReport: 'Messaggio condivisione rapporto aggiornato'
  },
  recipients: {
    title: 'Destinatari',
    customerPhone: 'Numero di telefono cliente',
    companyEmail: 'Email aziendale',
    agentEmail: 'Email agente',
    webhookUrl: 'URL Webhook',
    addRecipient: 'Aggiungi destinatario'
  },
  messageContent: {
    title: 'Contenuto messaggio',
    email: 'Email',
    sms: 'SMS',
    subject: 'Oggetto',
    htmlContent: 'Contenuto HTML',
    textContent: 'Contenuto testuale',
    characterCount: 'Numero caratteri: {{count}}',
    pageLimit: 'Limite pagine: {{limit}}'
  },
  variables: {
    title: 'Variabili disponibili',
    description: 'Clicca su una variabile per copiarla negli appunti',
    customerName: 'Nome cliente',
    customerEmail: 'Email cliente',
    customerPhone: 'Telefono cliente',
    inspectionId: 'ID ispezione',
    inspectionLink: 'Link ispezione',
    vehicleMake: 'Marca veicolo',
    vehicleModel: 'Modello veicolo',
    licensePlate: 'Targa',
    companyName: 'Nome azienda',
    agentName: 'Nome agente',
    inspectionDate: 'Data ispezione',
    trackingUrl: 'URL tracciamento'
  },
  fields: {
    webhookUrl: 'URL Webhook',
    senderName: 'Nome mittente (per tutti gli eventi)'
  },
  messages: {
    updateSuccess: 'Configurazione evento aggiornata con successo',
    testSuccess: 'Messaggio di test inviato con successo',
    testError: 'Invio messaggio di test fallito',
    variableCopied: 'Variabile copiata negli appunti'
  }
} as const;
