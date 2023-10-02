import { createContext, useContext, useState } from "react";
import { AlertContextInterface } from "../../interface/contexts.interface";

// Fornece para todo o sistema as variáveis e funções necessárias para que seja possível exibir em tela alertas personalizados.

const alertContext = createContext<AlertContextInterface>(
  {} as AlertContextInterface
);

const Provider = alertContext.Provider;

export const AlertProvider = (props: any) => {
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    message: "",
    variant: "success" as "error" | "warning" | "info" | "success",
  });

  // Função responsável por exibir em tela um alerta personalizado com alguma mensagem relevante para o usuário.
  function openAlert(
    message: string,
    variant: "error" | "warning" | "info" | "success"
  ) {
    setSnackbarProps({
      message,
      open: true,
      variant,
    });

    console.log(message, variant);
  }

  // Função que permite ao usuário fechar os alertas.
  function closeAlert() {
    setSnackbarProps({ ...snackbarProps, open: false });
  }

  return (
    <Provider
      value={{
        snackbarProps,
        setSnackbarProps,
        openAlert,
        closeAlert,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useAlertContext = () => useContext(alertContext);
