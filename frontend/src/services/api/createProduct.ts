import axios, { AxiosResponse } from "axios";
import { DataCreateEditProductForm } from "../../interface/forms.interface";

// Função responsável por fazer uma requisição do tipo POST ao servidor com o objetivo de criar um novo produto na lista de produtos do usuário.
export async function createProduct(
  productData: DataCreateEditProductForm,
  token: string
) {
  try {
    const response: AxiosResponse = await axios.post(
      `http://localhost:8080/product/create`,
      {
        name: productData.newProductName,
        quantity: productData.newProductQuantity,
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
