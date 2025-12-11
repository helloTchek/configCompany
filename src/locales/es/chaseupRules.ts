export const chaseupRules = {
  title: 'Reglas de Seguimiento Automatizadas',
  subtitle: 'Configure reglas de mensajes de seguimiento automatizados para empresas',
  create: 'Crear Nueva Regla',
  edit: 'Editar Regla de Seguimiento',
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
    delete: 'Eliminar Regla',
    deleteRule: 'Eliminar Regla',
    duplicate: 'Duplicar Regla',
    duplicateRule: 'Duplicar Regla',
    clearFilters: 'Limpiar Todos los Filtros'
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
    noRulesFound: 'No se encontraron reglas de seguimiento que coincidan con sus criterios.'
  },
  filters: {
    allTypes: 'Todos los Tipos',
    allCompanies: 'Todas las Empresas',
    all: 'Todo'
  }
} as const;
