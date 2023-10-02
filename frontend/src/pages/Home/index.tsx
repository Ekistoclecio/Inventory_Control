import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { DrawerHeader } from "../../components/LeftNavBar/styles";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import LeftNavBar from "../../components/LeftNavBar";
import TopNavBar from "../../components/TopNavBar";
import { Outlet } from "react-router-dom";

const LeftNavBarWidth = 240; // Define a largura da barra de navegação lateral.

// Componente responsável por renderizar a página quando o usuário está logado.
export default function Home() {
  const theme = useTheme();
  const [drawerLeftNavBarIsOpen, setDrawerLeftNavBarIsOpen] = useState(false);

  return (
    <Box
      flexGrow={1}
      sx={{ backgroundColor: "#cfcfcf", height: "100%" }}
      overflow={"auto"}
    >
      <Box sx={{ display: "flex" }} flexGrow={1} flex={1}>
        <Header
          handleDrawerNavBarOpen={() => setDrawerLeftNavBarIsOpen(true)}
          drawerLeftNavBarIsOpen={drawerLeftNavBarIsOpen}
          leftNavBarWidth={LeftNavBarWidth}
          theme={theme}
        />
        <Box display={{ xs: "none", md: "flex" }}>
          <LeftNavBar
            drawerLeftNavBarIsOpen={drawerLeftNavBarIsOpen}
            leftNavBarWidth={LeftNavBarWidth}
            theme={theme}
            handleDrawerNavBarClose={() => setDrawerLeftNavBarIsOpen(false)}
          />
        </Box>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader theme={theme} />
          <Box display={{ xs: "flex", md: "none" }}>
            <TopNavBar />
          </Box>
          <Box
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            paddingX={1}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
