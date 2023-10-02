import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAlertContext } from "../providers/context/alertContext";
import { useProductsContext } from "../providers/context/productsContext";
import { useSessionContext } from "../providers/context/sessionContext";
import { ProductInterface } from "../interface/entities.interface";
import { deleteUserProduct } from "../services/api/deleteUserProduct";

export function useProductContent() {
  const {
    productsArray,
    getProducts,
    searchedProducts,
    searchProducts,
    setProductsArray,
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

  useEffect(() => {
    if (searchedProducts.length <= 0) {
      setProducts(productsArray);
    } else {
      setProducts(searchedProducts);
    }
  }, [productsArray, searchedProducts]);

  useEffect(() => {
    searchProducts(searchString);
  }, [searchString]);

  async function handleScroll() {
    const scrollContainer = scrollContainerRef.current;
    if (
      scrollContainer &&
      scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight
    ) {
      console.log("EXECUTEI");
      setLoadingMoreData(true);
      await getProducts();
      setLoadingMoreData(true);
    }
  }

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

  function handleSearchInputValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log("teste");
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
