export const company = {
  title: 'Empresas',
  subtitle: 'Gestiona empresas, sus configuraciones y ajustes',
  pageTitle: 'Gestión de empresas',
  create: 'Crear nueva empresa',
  edit: 'Editar empresa',
  duplicate: 'Duplicar empresa',
  archive: 'Archivar empresa',
  unarchive: 'Desarchivar empresa',
  archived: 'ARCHIVADA',
  fields: {
    name: 'Nombre de la empresa',
    identifier: 'Identificador',
    companyId: 'ID de la empresa',
    apiToken: 'Token API',
    currentRequests: 'Solicitudes actuales',
    maxRequests: 'Solicitudes máximas',
    createdDate: 'Fecha de creación',
    parentCompany: 'Empresa matriz',
    children: 'Filiales',
    chaseupRules: 'Reglas de seguimiento',
    actions: 'Acciones',
    contractType: 'Tipo de contrato',
    companyHierarchy: 'Jerarquía de la empresa',
    companyStatus: 'Estado de la empresa',
    businessSector: 'Sector empresarial',
    logoUrl: 'URL del logo',
    retentionPeriod: 'Periodo de retención (meses)',
    disableFastTrack: 'Desactivar Fast Track',
    enableMileageCapture: 'Activar captura de kilometraje',
    enableBlurDetection: 'Difuminar matrículas',
    enableVinScanning: 'Activar escaneo VIN',
    enableBrandModelDetection: 'Activar detección de marca y modelo',
    iaValidation: 'Validación IA (modelo Joelle)',
    humanValidationEnabled: 'Validación humana activada',
    validationPriority: 'Prioridad de validación (0-5)',
    maxValidationDelay: 'Retraso máximo de validación (minutos)',
    minTaskProcessingDuration: 'Duración mínima de procesamiento (minutos)',
    showStartInstantInspection: 'Mostrar inicio de inspección instantánea',
    showSendInspectionLink: 'Mostrar enlace de inspección',
    childrenCount: 'Número de filiales',
    newCompanyName: 'Nombre de la nueva empresa',
    reportSettings: 'Configuración de informes',
    configModules: 'Configuración de módulos',
    hierarchy: 'Jerarquía',
    senderName: 'Nombre del remitente (para todos los eventos)',
    webhookUrl: 'URL del webhook',
    inheritanceOptions: 'Opciones de herencia'
  },
  placeholders: {
    search: 'Buscar por nombre, identificador, ID de empresa o token API...',
    searchCompanies: 'Buscar empresas...',
    enterNewCompanyName: 'Ingrese el nombre de la nueva empresa',
    enterSenderName: 'Ingrese el nombre del remitente',
    webhookUrlPlaceholder: 'https://ejemplo.com/webhook',
    reportSettingsJson: 'Configuración JSON de informes...',
    configModulesJson: 'Configuración JSON de módulos...'
  },
  contractTypes: {
    allTypes: 'Todos los tipos',
    client: 'Cliente',
    prospect: 'Prospecto',
    test: 'Prueba',
    demo: 'Demo'
  },
  businessSectors: {
    insurance: 'Seguros',
    leasing: 'Leasing',
    rental: 'Alquiler',
    fleetManagement: 'Gestión de flotas',
    automotive: 'Automotriz'
  },
  hierarchy: {
    allCompanies: 'Todas las empresas',
    parentCompanies: 'Empresas matrices',
    childCompanies: 'Filiales',
    parentCompanyOptional: 'Empresa matriz (opcional)',
    none: 'Ninguna'
  },
  status: {
    activeCompanies: 'Empresas activas',
    archivedCompanies: 'Empresas archivadas',
    allCompanies: 'Todas las empresas',
    archivedCount: '{{count}} archivadas'
  },
  chaseup: {
    active: '✓ Activa',
    create: '+ Crear'
  },
  tabs: {
    general: 'Configuración general',
    hierarchy: 'Jerarquía',
    journeySettings: 'Configuración del recorrido de inspección',
    savedJourneys: 'Recorridos guardados'
  },
  sections: {
    generalSettings: 'Configuración general',
    hubConfiguration: 'Configuración del hub',
    apiConfiguration: 'Configuración API',
    validation: 'Validación',
    eventsWebhooks: 'Eventos y webhooks',
    companyHierarchy: 'Jerarquía de la empresa',
    childCompanies: 'Filiales',
    hierarchyActions: 'Acciones de jerarquía'
  },
  filters: {
    filters: 'Filtros',
    clearAllFilters: 'Borrar todos los filtros',
    showingCompanies: 'Mostrando {{filtered}} de {{total}} empresas'
  },
  pagination: {
    previous: 'Anterior',
    next: 'Siguiente',
    showing: 'Mostrando',
    to: 'a',
    of: 'de',
    companies: 'empresas'
  },
  banners: {
    viewingArchived: 'Viendo empresas archivadas',
    archivedDescription: 'Actualmente estás viendo empresas archivadas. Sus tokens API están desactivados. Haz clic en archivar para reactivarlas.',
    chaseupRulesTitle: 'Reglas de seguimiento automáticas',
    chaseupRulesDescription: 'No olvides configurar reglas de seguimiento automáticas para garantizar el seguimiento oportuno de las inspecciones pendientes.',
    manageChaseupRules: 'Administrar reglas de seguimiento'
  },
  modals: {
    archive: {
      title: 'Archivar empresa',
      unarchiveTitle: 'Desarchivar empresa',
      archiveQuestion: '¿Seguro que deseas archivar <strong>{{name}}</strong>?',
      archiveDescription: 'Esto desactivará el token API y a todos los usuarios de esta empresa.',
      unarchiveQuestion: '¿Seguro que deseas desarchivar <strong>{{name}}</strong>?',
      unarchiveDescription: 'Esto reactivará el token API y hará que la empresa esté activa nuevamente.',
      noteArchive: '<strong>Nota:</strong> Las empresas archivadas pueden restaurarse más tarde usando el filtro "Mostrar empresas archivadas".',
      noteUnarchive: '<strong>Nota:</strong> Desarchivar restaurará el acceso a la empresa y su token API.',
      confirmArchive: 'Archivar empresa',
      confirmUnarchive: 'Desarchivar empresa'
    },
    duplicate: {
      title: 'Duplicar empresa',
      chooseOptions: 'Elige qué se debe copiar de la empresa fuente:',
      duplicateJourneys: 'Duplicar recorridos de inspección',
      duplicateCostSettings: 'Duplicar configuraciones de costos',
      duplicateSortingRules: 'Duplicar reglas de ordenamiento',
      duplicateWebhookEvents: 'Duplicar eventos y webhooks',
      editFields: 'Editar campos',
      senderNameRequired: 'Se requiere el nombre del remitente',
      webhookOptional: 'opcional',
      warningTitle: 'Recuerda:',
      warningMessage: 'Deberás crear usuarios para la nueva empresa después de la duplicación.',
      detectionSettings: 'Configuración de detección, API y validación',
      duplicateDetection: 'Duplicar configuración del modelo de detección',
      duplicateApi: 'Duplicar configuración API',
      duplicateValidation: 'Duplicar configuración de validación',
      companiesAvailable: '{{count}} empresas disponibles',
      filtered: 'filtradas',
      showingAll: 'mostrando todas',
      createCompany: 'Crear empresa'
    },
    cancel: 'Cancelar'
  },
  validation: {
    companyNameRequired: 'El nombre de la empresa es obligatorio',
    senderNameRequired: 'El nombre del remitente es obligatorio',
    validUrlRequired: 'Por favor ingresa una URL válida'
  },
  messages: {
    createSuccess: 'Empresa creada con éxito',
    updateSuccess: 'Empresa actualizada con éxito',
    deleteSuccess: 'Empresa eliminada con éxito',
    duplicateSuccess: 'Empresa duplicada con éxito',
    deleteConfirm: '¿Seguro que deseas eliminar {{name}}? Esta acción no se puede deshacer.',
    noChildCompanies: 'Esta empresa no tiene filiales.',
    duplicateWarning: 'Recuerda: Deberás crear usuarios para la nueva empresa después de la duplicación.',
    noCompaniesFound: 'No se encontraron empresas que coincidan con tus criterios.',
    failedToLoadCompanyData: 'Error al cargar los datos de la empresa'
  },
  actions: {
    edit: 'Editar',
    duplicate: 'Duplicar',
    archive: 'Archivar',
    unarchive: 'Desarchivar',
    archiveTitle: 'Archivar empresa',
    unarchiveTitle: 'Desarchivar empresa'
  },
  createForm: {
    pageTitle: 'Crear nueva empresa',
    backToCompanies: 'Volver a empresas',
    createButton: 'Crear empresa',
    cancel: 'Cancelar',
    tabs: {
      general: 'Configuración general',
      eventsWebhooks: 'Eventos y webhooks',
      hierarchy: 'Jerarquía'
    },
    fields: {
      companyName: 'Nombre de la empresa',
      companyCode: 'Código de la empresa',
      logoUrl: 'URL del logo',
      retentionPeriod: 'Periodo de retención (meses)',
      maxApiRequests: 'Máx. solicitudes API',
      expirationDate: 'Fecha de expiración',
      styles: 'Estilos',
      reportSettings: 'Configuración de informes',
      configModules: 'Configuración de módulos',
      senderName: 'Nombre del remitente (para todos los eventos)',
      senderEmail: 'Correo del remitente (para todos los eventos)',
      webhookUrl: 'URL Webhook',
      parentCompany: 'Empresa matriz (opcional)',
      emailAddress: 'Correo electrónico',
      agentEmailAddress: 'Correo del agente',
      smsNumber: 'Número de SMS',
      agentSmsNumber: 'Número de SMS del agente',
      emailSubject: 'Asunto del correo',
      emailContent: 'Contenido del correo',
      smsContent: 'Contenido del SMS',
      language: 'Idioma:'
    },
    placeholders: {
      companyName: 'Ingrese nombre de la empresa',
      companyCode: 'Se generará automáticamente',
      logoUrl: 'https://ejemplo.com/logo.png',
      senderName: 'Nombre de tu empresa',
      senderEmail: 'noreply@tchek.ai',
      webhookUrl: 'https://tu-dominio.com/webhook',
      searchCompanies: 'Buscar empresas...',
      emailAddress: 'destinatario@ejemplo.com',
      agentEmailAddress: 'agente@ejemplo.com',
      smsNumber: '+34123456789',
      emailSubject: 'Asunto del correo',
      emailContent: 'Contenido del correo...',
      smsContent: 'Contenido del SMS (máx. 160 caracteres)...',
      noneRootCompany: 'Ninguna - Esta será una empresa raíz'
    },
    helperText: {
      companyCode: 'Generado a partir del ObjectID',
      fastTrackTooltip: 'Desactiva la funcionalidad Fast Track para esta empresa',
      parentCompany: 'Selecciona una empresa matriz para crear una estructura jerárquica',
      availableVariables: 'Selecciona un campo de plantilla arriba para ver las variables disponibles',
      characterCount: 'Número de caracteres: {{count}}/160',
      companiesAvailable: '{{total}} empresas disponibles · {{shown}} mostradas',
      selectedParent: 'Matriz seleccionada: {{name}}'
    },
    sections: {
      generalSettings: 'Configuración general',
      apiConfiguration: 'Configuración API',
      hubConfiguration: 'Configuración del hub',
      validation: 'Validación',
      globalSettings: 'Configuración global',
      availableVariables: 'Variables disponibles',
      availableVariablesSticky: '📋 Variables disponibles',
      eventsConfiguration: 'Configuración de eventos',
      companyHierarchy: 'Jerarquía de la empresa'
    },
    checkboxes: {
      disableFastTrack: 'Desactivar Fast Track',
      enableMileageCapture: 'Activar captura de kilometraje',
      enableBlurDetection: 'Activar difuminado',
      enableVinScanning: 'Activar escaneo VIN',
      enableBrandModelDetection: 'Activar detección marca & modelo',
      enableInteriorDamageDetection: 'Activar detección de daños interiores',
      enableDashboardWarningLights: 'Activar detección de luces de advertencia',
      showStartInstantInspection: 'Mostrar inicio de inspección instantánea',
      showSendInspectionLink: 'Mostrar enlace de inspección',
      iaValidation: 'Validación IA (modelo Joelle)',
      enabled: 'Activado',
      sms: 'SMS',
      email: 'Correo',
      enableWebhook: 'Activar Webhook'
    },
    buttons: {
      uploadLogo: 'Subir logo',
      uploadJson: 'Subir JSON',
      clickToInsert: 'Clic para insertar'
    },
    addressees: {
      user: 'Usuario',
      customer: 'Cliente',
      emailAddress: 'Correo electrónico',
      agent: 'Agente'
    },
    events: {
      selfInspectionCreation: 'Creación de autoinspección',
      manualChaseUp: 'Mensaje de seguimiento manual',
      inspectionFinished: 'Mensaje de inspección finalizada',
      damageReviewFinished: 'Mensaje de revisión de daños finalizada',
      shareUpdatedReport: 'Mensaje compartir informe actualizado'
    },
    languages: {
      en: 'Inglés',
      fr: 'Francés',
      de: 'Alemán',
      it: 'Italiano',
      es: 'Español',
      nl: 'Neerlandés',
      sv: 'Sueco',
      no: 'Noruego'
    },
    loading: {
      companies: 'Cargando empresas...'
    },
    messages: {
      noCompaniesFound: 'No se encontraron empresas',
      invalidJson: 'JSON inválido en estilos, configuración de informes o módulos',
      createFailed: 'Error al crear empresa: {{error}}'
    },
    validation: {
      companyNameRequired: 'Se requiere el nombre de la empresa',
      logoUrlRequired: 'Se requiere la URL del logo',
      validUrlRequired: 'Por favor ingresa una URL válida',
      maxApiRequestsRequired: 'Las solicitudes máximas de API deben ser mayores que 0',
      senderNameRequired: 'Se requiere el nombre del remitente'
    }
  },
  editForm: {
    pageTitle: 'Editar empresa',
    pageTitleWithName: 'Editar empresa: {{name}}',
    backToCompanies: 'Volver a empresas',
    saveButton: 'Guardar cambios',
    cancel: 'Cancelar',
    loading: {
      title: 'Editar empresa',
      message: 'Cargando datos de la empresa...'
    },
    banners: {
      archived: {
        title: 'Esta empresa está archivada',
        description: 'Actualmente esta empresa está archivada. Su token API está desactivado y los usuarios no pueden acceder. Puedes desarchivarla desde la lista de empresas.'
      },
      chaseupActive: {
        title: 'Reglas de seguimiento activas',
        description: 'Esta empresa tiene {{count}} regla(s) de seguimiento automatizada(s) configurada(s) para un seguimiento oportuno.'
      },
      chaseupInactive: {
        title: 'No hay reglas de seguimiento configuradas',
        description: 'Considera configurar reglas de seguimiento automáticas para garantizar el seguimiento de inspecciones pendientes.'
      }
    },
    buttons: {
      viewRules: 'Ver reglas',
      createRules: 'Crear reglas',
      addNewRule: 'Agregar nueva regla'
    },
    helperText: {
      fastTrackTooltip: 'Si está marcado, las inspecciones aparecerán como completadas al recibirlas',
      parentCompanyNote: 'Nota: No puedes seleccionar esta empresa como su propia matriz',
      configured: '✓ {{count}} configurado',
      hasContent: '✓ Contenido presente'
    },
    messages: {
      updateSuccess: 'Empresa actualizada con éxito',
      updateFailed: 'Error al actualizar empresa: {{error}}',
      loadFailed: 'Error al cargar empresa: {{error}}'
    }
  }
} as const;
