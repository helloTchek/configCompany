export const workflows = {
  title: 'Flujos de trabajo',
  subtitle: 'Crear y administrar flujos de inspección',
  create: 'Crear nuevo flujo',
  createTitle: 'Crear Flujo de Inspección',
  edit: 'Editar flujo',
  duplicate: 'Duplicar flujo',
  fields: {
    name: 'Nombre del flujo',
    description: 'Descripción',
    company: 'Empresa',
    blocksCount: 'Cantidad de bloques',
    status: 'Estado',
    isActive: 'Activo'
  },
  blocks: {
    title: 'Bloques del flujo',
    addBlock: 'Agregar bloque',
    form: 'Bloque de formulario',
    shootInspection: 'Bloque de inspección fotográfica',
    fastTrack: 'Bloque de Fast Track',
    addDamage: 'Bloque de agregar daños',
    static: 'Bloque de pantalla estática'
  },
  blockTypes: {
    form: {
      name: 'Bloque de formulario',
      description: 'Formulario personalizado con configuración JSON'
    },
    shootInspection: {
      name: 'Bloque de inspección fotográfica',
      description: 'Flujo de captura de fotos'
    },
    fastTrack: {
      name: 'Bloque de Fast Track',
      description: 'Proceso rápido de inspección'
    },
    addDamage: {
      name: 'Bloque de agregar daños',
      description: 'Reporte manual de daños'
    },
    static: {
      name: 'Bloque de pantalla estática',
      description: 'Pantallas de contenido estático (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Configuración del flujo',
    importJson: 'Importar JSON',
    exportJson: 'Exportar JSON'
  },
  modals: {
    editJourneyTitle: 'Editar Flujo - {{name}}',
    duplicateTitle: 'Duplicar flujo',
    duplicateMessage: 'Crear una copia de',
    deleteTitle: 'Eliminar flujo',
    deleteMessage: '¿Está seguro de que desea eliminar {{name}}? Esta acción no se puede deshacer.'
  },
  messages: {
    createSuccess: 'Flujo creado con éxito',
    updateSuccess: 'Flujo actualizado con éxito',
    deleteSuccess: 'Flujo eliminado con éxito',
    duplicateSuccess: 'Flujo duplicado con éxito',
    deleteConfirm: '¿Está seguro de que desea eliminar este flujo?',
    noBlocks: 'No se han agregado bloques. Haga clic en "Agregar bloque" para empezar a construir su flujo.',
    nameRequired: 'Por favor, ingrese un nombre para el flujo',
    blocksRequired: 'Por favor, agregue al menos un bloque al flujo'
  }
} as const;
