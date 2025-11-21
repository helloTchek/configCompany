export const sortingRules = {
  title: 'Reglas de ordenación',
  subtitle: 'Configurar reglas de filtrado y actualización automatizadas por empresa',
  create: 'Crear nueva regla',
  edit: 'Editar regla de ordenación',
  fields: {
    company: 'Empresa',
    type: 'Tipo',
    fromCollection: 'Colección origen',
    targetCollection: 'Colección destino',
    referenceKey: 'Clave de referencia',
    referencePrefix: 'Prefijo de referencia',
    filters: 'Filtros (JSON)',
    updates: 'Actualizaciones (JSON)',
    processingPriority: 'Prioridad de procesamiento',
    priority: 'Prioridad'
  },
  types: {
    detectionPhase: 'Fase de detección',
    validationPhase: 'Fase de validación',
    reportGeneration: 'Generación de informe'
  },
  priorities: {
    highest: '1 - Prioridad más alta',
    high: '2 - Prioridad alta',
    medium: '3 - Prioridad media',
    low: '4 - Prioridad baja',
    lowest: '5 - Prioridad más baja',
    highLevel: 'Prioridad alta (1-2)',
    mediumLevel: 'Prioridad media (3-4)'
  },
  examples: {
    title: 'Ejemplos de configuración',
    filterExamples: 'Ejemplos de filtros:',
    updateExamples: 'Ejemplos de actualizaciones:',
    filtersHelp: 'Objeto JSON que define los criterios de filtrado',
    updatesHelp: 'Objeto JSON que define las actualizaciones a aplicar'
  },
  messages: {
    createSuccess: 'Regla de ordenación creada con éxito',
    updateSuccess: 'Regla de ordenación actualizada con éxito',
    deleteSuccess: 'Regla de ordenación eliminada con éxito',
    invalidJson: 'Formato JSON inválido',
    loadingRule: 'Cargando la regla de ordenación...'
  }
} as const;
