import { useState } from "react";
import { UserRegisterFormData } from "../interface/forms.interface";
import { useAlertContext } from "../providers/context/alertContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerFormSchema,
} from "../utils/zod/registerForm";
import { signUp } from "../services/api/signUp";
import { HookRegisterFormProps } from "../interface/hooksProps.interface";

// Hook responsável por gerir a lógica do componente "RegisterForm".
export function useRegisterForm({ changeLoginForm }: HookRegisterFormProps) {
  const { openAlert } = useAlertContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "all",
    resolver: zodResolver(registerFormSchema),
  });

  // Função responsável por iniciar o registro de um usuário, exibindo uma mensagem de sucesso ou erro caso o usuário consiga ou não se registrar.
  async function userRegister(registerData: UserRegisterFormData) {
    const response = await signUp(registerData);
    if (response?.status && response.status >= 200 && response.status <= 300) {
      openAlert(response.data.message, "success");
      changeLoginForm();
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  return {
    handleSubmit,
    userRegister,
    errors,
    register,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
