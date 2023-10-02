import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { navOptions } from "../../routes/routes";

// Componente responsável por renderizar a barra de navegação superior quando a largura da janela for inferior a 900px (md).
export default function TopNavBar() {
  return (
    <Box
      sx={{ backgroundColor: "#eCeCeC" }}
      flexGrow={1}
      height={48}
      display={"flex"}
      alignItems={"center"}
    >
      {navOptions.map((item) => (
        <Link
          key={item.text}
          to={item.url}
          style={{
            height: "100%",
            flex: 1,
          }}
        >
          <Button
            sx={{
              color: "#303030",
              borderRadius: 0,
              ":hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
              textTransform: "none",
              width: "100%",
              height: "100%",
            }}
          >
            {item.icon}
            <Typography marginLeft={1} fontSize={17}>
              {item.text}
            </Typography>
          </Button>
        </Link>
      ))}
    </Box>
  );
}
