export const events = {
  title: 'Eventos y Webhooks',
  subtitle: 'Configurar plantillas de notificación y destinatarios para diferentes eventos',
  events: {
    selfInspectionCreation: 'Creación de autoinspección',
    automatedChaseUp: 'Mensaje de seguimiento automatizado',
    manualChaseUp: 'Mensaje de seguimiento manual',
    inspectionFinished: 'Mensaje de inspección finalizada',
    damageReviewFinished: 'Mensaje de revisión de daños finalizada',
    shareUpdatedReport: 'Mensaje de compartir informe actualizado'
  },
  recipients: {
    title: 'Destinatarios',
    customerPhone: 'Número de teléfono del cliente',
    companyEmail: 'Correo electrónico de la empresa',
    agentEmail: 'Correo electrónico del agente',
    webhookUrl: 'URL del Webhook',
    addRecipient: 'Agregar destinatario'
  },
  messageContent: {
    title: 'Contenido del mensaje',
    email: 'Correo electrónico',
    sms: 'SMS',
    subject: 'Asunto',
    htmlContent: 'Contenido HTML',
    textContent: 'Contenido de texto',
    characterCount: 'Cantidad de caracteres: {{count}}',
    pageLimit: 'Límite de páginas: {{limit}}'
  },
  variables: {
    title: 'Variables disponibles',
    description: 'Haga clic en cualquier variable para copiarla al portapapeles',
    customerName: 'Nombre del cliente',
    customerEmail: 'Correo electrónico del cliente',
    customerPhone: 'Teléfono del cliente',
    inspectionId: 'ID de inspección',
    inspectionLink: 'Enlace de inspección',
    vehicleMake: 'Marca del vehículo',
    vehicleModel: 'Modelo del vehículo',
    licensePlate: 'Matrícula',
    companyName: 'Nombre de la empresa',
    agentName: 'Nombre del agente',
    inspectionDate: 'Fecha de inspección',
    trackingUrl: 'URL de seguimiento'
  },
  fields: {
    webhookUrl: 'URL del Webhook',
    senderName: 'Nombre del remitente (para todos los eventos)'
  },
  messages: {
    updateSuccess: 'Configuración de evento actualizada con éxito',
    testSuccess: 'Mensaje de prueba enviado con éxito',
    testError: 'Error al enviar el mensaje de prueba',
    variableCopied: 'Variable copiada al portapapeles'
  }
} as const;
