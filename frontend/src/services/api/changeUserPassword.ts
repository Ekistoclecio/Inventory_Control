import axios, { AxiosResponse } from "axios";
import { ChangePasswordForm } from "../../interface/forms.interface";

export async function changeUserPassword(
  dataPassword: ChangePasswordForm,
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
