import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { useCallback } from "react";
import { CategoriesSelectors } from "../../../slice/categories/CategoriesSelector";
import { GetProductCategoriesAsync } from "../../../use-case/get-products-categories/GetProductsCategoriesAsync";

export const useCategories = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(CategoriesSelectors.categories);
  const catLoading = useAppSelector(CategoriesSelectors.loading);
  const catError = useAppSelector(CategoriesSelectors.error);

  const getProductCategoriesDetails = useCallback(() => {
    return dispatch(GetProductCategoriesAsync(null));
  }, [dispatch]);

  return {
    categories,
    catLoading,
    catError,
    getProductCategoriesDetails,
  };
};
