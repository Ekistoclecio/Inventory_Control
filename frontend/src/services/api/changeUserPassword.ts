import axios, { AxiosResponse } from "axios";
import { ChangePasswordFormData } from "../../interface/forms.interface";

// Função responsável por fazer uma requisição do tipo PATCH ao servidor com o objetivo de alterar a senha do usuário.
export async function changeUserPassword(
  dataPassword: ChangePasswordFormData,
  token: string
) {
  try {
    const response: AxiosResponse = await axios.patch(
      "http://localhost:8080/user/changeUserPassword",
      JSON.stringify({
        password: dataPassword.password,
        newPassword: dataPassword.newPassword,
      }),
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
