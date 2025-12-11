export const company = {
  title: 'Empresas',
  subtitle: 'Gestionar empresas, sus configuraciones y ajustes',
  create: 'Crear nueva empresa',
  edit: 'Editar empresa',
  duplicate: 'Duplicar empresa',
  archive: 'Archivar empresa',
  unarchive: 'Desarchivar empresa',
  fields: {
    name: 'Nombre de la empresa',
    identifier: 'Identificador',
    companyId: 'ID de empresa',
    apiToken: 'Token API',
    currentRequests: 'Solicitudes actuales',
    maxRequests: 'Solicitudes máx',
    createdDate: 'Fecha de creación',
    contractType: 'Tipo de contrato',
    businessSector: 'Sector empresarial',
    parentCompany: 'Empresa matriz',
    childrenCount: 'Filiales',
    chaseupRules: 'Reglas de seguimiento',
    companyStatus: 'Estado de la empresa'
  },
  contractTypes: {
    client: 'Cliente',
    prospect: 'Prospecto',
    test: 'Prueba',
    demo: 'Demo',
    allTypes: 'Todos los tipos'
  },
  filters: {
    contractType: 'Tipo de contrato',
    companyHierarchy: 'Jerarquía empresarial',
    allCompanies: 'Todas las empresas',
    parentCompanies: 'Empresas matriz',
    childCompanies: 'Empresas filiales',
    active: 'Empresas activas',
    archived: 'Empresas archivadas',
    showArchived: 'Mostrar empresas archivadas'
  },
  status: {
    active: 'Activo',
    archived: 'Archivado'
  },
  actions: {
    edit: 'Editar',
    duplicate: 'Duplicar',
    archive: 'Archivar',
    unarchive: 'Desarchivar'
  },
  placeholders: {
    search: 'Buscar por nombre, identificador, ID de empresa o token API...',
    companyName: 'Introduzca el nombre de la nueva empresa',
    senderName: 'Introduzca el nombre del remitente',
    webhookUrl: 'Introduzca la URL del webhook',
    searchCompanies: 'Buscar empresas...'
  },
  labels: {
    companyManagement: 'Gestión de empresas',
    newCompanyName: 'Nuevo nombre de empresa',
    senderName: 'Nombre del remitente',
    webhookUrl: 'URL del Webhook',
    parentCompanyOptional: 'Empresa matriz (Opcional)',
    duplicateOptions: 'Opciones de duplicación',
    duplicateJourneys: 'Duplicar recorridos',
    duplicateCostSettings: 'Duplicar configuración de costos',
    duplicateSortingRules: 'Duplicar reglas de clasificación',
    duplicateWebhookEvents: 'Duplicar eventos de webhook',
    archivedCount: '{{count}} archivada(s)'
  },
  chaseupStatus: {
    active: 'Activo',
    create: 'Crear'
  },
  messages: {
    createSuccess: 'Empresa creada exitosamente',
    updateSuccess: 'Empresa actualizada exitosamente',
    deleteSuccess: 'Empresa eliminada exitosamente',
    duplicateSuccess: 'Empresa duplicada exitosamente',
    archiveSuccess: 'Empresa archivada exitosamente',
    unarchiveSuccess: 'Empresa desarchivada exitosamente',
    noCompaniesFound: 'No se encontraron empresas que coincidan con sus criterios.',
    archiveDescription: 'Las empresas archivadas pueden restaurarse más tarde usando el filtro "Mostrar empresas archivadas".',
    unarchiveDescription: 'Desarchivar restaurará el acceso a la empresa y su token API.',
    loading: 'Cargando empresas...'
  }
} as const;
