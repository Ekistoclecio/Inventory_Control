// Interface com as propriedades recebidas pelo hook "useChangePasswordModal".
export interface HookChangePasswordModalProps {
  closeChangePasswordModal: () => void;
}

// Interface com as propriedades recebidas pelo hook "useCreateEditProductModal".
export interface HookCreateEditProductModalProps {
  closeCreateEditProductModal: () => void;
  productId: string;
  productName: string;
}

// // Interface com as propriedades recebidas pelo hook "useRegisterForm".
export interface HookRegisterFormProps {
  changeLoginForm: () => void;
}
