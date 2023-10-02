import { z } from "zod";

// Schema utilizado na validação dos dados digitados no formulário de editar dados do usuário.
export const dataUserFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  lastName: z.string().nonempty("O sobrenome é obrigatório"),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
});

export type DataUserForm = z.infer<typeof dataUserFormSchema>;
