import axios, { AxiosResponse } from "axios";
import { DataCreateEditProductForm } from "../../components/CreateEditProductModal";

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
