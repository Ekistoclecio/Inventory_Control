import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { AppBarProps } from "../../interface/componentProps.interface";
import { useMediaQuery } from "@mui/material";

// Estende o estilo padrão do componente MuiAppBar adicionando alguns estilos personalizados para permitir a correta integração com o drawer.
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: () => true,
})<AppBarProps>(({ theme, open, leftNavBarWidth }) => {
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isMdScreen &&
      open && {
        marginLeft: leftNavBarWidth,
        width: `calc(100% - ${leftNavBarWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
  };
});
