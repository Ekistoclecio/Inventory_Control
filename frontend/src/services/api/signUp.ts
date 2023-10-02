import axios, { AxiosResponse } from "axios";
import { UserDataRegisterForm } from "../../interface/forms.interface";

export async function signUp(registerData: UserDataRegisterForm) {
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
