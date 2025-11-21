export const apiToken = {
  title: 'Tokens API',
  subtitle: 'Administrar tokens API y límites de solicitudes',
  fields: {
    token: 'Token API',
    currentRequests: 'Solicitudes actuales',
    maxRequests: 'Máx. solicitudes',
    expiryDate: 'Fecha de expiración',
    decisionTree: 'Configuración del árbol de decisiones',
    company: 'Empresa'
  },
  actions: {
    regenerate: 'Regenerar token',
    resetRequests: 'Restablecer contador de solicitudes',
    extendExpiry: 'Extender fecha de expiración'
  },
  messages: {
    regenerateConfirm: '¿Está seguro de que desea regenerar este token? El token anterior dejará de funcionar inmediatamente.',
    regenerateSuccess: 'Token regenerado con éxito',
    resetSuccess: 'Contador de solicitudes restablecido con éxito',
    extendSuccess: 'Fecha de expiración extendida con éxito'
  }
} as const;
