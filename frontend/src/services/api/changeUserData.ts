import axios, { AxiosResponse } from "axios";
import { UserDataEditForm } from "../../interface/forms.interface";

export async function changeUserData(
  userData: UserDataEditForm,
  token: string
) {
  try {
    const response: AxiosResponse = await axios.put(
      "http://localhost:8080/user/changeUserData",
      JSON.stringify({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
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
