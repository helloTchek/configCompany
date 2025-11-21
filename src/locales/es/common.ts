export const common = {
  actions: {
    create: 'Crear',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    upload: 'Subir',
    download: 'Descargar',
    duplicate: 'Duplicar',
    view: 'Ver',
    close: 'Cerrar',
    refresh: 'Actualizar',
    reset: 'Restablecer',
    clear: 'Borrar',
    apply: 'Aplicar',
    remove: 'Eliminar',
    add: 'Agregar',
    update: 'Actualizar',
    submit: 'Enviar',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    loading: 'Cargando...',
    retry: 'Reintentar',
    select: 'Seleccionar',
    clearFilters: 'Borrar todos los filtros'
  },
  status: {
    active: 'Activo',
    inactive: 'Inactivo',
    enabled: 'Activado',
    disabled: 'Desactivado',
    pending: 'Pendiente',
    completed: 'Completado',
    failed: 'Fallido',
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Info',
    draft: 'Borrador',
    published: 'Publicado',
    archived: 'Archivado'
  },
  validation: {
    required: 'Este campo es obligatorio',
    email: 'Por favor ingrese un correo electrónico válido',
    minLength: 'Debe contener al menos {{min}} caracteres',
    maxLength: 'No debe exceder {{max}} caracteres',
    numeric: 'Debe ser un número',
    positive: 'Debe ser un número positivo',
    url: 'Por favor ingrese una URL válida',
    phone: 'Por favor ingrese un número de teléfono válido',
    password: 'La contraseña debe tener al menos 8 caracteres con mayúsculas, minúsculas y números'
  },
  messages: {
    noData: 'No hay datos disponibles',
    noResults: 'No se encontraron resultados',
    loadingError: 'Error al cargar los datos',
    saveSuccess: 'Guardado con éxito',
    saveError: 'Error al guardar',
    deleteSuccess: 'Eliminado con éxito',
    deleteError: 'Error al eliminar',
    deleteConfirm: '¿Está seguro de que desea eliminar este elemento?',
    unsavedChanges: 'Tiene cambios no guardados. ¿Está seguro de que desea salir?',
    sessionExpired: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
    accessDenied: 'Acceso denegado. No tiene permiso para ver esta página.',
    networkError: 'Error de red. Por favor, verifique su conexión e intente de nuevo.'
  },
  filters: {
    allTypes: 'Todos los tipos',
    allCompanies: 'Todas las empresas',
    allPriorities: 'Todas las prioridades'
  },
  fields: {
    actions: 'Acciones',
    level: 'Nivel'
  },
  sections: {
    basicInformation: 'Información básica',
    configuration: 'Configuración'
  },
  navigation: {
    companies: 'Empresas',
    users: 'Usuarios',
    workflows: 'Flujos de trabajo',
    costs: 'Matrices de costos',
    sortingRules: 'Reglas de ordenación',
    chaseupRules: 'Reglas de seguimiento automáticas',
    profile: 'Perfil',
    help: 'Ayuda',
    documentation: 'Documentación'
  },
  roles: {
    superAdmin: 'Superadministrador',
    admin: 'Administrador',
    user: 'Usuario'
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
  }
} as const;
