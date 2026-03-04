import { ProductSelector } from "../../../slice/products/ProductSelector";
import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { GetSingleProductAsync } from "../../../use-case/get-product-details/GetSingleProductAsync";
import { useCallback } from "react";

export const useProductsDetails = () => {
  const dispatch = useAppDispatch();

  const selectedProduct = useAppSelector(ProductSelector.selectedProduct);

  const loadingProductDetails = useAppSelector(
    ProductSelector.getProductDetailsLoadingState,
  );
  const errorProductDetails = useAppSelector(
    ProductSelector.productDetailsError,
  );

  const getProductDetails = useCallback(
    (id: number) => {
      return dispatch(GetSingleProductAsync({ id }));
    },
    [dispatch],
  );

  return {
    selectedProduct,
    loadingProductDetails,
    errorProductDetails,

    getProductDetails,
  };
};

export type UseProductsBehavoir = ReturnType<typeof useProductsDetails>;
