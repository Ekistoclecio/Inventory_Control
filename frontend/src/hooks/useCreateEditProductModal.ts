import { useForm } from "react-hook-form";
import {
  CreateEditProductFormSchema,
  createEditProductFormSchema,
} from "../utils/zod/createEditProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionContext } from "../providers/context/sessionContext";
import { useAlertContext } from "../providers/context/alertContext";
import { useProductsContext } from "../providers/context/productsContext";
import { DataCreateEditProductForm } from "../interface/forms.interface";
import { createProduct } from "../services/api/createProduct";
import { editProduct } from "../services/api/editProduct";
import { HookCreateEditProductModalProps } from "../interface/hooksProps.interface";

// Hook responsável por gerir a lógica do componente "CreateEditProductModal".
export function useCreateEditProductModal({
  closeCreateEditProductModal,
  productId,
  productName,
}: HookCreateEditProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEditProductFormSchema>({
    mode: "all",
    resolver: zodResolver(createEditProductFormSchema),
  });
  const { userSession, logout } = useSessionContext();
  const { openAlert } = useAlertContext();
  const { setFinishedProducts, setProductsArray, productsArray } =
    useProductsContext();

  // Função responsável por restaurar os valores padrão do formulário e em seguida fecha o modal.
  function closeModal() {
    reset();
    closeCreateEditProductModal();
  }

  // Função responsável por inicializar o processo de adição de um novo produto, exibindo uma mensagem de sucesso ou erro caso o produto seja ou não adicionado.
  async function addProduct(data: DataCreateEditProductForm) {
    if (!userSession) return;
    const response = await createProduct(data, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      openAlert(response.data.message, "success");
      setFinishedProducts(false);
      reset();
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  // Função responsável por inicializar o processo de edição dos dados de um produto, exibindo uma mensagem de sucesso ou erro caso os dados sejam ou não alterados.
  async function EditProduct(data: DataCreateEditProductForm) {
    console.log(data);
    if (!userSession) return;
    const response = await editProduct(data, productId, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      openAlert(response.data.message, "success");
      closeModal();
      setProductsArray(
        [...productsArray].map((item) => {
          if (item.id === productId) {
            return {
              name: data.newProductName,
              quantity: data.newProductQuantity,
              id: productId,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  // Função que, com base nas propriedades recebidas pelo modal, determina se o botão de "submit" irá chamar a função de criação ou edição de um produto.
  function handleCreateEditProduct(data: DataCreateEditProductForm) {
    console.log(data);
    if (productName.length > 0) {
      EditProduct(data);
    } else {
      addProduct(data);
    }
  }

  return {
    handleSubmit,
    handleCreateEditProduct,
    errors,
    register,
    closeModal,
  };
}
