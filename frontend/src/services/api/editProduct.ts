import axios, { AxiosResponse } from "axios";
import { DataCreateEditProductForm } from "../../interface/forms.interface";

// Função responsável por fazer uma requisição do tipo PUT ao servidor com o objetivo de editar os dados de um produto na lista de produtos do usuário.
export async function editProduct(
  productData: DataCreateEditProductForm,
  productId: string,
  token: string
) {
  try {
    const response: AxiosResponse = await axios.put(
      `http://localhost:8080/product/update`,
      {
        name: productData.newProductName,
        quantity: productData.newProductQuantity,
        product_id: productId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
      return null;
    }
  }
}
