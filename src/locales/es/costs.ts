export const costs = {
  title: 'Gestión de costos de reparación',
  subtitle: 'Gestionar matrices de costos para estimaciones de reparación de vehículos',
  pageTitle: 'Matrices de costos',
  pageSubtitle: 'Seleccione y gestione sus matrices de costos de reparación',
  create: 'Crear matriz',
  createNew: 'Crear nueva matriz de costos',
  createCostMatrix: 'Crear matriz de costos',
  edit: 'Editar matriz de costos',
  duplicate: 'Duplicar matriz',
  downloadTemplate: 'Descargar plantilla',
  searchPlaceholder: 'Buscar matrices de costos...',
  noMatricesFound: 'No se encontraron matrices de costos',
  tryAdjustSearch: 'Intente ajustar su búsqueda',
  createToGetStarted: 'Cree una nueva matriz de costos para comenzar',
  backToCostMatrices: 'Volver a matrices de costos',
  loading: 'Cargando...',
  loadingCostMatrix: 'Cargando matriz de costos...',
  error: 'Error',
  costMatrixNotFound: 'Matriz de costos no encontrada',
  failedToLoad: 'Error al cargar la matriz de costos',

  fields: {
    matrix: 'Matriz',
    matrixName: 'Nombre de la matriz',
    company: 'Empresa',
    currency: 'Moneda',
    currencyAndTax: 'Moneda e Impuesto',
    tax: 'Impuesto',
    taxRate: 'Tasa de impuesto (%)',
    status: 'Estado',
    lastUpdated: 'Última actualización',
    partsCount: 'Cantidad de piezas',
    partType: 'Tipo de pieza',
    location: 'Ubicación',
    severity: 'Severidad',
    cost: 'Costo',
    totalEntries: 'Entradas totales',
    validated: 'Validado',
    created: 'Creado',
    description: 'Descripción',
    vehiclePart: 'PIEZA DEL VEHÍCULO',
    severityType: 'TIPO DE SEVERIDAD',
    code: 'Código: ',
    level: 'Nivel ',
    companyLabel: 'Empresa: '
  },

  placeholders: {
    matrixName: 'ej. MATRIZ_PREMIUM',
    description: 'Breve descripción de esta matriz de costos',
    searchCompany: 'Buscar una empresa...',
    searchVehicleParts: 'Buscar piezas del vehículo...',
    searchLocations: 'Buscar ubicaciones...',
    allSeverityTypes: 'Todos los tipos de severidad...'
  },

  severities: {
    minor: 'Leve',
    light: 'Ligera',
    moderate: 'Moderada',
    major: 'Mayor',
    severe: 'Severa'
  },

  locations: {
    front: 'Frontal',
    rear: 'Trasera',
    left: 'Izquierda',
    right: 'Derecha',
    roof: 'Techo',
    interior: 'Interior'
  },

  currencies: {
    eur: 'EUR (€)',
    usd: 'USD ($)',
    gbp: 'GBP (£)'
  },

  status: {
    active: 'Activo'
  },

  actions: {
    addPart: 'Agregar pieza',
    removePart: 'Eliminar pieza',
    importCsv: 'Importar CSV',
    exportCsv: 'Exportar CSV',
    bulkEdit: 'Edición masiva',
    view: 'Ver',
    edit: 'Editar',
    duplicate: 'Duplicar',
    delete: 'Eliminar',
    downloadXlsx: 'Descargar XLSX',
    importFromExcel: 'Importar desde Excel',
    importInProgress: 'Importación en curso... {{progress}}%',
    saveChanges: 'Guardar cambios',
    createMatrix: 'Crear matriz',
    cancel: 'Cancelar',
    deleteAllParams: 'Eliminar todos los parámetros de costo',
    deleteAllParamsTitle: 'Eliminar todos los parámetros de costo'
  },

  sections: {
    matrixSettings: 'Configuración de la matriz',
    filters: 'Filtros',
    costEntries: 'Entradas de costos',
    filterByVehiclePart: 'Filtrar por pieza del vehículo',
    filterByLocation: 'Filtrar por ubicación',
    filterBySeverityType: 'Filtrar por tipo de severidad'
  },

  modal: {
    viewTitle: 'Detalles de la matriz de costos',
    deleteTitle: 'Confirmar eliminación',
    deleteQuestion: '¿Está seguro de que desea eliminar esta matriz?',
    deleteDescription: 'Está a punto de eliminar la matriz de costos',
    forCompany: 'para',
    deleteWarning: 'Esta acción es irreversible.',
    deleteWarningDetail: 'Todos los parámetros de costos asociados también se eliminarán permanentemente.',
    duplicateTitle: 'Duplicar matriz de costos',
    duplicateDescription: 'Se creará una copia completa de esta matriz de costos con todos sus parámetros asociados.',
    newMatrixName: 'Nuevo nombre de la matriz',
    duplicateNamePlaceholder: 'Nombre de la matriz duplicada',
    cancel: 'Cancelar',
    confirm: 'Sí, eliminar',
    confirmDuplicate: 'Duplicar',
    deleting: 'Eliminando...',
    duplicating: 'Duplicando...',
    close: 'Cerrar',
    editMatrix: 'Editar matriz',
    costMatrixConfiguration: 'Configuración de la matriz de costos',
    confirmDeleteAll: 'Confirmar eliminación',
    deleteAllQuestion: '¿Eliminar todos los parámetros de costo?',
    deleteAllDescription: 'Está a punto de eliminar <strong>{{count}} parámetros de costo</strong> de la matriz "{{name}}".',
    deleteAllWarning: '<strong>Esta acción es irreversible.</strong> Todas las entradas de costos se eliminarán, pero la matriz de costos permanecerá. Puede volver a importar datos más tarde.',
    cancelButton: 'Cancelar',
    deletingButton: 'Eliminando...',
    deleteEntriesButton: 'Eliminar entradas de costos'
  },

  template: {
    needTemplate: '¿Necesita una plantilla inicial?',
    downloadDescription: 'Descargue nuestra plantilla predeterminada para comenzar con piezas de vehículos y costos de reparación comunes.'
  },

  display: {
    showingEntries: 'Mostrando {{filtered}} de {{total}} entradas',
    noCostEntries: 'No se encontraron entradas de costos',
    loadingCompanies: 'Cargando empresas...',
    taxRateLabel: 'Tasa de impuesto',
    currencyLabel: 'Moneda'
  },

  validation: {
    nameRequired: 'El nombre de la matriz es obligatorio',
    companyRequired: 'La empresa es obligatoria',
    currencyRequired: 'La moneda es obligatoria',
    taxRateRange: 'La tasa de impuesto debe estar entre 0 y 100'
  },

  messages: {
    createSuccess: 'Matriz de costos creada con éxito',
    updateSuccess: 'Matriz de costos actualizada con éxito',
    updateSuccessWithParams: 'Matriz de costos actualizada con éxito!\n\n{{count}} parámetro(s) de costo actualizados.',
    deleteSuccess: 'Matriz de costos eliminada con éxito',
    deleteParamsSuccess: '{{count}} parámetros de costo eliminados con éxito',
    duplicateSuccess: 'Matriz de costos "{{name}}" duplicada con éxito',
    deleteFailed: 'Error al eliminar: {{error}}',
    deleteParamsFailed: 'Error al eliminar: {{error}}',
    duplicateFailed: 'Error al duplicar: {{error}}',
    importSuccess: 'Importación exitosa: ¡{{count}} parámetros de costo importados!',
    importSuccessWithErrors: 'Importación exitosa: ¡{{count}} parámetros de costo importados!\n\nAdvertencia: {{errors}} filas con errores.',
    importFailed: 'Error en la importación: {{error}}',
    exportSuccess: 'CSV exportado con éxito',
    invalidCsv: 'Formato CSV no válido',
    saveFailed: 'Error al guardar la matriz de costos: {{error}}'
  }
} as const;
