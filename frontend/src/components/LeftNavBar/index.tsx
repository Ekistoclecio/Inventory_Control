import { Drawer, DrawerHeader } from "./styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { LeftNavBarProps } from "../../interface/componentProps.interface";
import { Link } from "react-router-dom";
import { navOptions } from "../../routes/routes";

// Componente responsável por renderizar a barra de navegação lateral quando a largura da janela for superior a 900px (md).
export default function LeftNavBar({
  drawerLeftNavBarIsOpen,
  leftNavBarWidth,
  theme,
  handleDrawerNavBarClose,
}: LeftNavBarProps) {
  return (
    <Drawer
      variant="permanent"
      open={drawerLeftNavBarIsOpen}
      leftNavBarWidth={leftNavBarWidth}
      theme={theme}
    >
      <DrawerHeader theme={theme} sx={{ backgroundColor: "#eCeCeC" }}>
        <IconButton
          onClick={handleDrawerNavBarClose}
          sx={{
            ":hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ backgroundColor: "#eCeCeC", height: "100%" }}>
        {navOptions.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <Link to={item.url} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  color: "#303030",
                  minHeight: 48,
                  justifyContent: drawerLeftNavBarIsOpen ? "initial" : "center",
                  px: 2.5,
                  ":hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerLeftNavBarIsOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: drawerLeftNavBarIsOpen ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
