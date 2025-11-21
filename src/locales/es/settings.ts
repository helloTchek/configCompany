export const settings = {
  title: 'Configuración',
  subtitle: 'Configurar ajustes y estilos de la aplicación',
  sections: {
    styles: 'Estilos',
    reportSettings: 'Configuración de informes',
    configModules: 'Módulos de configuración'
  },
  fields: {
    styles: 'Configuración de estilos',
    reportSettings: 'Configuración de informes',
    configModules: 'Configuración de módulos',
    urlBackground: 'Eliminar URL de fondo',
    instantInspection: 'Mostrar inicio de inspección instantánea'
  },
  actions: {
    downloadJson: 'Descargar JSON',
    uploadJson: 'Subir JSON',
    resetToDefault: 'Restablecer a valores predeterminados'
  },
  messages: {
    updateSuccess: 'Configuración actualizada con éxito',
    resetSuccess: 'Configuración restablecida a los valores predeterminados',
    invalidJson: 'Formato JSON inválido',
    uploadSuccess: 'Configuración subida con éxito'
  }
} as const;
