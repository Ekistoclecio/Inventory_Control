import axios, { AxiosResponse } from "axios";
import { UserLoginFormData } from "../../interface/forms.interface";

// Função responsável por fazer uma requisição do tipo POST ao servidor com o objetivo de realizar o login de um usuário.
export async function signIn(loginData: UserLoginFormData) {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/user/login",
      JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
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
