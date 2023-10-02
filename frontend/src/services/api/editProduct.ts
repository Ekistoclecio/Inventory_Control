import axios, { AxiosResponse } from "axios";
import { DataCreateEditProductForm } from "../../components/CreateEditProductModal";

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
