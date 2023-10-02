import LoginAndRegister from "./pages/LoginAndRegister";
import { RouterProvider } from "react-router-dom";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useSessionContext } from "./providers/context/sessionContext";
import { useAlertContext } from "./providers/context/alertContext";
import LoadingPage from "./pages/Loading";
import { router } from "./routes/routes";

// Componente central da aplicação que exibe a página de login/registro para usuários não logados ou permite o acesso à aplicação para usuários com sessão ativa.
function App() {
  const { userSession } = useSessionContext();
  const { snackbarProps, closeAlert } = useAlertContext();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarProps.open}
        autoHideDuration={6000}
        onClose={closeAlert}
      >
        <Alert
          onClose={closeAlert}
          severity={snackbarProps.variant}
          sx={{ width: "100%" }}
        >
          {snackbarProps.message}
        </Alert>
      </Snackbar>
      {userSession === undefined ? (
        <LoadingPage />
      ) : userSession.logged ? (
        <RouterProvider router={router} />
      ) : (
        <LoginAndRegister />
      )}
    </>
  );
}

export default App;
