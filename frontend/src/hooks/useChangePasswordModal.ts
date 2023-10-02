import { useState } from "react";
import { useAlertContext } from "../providers/context/alertContext";
import { useSessionContext } from "../providers/context/sessionContext";
import { useForm } from "react-hook-form";
import {
  ChangePasswordFormSchema,
  changePasswordFormSchema,
} from "../utils/zod/changePasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordFormData } from "../interface/forms.interface";
import { changeUserPassword } from "../services/api/changeUserPassword";
import { HookChangePasswordModalProps } from "../interface/hooksProps.interface";

export function useChangePasswordModal({
  closeChangePasswordModal,
}: HookChangePasswordModalProps) {
  const { userSession, logout } = useSessionContext();
  const { openAlert } = useAlertContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormSchema>({
    mode: "all",
    resolver: zodResolver(changePasswordFormSchema),
  });

  // Função responsável por inicializar o processo de alteração de senha do usuário, exibindo uma mensagem de sucesso ou erro caso a senha seja ou não alterada.
  async function changePassword(dataPassword: ChangePasswordFormData) {
    console.log(dataPassword);
    if (!userSession) return;
    const response = await changeUserPassword(dataPassword, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      openAlert(response.data.message, "success");
      closeModal();
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  // Função responsável por restaurar os valores padrão do formulário e em seguida fecha o modal de alterar senha.
  function closeModal() {
    reset();
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    closeChangePasswordModal();
  }

  return {
    closeModal,
    handleSubmit,
    changePassword,
    showPassword,
    errors,
    setShowPassword,
    register,
    showNewPassword,
    setShowNewPassword,
    showConfirmNewPassword,
    setShowConfirmNewPassword,
  };
}
