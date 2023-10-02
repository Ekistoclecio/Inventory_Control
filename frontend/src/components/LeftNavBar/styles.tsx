import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { DrawerProps } from "../../interface/componentProps.interface";

// Adiciona alguns estilos e animações personalizados ao "MuiDrawer" para permitir que a barra lateral da aplicação expanda e contraia de forma fluida.

const openedMixin = (theme: Theme, LeftNavBarWidth: number): CSSObject => ({
  width: LeftNavBarWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: () => true,
})<DrawerProps>(({ theme, open, leftNavBarWidth }) => ({
  width: leftNavBarWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, leftNavBarWidth),
    "& .MuiDrawer-paper": openedMixin(theme, leftNavBarWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// ---------------------------------------------------------------------------------------

// Cria uma "div" personalizada que auxilia na organização do layout e do cabeçalho do Drawer, evitando a sobreposição de componentes.
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
