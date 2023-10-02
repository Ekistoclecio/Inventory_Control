import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext } from "./sessionContext";
import { getUserProducts } from "../../services/api/getUserProducts";
import { useAlertContext } from "./alertContext";
import { ProductInterface } from "../../interface/entities.interface";

interface ProductsContextInterface {
  productsArray: ProductInterface[];
  searchedProducts: ProductInterface[];
  pagination: number;
  finishedProducts: boolean;
  setProductsArray: (val: ProductInterface[]) => void;
  setPagination: (val: number) => void;
  setFinishedProducts: (val: boolean) => void;
  setSearchedProducts: (val: ProductInterface[]) => void;
  getProducts: () => void;
  searchProducts: (val: string) => void;
}

const productsContext = createContext<ProductsContextInterface>(
  {} as ProductsContextInterface
);

const Provider = productsContext.Provider;

export const ProductsProvider = (props: any) => {
  const { userSession, logout } = useSessionContext();
  const { openAlert } = useAlertContext();
  const [pagination, setPagination] = useState<number>(0);
  const [finishedProducts, setFinishedProducts] = useState(false);
  const [productsArray, setProductsArray] = useState<ProductInterface[]>(
    [] as ProductInterface[]
  );
  const [searchedProducts, setSearchedProducts] = useState<ProductInterface[]>(
    [] as ProductInterface[]
  );

  useEffect(() => {
    if (userSession?.logged) {
      setPagination(0);
      setFinishedProducts(false);
      getProducts();
    }
  }, [userSession]);

  useEffect(() => {
    if (userSession?.logged) {
      console.log("entrei");
      getProducts();
    }
  }, [finishedProducts]);

  function removeRepetitionsArray(
    curArray: ProductInterface[],
    receivedArray: ProductInterface[]
  ) {
    const curArrayWithoutRepetitions = curArray.filter(
      (curItem: ProductInterface) => {
        return !receivedArray.find(
          (receivedItem: ProductInterface) => curItem.id === receivedItem.id
        );
      }
    );

    return [...curArrayWithoutRepetitions, ...receivedArray];
  }

  async function getProducts() {
    if (!userSession) return;
    if (finishedProducts) return;
    const response = await getUserProducts(pagination, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      setProductsArray(removeRepetitionsArray(productsArray, response.data));
      if (response.data.length < 25) {
        setFinishedProducts(true);
      } else {
        setPagination(pagination + 1);
      }
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  async function searchProducts(searchString: string) {
    if (!userSession) return;
    const response = await getUserProducts(searchString, userSession.token);
    console.log(response?.data);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      setSearchedProducts(response.data);
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  return (
    <Provider
      value={{
        productsArray,
        pagination,
        finishedProducts,
        searchedProducts,
        setProductsArray,
        setPagination,
        setFinishedProducts,
        getProducts,
        setSearchedProducts,
        searchProducts,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useProductsContext = () => useContext(productsContext);
