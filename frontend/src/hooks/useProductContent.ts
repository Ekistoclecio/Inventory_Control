import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAlertContext } from "../providers/context/alertContext";
import { useProductsContext } from "../providers/context/productsContext";
import { useSessionContext } from "../providers/context/sessionContext";
import { deleteUserProduct } from "../services/api/deleteUserProduct";
import { ProductInterface } from "../interface/contexts.interface";

// Hook responsável por gerir a lógica do componente "ProductContent".
export function useProductContent() {
  const {
    productsArray,
    getProducts,
    searchedProducts,
    searchProducts,
    setProductsArray,
    pagination,
  } = useProductsContext();
  const { userSession, logout } = useSessionContext();
  const { openAlert } = useAlertContext();
  const [searchString, setSearchString] = useState<string>("");
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [openCreateEditProductModal, setOpenCreateEditProductModal] =
    useState(false);
  const [productData, setProductData] = useState<ProductInterface>({
    name: "",
    quantity: 0,
    id: "",
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductInterface[]>(
    [] as ProductInterface[]
  );

  // Sempre que o servidor retornar uma nova lista de produtos ou uma lista de produtos pesquisados, atualiza a lista de produtos exibidos na tabela.
  useEffect(() => {
    if (searchedProducts.length <= 0) {
      setProducts(productsArray);
    } else {
      setProducts(searchedProducts);
    }
  }, [productsArray, searchedProducts]);

  // Garante que o sistema fará uma pesquisa por produtos no banco de dados sempre que a variável de pesquisa (searchString) for alterada.
  useEffect(() => {
    searchProducts(searchString);
  }, [searchString]);

  // Função responsável por carregar mais produtos sempre que o usuário realiza o scroll até ao final da tabela.
  async function handleScroll() {
    const scrollContainer = scrollContainerRef.current;
    if (
      scrollContainer &&
      scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight
    ) {
      setLoadingMoreData(true);
      await getProducts(pagination);
      setLoadingMoreData(true);
    }
  }

  // Função responsável por abrir o modal de criar/editar produto, passando alguns dados que irão determinar se o modal será de criação ou edição de produto.
  function handleOpenCreateEditProductModal(
    productName?: string,
    productQuantity?: number,
    productId?: string
  ) {
    if (productName && productQuantity && productId) {
      setProductData({
        name: productName,
        quantity: productQuantity,
        id: productId,
      });
      setOpenCreateEditProductModal(true);
    } else {
      setProductData({
        name: "",
        quantity: 0,
        id: "",
      });
      setOpenCreateEditProductModal(true);
    }
  }

  // Função responsável por iniciar a exclusão de um produto, retornando uma mensagem de sucesso ou erro caso o produto seja ou não excluído.
  async function deleteProduct(productName: string) {
    if (!userSession) return;
    const response = await deleteUserProduct(productName, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      openAlert(response.data.message, "success");
      setProductsArray(
        [...productsArray].filter((item) => item.name !== productName)
      );
    } else {
      openAlert(response?.data.message, "error");
    }
  }

  // Função responsável por realizar a pesquisa de produtos à medida que o usuário vai digitando na barra de busca.
  function handleSearchInputValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchString(event.target.value);
    searchProducts(event.target.value);
  }

  return {
    searchString,
    setSearchString,
    searchedProducts,
    handleSearchInputValue,
    setProducts,
    handleOpenCreateEditProductModal,
    scrollContainerRef,
    handleScroll,
    products,
    loadingMoreData,
    openCreateEditProductModal,
    setOpenCreateEditProductModal,
    productData,
    deleteProduct,
  };
}
