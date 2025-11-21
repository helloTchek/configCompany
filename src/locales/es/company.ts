export const company = {
  title: 'Empresas',
  subtitle: 'Administrar empresas, sus configuraciones y ajustes',
  create: 'Crear nueva empresa',
  edit: 'Editar empresa',
  duplicate: 'Duplicar empresa',
  fields: {
    name: 'Nombre de la empresa',
    identifier: 'Identificador de la empresa',
    contractType: 'Tipo de contrato',
    businessSector: 'Sector de negocio',
    logoUrl: 'URL del logo',
    retentionPeriod: 'Periodo de retención (meses)',
    disableFastTrack: 'Desactivar Fast Track',
    enableMileageCapture: 'Habilitar captura de kilometraje',
    enableBlurDetection: 'Difuminar matrículas',
    enableVinScanning: 'Habilitar escaneo de VIN',
    enableBrandModelDetection: 'Habilitar detección de marca y modelo',
    iaValidation: 'Validación IA (modelo Joelle)',
    humanValidationEnabled: 'Validación humana habilitada',
    validationPriority: 'Prioridad de validación (0-5)',
    maxValidationDelay: 'Retraso máximo de validación (minutos)',
    minTaskProcessingDuration: 'Duración mínima de procesamiento de tareas (minutos)',
    showStartInstantInspection: 'Mostrar inicio de inspección instantánea',
    showSendInspectionLink: 'Mostrar enlace de envío de inspección',
    parentCompany: 'Empresa matriz',
    childrenCount: 'Número de empresas hijas'
  },
  contractTypes: {
    client: 'Cliente',
    prospect: 'Prospecto',
    test: 'Prueba',
    demo: 'Demostración'
  },
  businessSectors: {
    insurance: 'Seguros',
    leasing: 'Arrendamiento',
    rental: 'Alquiler',
    fleetManagement: 'Gestión de flotas',
    automotive: 'Automotriz'
  },
  tabs: {
    general: 'Configuración general',
    hierarchy: 'Jerarquía',
    journeySettings: 'Configuración del flujo de inspección',
    savedJourneys: 'Flujos guardados'
  },
  sections: {
    generalSettings: 'Configuración general',
    hubConfiguration: 'Configuración del hub',
    apiConfiguration: 'Configuración de API',
    validation: 'Validación',
    eventsWebhooks: 'Eventos y Webhooks',
    companyHierarchy: 'Jerarquía de la empresa',
    childCompanies: 'Empresas hijas',
    hierarchyActions: 'Acciones de la jerarquía'
  },
  messages: {
    createSuccess: 'Empresa creada con éxito',
    updateSuccess: 'Empresa actualizada con éxito',
    deleteSuccess: 'Empresa eliminada con éxito',
    duplicateSuccess: 'Empresa duplicada con éxito',
    deleteConfirm: '¿Está seguro de que desea eliminar {{name}}? Esta acción no se puede deshacer.',
    noChildCompanies: 'Esta empresa no tiene empresas hijas.',
    duplicateWarning: 'Recuerde: deberá crear usuarios para la nueva empresa después de la duplicación.'
  }
} as const;
