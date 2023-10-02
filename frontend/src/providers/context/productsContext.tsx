import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext } from "./sessionContext";
import { getUserProducts } from "../../services/api/getUserProducts";
import { useAlertContext } from "./alertContext";
import {
  ProductInterface,
  ProductsContextInterface,
} from "../../interface/contexts.interface";

// Fornece para todo o sistema as variáveis e funções necessárias para a manipulação de estados e lista de produtos do usuário do lado do cliente.

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

  // Restaura o status de paginação e lista de produtos caso o status da sessão mude.
  useEffect(() => {
    if (userSession?.logged) {
      setPagination(0);
      setFinishedProducts(false);
      getProducts(0);
    }
  }, [userSession]);

  // Realiza uma nova busca no banco de dados se o status que representa se todos os produtos já foram buscados no banco de dados mudar,
  // mantendo a lista de produtos local atualizada.
  useEffect(() => {
    if (userSession?.logged) {
      getProducts(pagination);
    }
  }, [finishedProducts]);

  // Função responsável por garantir que não haverá produtos repetidos na lista de produtos local.
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

  // Função responsável por iniciar a requisição da lista de produtos no banco de dados com base na paginação atual.
  async function getProducts(curPagination: number) {
    if (!userSession) return;
    if (finishedProducts) return;

    const response = await getUserProducts(curPagination, userSession.token);
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

  // Função responsável por iniciar uma pesquisa nos produtos do banco de dados com base em uma string de pesquisa digitada pelo usuário.
  async function searchProducts(searchString: string) {
    if (!userSession) return;
    const response = await getUserProducts(searchString, userSession.token);
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
