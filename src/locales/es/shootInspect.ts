export const shootInspect = {
  title: 'Configuración de inspección fotográfica',
  subtitle: 'Configurar el flujo de trabajo y ajustes de captura de fotos',
  fields: {
    name: 'Nombre de la configuración',
    description: 'Descripción',
    maxRetries: 'Máximo de reintentos',
    qualityCheckEnabled: 'Control de calidad habilitado',
    photoAngles: 'Ángulos de foto',
    allowedDamageTypes: 'Tipos de daño permitidos'
  },
  angles: {
    front: 'Frente',
    back: 'Parte trasera',
    leftSide: 'Lado izquierdo',
    rightSide: 'Lado derecho',
    interior: 'Interior',
    dashboard: 'Tablero'
  },
  damageTypes: {
    carBody: 'Carrocería',
    interior: 'Interior',
    glazings: 'Cristales',
    dashboard: 'Tablero',
    declaration: 'Declaración',
    documents: 'Documentos'
  },
  steps: {
    title: 'Pasos de inspección',
    addStep: 'Agregar paso',
    editStep: 'Editar paso',
    removeStep: 'Eliminar paso',
    stepOrder: 'Paso {{order}}',
    stepTitle: 'Título del paso',
    stepDescription: 'Descripción del paso',
    isOptional: 'Paso opcional',
    showHelp: 'Mostrar ayuda',
    runDetection: 'Ejecutar detección',
    thumbnailUrl: 'URL de miniatura',
    overlayUrl: 'URL de superposición'
  },
  messages: {
    createSuccess: 'Configuración de inspección fotográfica creada con éxito',
    updateSuccess: 'Configuración de inspección fotográfica actualizada con éxito',
    deleteSuccess: 'Configuración de inspección fotográfica eliminada con éxito',
    stepAdded: 'Paso agregado con éxito',
    stepRemoved: 'Paso eliminado con éxito',
    invalidConfiguration: 'Formato de configuración inválido'
  }
} as const;
