import axios, { AxiosResponse } from "axios";

// Função responsável por fazer uma requisição do tipo DELETE ao servidor com o objetivo de excluir um produto da lista de produtos do usuário.
export async function deleteUserProduct(productName: string, token: string) {
  try {
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8080/product/delete/${productName}`,
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
