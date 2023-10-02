import { z } from "zod";

// Schema utilizado na validação dos dados digitados no formulário de login do usuário.
export const loginFormSchema = z.object({
  email: z.string().nonempty("E-mail inválido"),
  password: z.string().min(6, "Senha inválida"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
