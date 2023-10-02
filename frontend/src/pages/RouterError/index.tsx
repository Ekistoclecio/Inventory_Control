import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Componente simples de erro para tratar quando o usuário acessar uma rota não disponível na aplicação.
export default function RouterError() {
  return (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      height={"100%"}
      flexDirection={"column"}
    >
      <Typography variant="h6">Error 404: Pagina não encontrada!</Typography>
      <Button variant="contained" sx={{ marginTop: 3 }}>
        <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
          Voltar a tela inicial
        </Link>
      </Button>
    </Box>
  );
}
