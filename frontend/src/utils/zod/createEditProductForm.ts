import { z } from "zod";

// Schema utilizado na validação dos dados digitados no formulário de criar/editar produto.
export const createEditProductFormSchema = z.object({
  newProductName: z.string().nonempty("O nome é obrigatório"),
  newProductQuantity: z
    .number({
      errorMap: () => ({ message: "Informe um número válido" }),
    })
    .positive("A quantidade deve ser maior que 0")
    .min(0, "A senha precisa de no mínimo 6 caracteres"),
});

export type CreateEditProductFormSchema = z.infer<
  typeof createEditProductFormSchema
>;
