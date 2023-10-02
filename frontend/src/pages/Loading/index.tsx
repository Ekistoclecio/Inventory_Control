import { CircularProgress, Container } from "@mui/material";

// Uma página de carregamento básica para ser exibida enquanto as informações da sessão do usuário estão sendo carregadas
export default function Loading() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={80} />
    </Container>
  );
}
