import axios, { AxiosResponse } from "axios";
import { UserDataLoginForm } from "../../interface/forms.interface";

export async function signIn(loginData: UserDataLoginForm) {
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
