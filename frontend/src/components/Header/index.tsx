import {
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "./styles";
import { HeaderProps } from "../../interface/componentProps.interface";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router-dom";
import { useSessionContext } from "../../providers/context/sessionContext";
import { useHeader } from "../../hooks/useHeader";

// Componente responsável por renderizar o cabeçalho da aplicação quando o usuário está logado.
export default function Header({
  handleDrawerNavBarOpen,
  drawerLeftNavBarIsOpen,
  leftNavBarWidth,
  theme,
}: HeaderProps) {
  const { userSession, logout } = useSessionContext();
  const location = useLocation();
  const { generateRandomAvatarBackgroundColor, generateAvatarString, titles } =
    useHeader();

  return (
    <AppBar
      leftNavBarWidth={leftNavBarWidth}
      open={drawerLeftNavBarIsOpen}
      theme={theme}
      position="fixed"
    >
      <Toolbar>
        <Box display={{ xs: "none", md: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerNavBarOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ":hover": {
                backgroundColor: "rgba(0,0,0, 0.2)",
              },
              ...(drawerLeftNavBarIsOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flex={1}
          alignItems={"center"}
        >
          <Typography
            variant="h5"
            fontWeight={500}
            noWrap
            component="div"
            marginLeft={-1}
          >
            {
              //@ts-ignore
              titles[location.pathname]
            }
          </Typography>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Avatar
              sx={{
                backgroundColor: generateRandomAvatarBackgroundColor(
                  `${userSession?.name} ${userSession?.lastName}`
                ),
              }}
            >
              {generateAvatarString(
                `${userSession?.name} ${userSession?.lastName}`
              )}
            </Avatar>
            <Typography
              marginX={1}
              fontSize={18}
              display={{ xs: "none", md: "flex" }}
            >
              {`${userSession?.name} ${userSession?.lastName}`}
            </Typography>
            <Tooltip title="Sair">
              <IconButton
                onClick={logout}
                sx={{
                  marginLeft: { xs: "5px", md: "1px" },
                  marginRight: "-8px",
                  ":hover": {
                    backgroundColor: "rgba(0,0,0, 0.2)",
                  },
                }}
                color="inherit"
                aria-label="logout"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
