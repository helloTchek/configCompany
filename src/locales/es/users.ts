export const users = {
  title: 'Usuarios',
  subtitle: 'Administrar cuentas de usuario y permisos',
  create: 'Crear nuevo usuario',
  edit: 'Editar usuario',
  fields: {
    email: 'Correo electrónico',
    name: 'Nombre',
    role: 'Rol',
    company: 'Empresa',
    status: 'Estado',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña'
  },
  roles: {
    superAdmin: 'Superadministrador',
    admin: 'Administrador',
    user: 'Usuario'
  },
  status: {
    active: 'Activo',
    inactive: 'Inactivo'
  },
  messages: {
    createSuccess: 'Usuario creado con éxito',
    updateSuccess: 'Usuario actualizado con éxito',
    deleteSuccess: 'Usuario eliminado con éxito',
    deleteConfirm: '¿Está seguro de que desea eliminar este usuario?',
    passwordMismatch: 'Las contraseñas no coinciden',
    emailExists: 'Ya existe un usuario con este correo electrónico',
    lastLoginNever: 'Nunca'
  }
} as const;
