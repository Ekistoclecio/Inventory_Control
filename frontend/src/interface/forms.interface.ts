// Interface do formulario de Registro de um novo usuario
export interface UserRegisterFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface do formulario de login do usuario
export interface UserLoginFormData {
  email: string;
  password: string;
}

// Interface do formulario de Edição dos dados do usuario
export interface UserDataEditForm {
  name: string;
  lastName: string;
  email: string;
}

// Interface do formulario de alteração de senha
export interface ChangePasswordFormData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Interface do formulario de criar/editar um produto
export interface DataCreateEditProductForm {
  newProductName: string;
  newProductQuantity: number;
}
