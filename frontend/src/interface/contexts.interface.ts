// Arquivo que descreve as interfaces dos dados utilizados pelos contextos da aplicação.

import { UserLoginFormData } from "./forms.interface";

// Interfaces utilizadas em "alertContext".

// Funções e variáveis disponibilizadas pelo contexto "alertContext".
export interface AlertContextInterface {
  snackbarProps: SnackbarProps;
  setSnackbarProps: (val: SnackbarProps) => void;
  openAlert: (
    message: string,
    variant: "error" | "warning" | "info" | "success"
  ) => void;
  closeAlert: () => void;
}

// Dados passados para o componente "Snackbar" do MUI, que permitem a exibição de um alerta personalizado.
export interface SnackbarProps {
  open: boolean;
  message: string;
  variant: "error" | "warning" | "info" | "success";
}

//--------------------------------------------------------------------

// Interfaces utilizadas em "productsContext".

// Funções e variáveis disponibilizadas pelo contexto "productsContext".
export interface ProductsContextInterface {
  productsArray: ProductInterface[];
  searchedProducts: ProductInterface[];
  pagination: number;
  finishedProducts: boolean;
  setProductsArray: (val: ProductInterface[]) => void;
  setPagination: (val: number) => void;
  setFinishedProducts: (val: boolean) => void;
  setSearchedProducts: (val: ProductInterface[]) => void;
  getProducts: () => void;
  searchProducts: (val: string) => void;
}

// Interface que representa um produto
export interface ProductInterface {
  id: string;
  name: string;
  quantity: number;
}

//--------------------------------------------------------------------

// Interfaces utilizadas em "sessionContext".

// Funções e variáveis disponibilizadas pelo contexto "sessionContext".
export interface SessionContextInterface {
  userSession: UserSessionInterface | undefined;
  setUserSession: (val: UserSessionInterface) => void;
  login: (loginData: UserLoginFormData) => void;
  logout: () => void;
}

// Interface que representa os dados de uma sessão.
export interface UserSessionInterface {
  name: string;
  lastName: string;
  email: string;
  token: string;
  logged: boolean;
}

//--------------------------------------------------------------------
