import { z } from "zod";

// Schema utilizado na validação dos dados digitados no formulário de registro de um novo usuário.
export const registerFormSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    lastName: z.string().nonempty("O sobrenome é obrigatório"),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Formato de e-mail inválido"),
    password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
