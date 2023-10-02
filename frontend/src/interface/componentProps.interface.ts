import { Theme } from "@mui/material/styles";
import { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// Interfaces que descrevem as propriedades recebidas por determinados componentes.

// LeftNavBar Componentes
export interface LeftNavBarProps {
  drawerLeftNavBarIsOpen: boolean;
  leftNavBarWidth: number;
  theme: Theme;
  handleDrawerNavBarClose: () => void;
}

export interface DrawerProps extends MuiDrawerProps {
  leftNavBarWidth: number;
}
//-----------------------------------------------------------------------

// Header Componentes
export interface HeaderProps {
  handleDrawerNavBarOpen: () => void;
  drawerLeftNavBarIsOpen: boolean;
  leftNavBarWidth: number;
  theme: Theme;
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  leftNavBarWidth: number;
}
//-----------------------------------------------------------------------

// LoginForm Componente
export interface LoginFormProps {
  changeRegisterForm: () => void;
}

// RegisterForm Componente
export interface RegisterFormProps {
  changeLoginForm: () => void;
}

// ChangePasswordModal Componente
export interface ChangePasswordModalProps {
  isOpenModalChangePassword: boolean;
  closeChangePasswordModal: () => void;
}

// CreateEditProductModal Componente
export interface CreateEditProductModalProps {
  isOpenCreateEditProductModal: boolean;
  closeCreateEditProductModal: () => void;
  productName: string;
  productQuantity: number;
  productId: string;
}
