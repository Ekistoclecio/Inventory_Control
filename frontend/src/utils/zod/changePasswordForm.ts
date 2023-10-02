import { z } from "zod";

// Schema utilizado na validação dos dados digitados no formulário de alteração de senha.
export const changePasswordFormSchema = z
  .object({
    password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
    newPassword: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirmNewPassword: z.string(),
  })
  .refine((fields) => fields.newPassword === fields.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "As senhas precisam ser iguais",
  });

export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
