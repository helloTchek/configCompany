export const chaseupRules = {
  title: 'Reglas de Seguimiento Automatizadas',
  subtitle: 'Configure reglas de mensajes de seguimiento automatizados para empresas',
  create: 'Crear Nueva Regla',
  edit: 'Editar Regla de Seguimiento',
  createTitle: 'Crear Regla de Seguimiento',
  editTitle: 'Editar Regla de Seguimiento',
  backToList: 'Volver a Reglas de Seguimiento',

  fields: {
    company: 'Empresa',
    type: 'Tipo',
    activationDate: 'Fecha de Activación',
    utcTime: 'Hora UTC',
    maxSendings: 'Envíos Máximos',
    firstDelay: 'Primer Retraso',
    secondDelay: 'Segundo Retraso',
    thirdDelay: 'Tercer Retraso',
    actions: 'Acciones'
  },

  types: {
    event: 'Evento',
    anonymization: 'Anonimización'
  },

  tooltips: {
    edit: 'Editar',
    duplicate: 'Duplicar',
    delete: 'Eliminar'
  },

  labels: {
    filters: 'Filtros',
    days: '{{count}} días',
    minutes: '{{count}} min',
    none: 'Ninguno',
    targetCompany: 'Empresa Objetivo',
    note: 'Nota',
    showingRules: 'Mostrando {{shown}} de {{total}} reglas'
  },

  placeholders: {
    search: 'Buscar reglas de seguimiento...',
    searchCompany: 'Buscar y seleccionar una empresa...'
  },

  actions: {
    cancel: 'Cancelar',
    save: 'Guardar',
    create: 'Crear Regla',
    update: 'Actualizar Regla',
    delete: 'Eliminar Regla',
    deleteRule: 'Eliminar Regla',
    duplicate: 'Duplicar Regla',
    duplicateRule: 'Duplicar Regla',
    clearFilters: 'Limpiar Todos los Filtros',
    creating: 'Creando...',
    updating: 'Actualizando...'
  },

  sections: {
    basicConfiguration: 'Configuración Básica',
    affectedStatuses: 'Estados de Inspección Afectados',
    delayConfiguration: 'Configuración de Retrasos',
    firstReminder: 'Primer Recordatorio',
    secondReminder: 'Segundo Recordatorio',
    availableVariables: 'Variables Disponibles'
  },

  form: {
    company: 'Empresa',
    companyRequired: 'La empresa es obligatoria',
    type: 'Tipo',
    activationDate: 'Fecha de Activación',
    activationDateRequired: 'La fecha de activación es obligatoria',
    utcSendingTime: 'Hora de Envío UTC',
    maxSendings: 'Envíos Máximos',
    firstDelayDays: 'Primer Retraso (Días)',
    firstDelayMinutes: 'Primer Retraso (Minutos)',
    secondDelayDays: 'Segundo Retraso (Días)',
    secondDelayMinutes: 'Segundo Retraso (Minutos)',
    loadingCompanies: 'Cargando empresas...',
    searchCompany: 'Buscar y seleccionar una empresa...',
    clickToInsert: 'Haga clic para insertar',
    statusesHelp: 'Las reglas se aplicarán solo a inspecciones en los estados seleccionados'
  },

  statuses: {
    inspectionCreated: 'Inspección Creada',
    inspectionInProgress: 'Inspección en Curso',
    detectionFinished: 'Detección Finalizada',
    damageReviewOngoing: 'Revisión de Daños en Curso',
    completed: 'Completado',
    chasedUpManually: 'Seguimiento Manual'
  },

  reminder: {
    webhook: 'Activar Webhook',
    enabled: 'Activado',
    user: 'Usuario',
    customer: 'Cliente',
    emailAddress: 'Dirección de Correo',
    userEmailAddress: 'Dirección de Correo del Usuario',
    smsNumber: 'Número SMS',
    userSmsNumber: 'Número SMS del Usuario',
    sms: 'SMS',
    email: 'Correo Electrónico',
    language: 'Idioma',
    emailSubject: 'Asunto del Correo',
    emailContent: 'Contenido del Correo',
    smsContent: 'Contenido del SMS',
    smsMaxLength: 'Contenido del SMS (máx. 160 caracteres)...',
    characterCount: 'Recuento de caracteres: {{count}}/160'
  },

  variables: {
    customerName: 'Nombre del Cliente',
    customerEmail: 'Correo del Cliente',
    customerPhone: 'Teléfono del Cliente',
    inspectionId: 'ID de Inspección',
    inspectionLink: 'Enlace de Inspección',
    vehicleMake: 'Marca del Vehículo',
    vehicleModel: 'Modelo del Vehículo',
    licensePlate: 'Matrícula',
    companyName: 'Nombre de la Empresa',
    agentName: 'Nombre del Agente',
    inspectionDate: 'Fecha de Inspección',
    trackingUrl: 'URL de Seguimiento'
  },

  modals: {
    duplicateTitle: 'Duplicar Regla de Seguimiento',
    duplicateMessage: 'Duplicar la regla de seguimiento de {{company}} a una empresa',
    duplicateNote: 'La regla de seguimiento se duplicará a la empresa seleccionada con todas sus configuraciones, retrasos y plantillas de mensajes. Puede seleccionar la misma empresa para crear una copia.',
    deleteTitle: 'Eliminar Regla de Seguimiento',
    deleteMessage: '¿Está seguro de que desea eliminar la regla de seguimiento para {{company}}? Esta acción no se puede deshacer.'
  },

  messages: {
    loading: 'Cargando...',
    loadError: 'Error al cargar las reglas de seguimiento',
    createSuccess: 'Regla de seguimiento creada con éxito',
    updateSuccess: 'Regla de seguimiento actualizada con éxito',
    deleteSuccess: 'Regla de seguimiento eliminada con éxito',
    deleteError: 'Error al eliminar la regla de seguimiento',
    duplicateSuccess: 'Regla de seguimiento duplicada con éxito',
    duplicateError: 'Error al duplicar la regla de seguimiento',
    noRulesFound: 'No se encontraron reglas de seguimiento que coincidan con sus criterios.',
    ruleNotFound: 'Regla no Encontrada',
    ruleNotFoundMessage: 'La regla de seguimiento que busca no existe.'
  },

  filters: {
    allTypes: 'Todos los Tipos',
    allCompanies: 'Todas las Empresas',
    all: 'Todo'
  }
} as const;
