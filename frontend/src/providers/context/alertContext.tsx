import { createContext, useContext, useState } from "react";

interface AlertContextInterface {
  snackbarProps: SnackbarProps;
  setSnackbarProps: (val: SnackbarProps) => void;
  openAlert: (
    message: string,
    variant: "error" | "warning" | "info" | "success"
  ) => void;
  closeAlert: () => void;
}

interface SnackbarProps {
  open: boolean;
  message: string;
  variant: "error" | "warning" | "info" | "success";
}

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
