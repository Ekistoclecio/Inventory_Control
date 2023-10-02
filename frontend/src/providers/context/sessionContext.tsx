import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteDoStorage,
  getToStorage,
  setToStorage,
} from "../../utils/storage";
import { signIn } from "../../services/api/signIn";
import { useAlertContext } from "./alertContext";
import { UserDataLoginForm } from "../../interface/forms.interface";

interface SessionContextInterface {
  userSession: UserSessionInterface | undefined;
  setUserSession: (val: UserSessionInterface) => void;
  login: (loginData: UserDataLoginForm) => void;
  logout: () => void;
}

interface UserSessionInterface {
  name: string;
  lastName: string;
  email: string;
  token: string;
  logged: boolean;
}

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

  useEffect(() => {
    const activeSession = getToStorage("activeSession");
    if (activeSession) {
      setUserSession(activeSession);
    } else {
      setUserSession(defaultUserSessionObject);
    }
  }, []);

  async function login(loginData: UserDataLoginForm) {
    const response = await signIn(loginData);
    if (response?.status && response.status >= 200 && response.status <= 300) {
      setUserSession({ ...response.data, logged: true });
      setToStorage("activeSession", { ...response.data, logged: true });
    } else {
      console.log(response?.data.message);
      openAlert(response?.data.message, "error");
    }
  }

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
