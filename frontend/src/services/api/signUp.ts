import axios, { AxiosResponse } from "axios";
import { UserRegisterFormData } from "../../interface/forms.interface";

// Função responsável por fazer uma requisição do tipo POST ao servidor com o objetivo de realizar o cadastro de um novo usuário.
export async function signUp(registerData: UserRegisterFormData) {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/user/create",
      JSON.stringify({
        name: registerData.name,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
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
