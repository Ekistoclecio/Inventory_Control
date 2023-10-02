import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteDoStorage,
  getToStorage,
  setToStorage,
} from "../../utils/storage";
import { signIn } from "../../services/api/signIn";
import { useAlertContext } from "./alertContext";
import { UserLoginFormData } from "../../interface/forms.interface";
import {
  SessionContextInterface,
  UserSessionInterface,
} from "../../interface/contexts.interface";

// Fornece para todo o sistema as variáveis e funções necessárias para a manipulação de estados relacionados à sessão atual do usuário.

const sessionContext = createContext<SessionContextInterface>(
  {} as SessionContextInterface
);

const Provider = sessionContext.Provider;

const defaultUserSessionObject: UserSessionInterface = {
  name: "",
  lastName: "",
  email: "",
  token: "",
  logged: false,
};

export const SessionProvider = (props: any) => {
  const { openAlert } = useAlertContext();
  const [userSession, setUserSession] = useState<UserSessionInterface>();

  // Assim que a aplicação é renderizada, carrega os dados da sessão armazenados no localStorage, se existirem.
  useEffect(() => {
    const activeSession = getToStorage("activeSession");
    if (activeSession) {
      setUserSession(activeSession);
    } else {
      setUserSession(defaultUserSessionObject);
    }
  }, []);

  // Função responsável por iniciar o login do usuário e exibir uma mensagem de erro caso o login não seja bem-sucedido.
  async function login(loginData: UserLoginFormData) {
    const response = await signIn(loginData);
    if (response?.status && response.status >= 200 && response.status <= 300) {
      setUserSession({ ...response.data, logged: true });
      setToStorage("activeSession", { ...response.data, logged: true });
    } else {
      console.log(response?.data.message);
      openAlert(response?.data.message, "error");
    }
  }

  // Função responsável por realizar o logout do usuário.
  function logout() {
    window.location.href = "/";
    setUserSession(defaultUserSessionObject);
    deleteDoStorage("activeSession");
  }

  return (
    <Provider
      value={{
        userSession,
        setUserSession,
        login,
        logout,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useSessionContext = () => useContext(sessionContext);
