import { ProductSelector } from "../../../slice/products/ProductSelector";
import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { GetSingleProductAsync } from "../../../use-case/get-product-details/GetSingleProductAsync";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../../../../shared/hooks/useDebounce";
import { useQueryPagination } from "../../../../../shared/hooks/useQueryPagination";

export const useProducts = () => {
  const dispatch = useAppDispatch();

  const allProducts = useAppSelector(ProductSelector.SelectAllProducts);
  const loadingProducts = useAppSelector(ProductSelector.getLoadingState);
  const error = useAppSelector(ProductSelector.error);
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("productSearchTerm") || "";
  });
  const selectedProduct = useAppSelector(ProductSelector.selectedProduct);

  const loadingProductDetails = useAppSelector(
    ProductSelector.getProductDetailsLoadingState,
  );
  const errorProductDetails = useAppSelector(
    ProductSelector.productDetailsError,
  );

  const queryPagination = useQueryPagination({
    initialLimit: 10,
    initialPage: 1,
  });

  const debounceSearch = useDebounce(searchTerm, 800);

  useEffect(() => {
    queryPagination.updateQueryParams({
      search: debounceSearch,
      page: "1",
    });
  }, [debounceSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem("productSearchTerm", value);
  };

  const setCategories = (value: string) => {
    queryPagination.setCategories(value);
  };

  const getProductDetails = useCallback(
    (id: number) => {
      return dispatch(GetSingleProductAsync({ id }));
    },
    [dispatch],
  );

  return {
    allProducts,
    loadingProducts,
    error,
    selectedProduct,
    loadingProductDetails,
    errorProductDetails,
    getProductDetails,
    selectedCategory: queryPagination.selectedCategory,
    page: queryPagination.page,
    limit: queryPagination.limit,
    handlePageChange: (nextPage: number) =>
      queryPagination.handleQueryPaginationData(nextPage, queryPagination.limit),
    handleLimitChange: (nextLimit: number) =>
      queryPagination.handleQueryPaginationData(1, nextLimit),
    searchTerm,
    handleSearch,
    setCategories,
  };
};

export type UseProductsBehavoir = ReturnType<typeof useProducts>;
