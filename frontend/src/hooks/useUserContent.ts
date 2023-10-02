import { useState } from "react";
import { useAlertContext } from "../providers/context/alertContext";
import { useSessionContext } from "../providers/context/sessionContext";
import { DataUserForm, dataUserFormSchema } from "../utils/zod/dataUserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataEditForm } from "../interface/forms.interface";
import { changeUserData } from "../services/api/changeUserData";
import { setToStorage } from "../utils/storage";

// Hook responsável por gerir a lógica do componente "UserContent".
export function useUserContent() {
  const defaultEditFieldForm = {
    name: false,
    lastName: false,
    email: false,
  };
  const { userSession, setUserSession, logout } = useSessionContext();
  const { openAlert } = useAlertContext();
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const [editFieldForm, setEditFieldForm] = useState({
    name: false,
    lastName: false,
    email: false,
  });
  const [errorInEmailField, setErrorInEmailField] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataUserForm>({
    mode: "all",
    resolver: zodResolver(dataUserFormSchema),
    values: {
      name: userSession?.name || "",
      lastName: userSession?.lastName || "",
      email: userSession?.email || "",
    },
  });

  // Função responsável por lidar com o clique nos botões de editar os campos dos dados do usuário.
  function handleEditFieldButton(field: "name" | "lastName" | "email") {
    if (!errors[field]) {
      if (!editFieldForm[field]) {
        reset();
      }
      setEditFieldForm({
        ...defaultEditFieldForm,
        [field]: !editFieldForm[field],
      });
    }
  }

  // Função responsável por iniciar a alteração dos dados do usuário, retornando uma mensagem de sucesso ou erro caso a alteração seja concluída ou não.
  async function handleEditForm(userData: UserDataEditForm) {
    console.log(userData);
    if (!userSession) return;
    const response = await changeUserData(userData, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      openAlert(response.data.message, "success");
      setUserSession({
        ...userSession,
        name: userData.name.charAt(0).toUpperCase() + userData.name.slice(1),
        lastName:
          userData.lastName.charAt(0).toUpperCase() +
          userData.lastName.slice(1),
        email: userData.email,
      });
      setToStorage("activeSession", {
        ...userSession,
        name: userData.name.charAt(0).toUpperCase() + userData.name.slice(1),
        lastName:
          userData.lastName.charAt(0).toUpperCase() +
          userData.lastName.slice(1),
        email: userData.email,
      });
      setErrorInEmailField(false);
    } else {
      openAlert(response?.data.message, "error");
      if (response?.data.field === "email") {
        setErrorInEmailField(true);
        setEditFieldForm({
          ...defaultEditFieldForm,
          email: true,
        });
      }
    }
  }

  return {
    handleSubmit,
    handleEditForm,
    errors,
    editFieldForm,
    handleEditFieldButton,
    register,
    errorInEmailField,
    setOpenModalChangePassword,
    openModalChangePassword,
  };
}
