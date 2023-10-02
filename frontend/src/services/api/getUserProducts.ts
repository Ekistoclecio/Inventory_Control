import axios, { AxiosResponse } from "axios";

function defineRoute(getParam: string | number) {
  if (typeof getParam === "number") {
    return `http://localhost:8080/user/products/${getParam}`;
  } else if (getParam.length > 0) {
    return `http://localhost:8080/product?searchString=${getParam}`;
  } else {
    return `http://localhost:8080/product`;
  }
}

export async function getUserProducts(
  getParam: number | string,
  token: string
) {
  try {
    const response: AxiosResponse = await axios.get(defineRoute(getParam), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
