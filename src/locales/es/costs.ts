export const costs = {
  title: 'Matrices de costos',
  subtitle: 'Administrar costos de reparación por tipo de pieza, ubicación y gravedad',
  create: 'Crear nueva matriz',
  createTitle: 'Crear Matriz de Costos',
  edit: 'Editar matriz de costos',
  fields: {
    company: 'Empresa',
    currency: 'Moneda',
    taxRate: 'Tasa de impuesto (%)',
    partsCount: 'Cantidad de piezas',
    partType: 'Tipo de pieza',
    location: 'Ubicación',
    severity: 'Gravedad',
    cost: 'Costo'
  },
  severities: {
    minor: 'Leve',
    moderate: 'Moderada',
    major: 'Alta',
    severe: 'Severa'
  },
  locations: {
    front: 'Frente',
    rear: 'Parte trasera',
    left: 'Izquierda',
    right: 'Derecha',
    roof: 'Techo',
    interior: 'Interior'
  },
  actions: {
    addPart: 'Agregar pieza',
    removePart: 'Eliminar pieza',
    importCsv: 'Importar CSV',
    exportCsv: 'Exportar CSV',
    bulkEdit: 'Edición masiva'
  },
  modals: {
    editTitle: 'Editar Matriz - {{name}}',
    deleteTitle: 'Confirmar Eliminación',
    duplicateTitle: 'Duplicar Matriz de Costos'
  },
  messages: {
    createSuccess: 'Matriz de costos creada con éxito',
    updateSuccess: 'Matriz de costos actualizada con éxito',
    deleteSuccess: 'Matriz de costos eliminada con éxito',
    importSuccess: 'CSV importado con éxito',
    exportSuccess: 'CSV exportado con éxito',
    invalidCsv: 'Formato CSV inválido'
  }
} as const;
