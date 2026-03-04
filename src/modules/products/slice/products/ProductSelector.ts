import { createSelector } from "@reduxjs/toolkit";
import { ProductEntityAdapter } from "../../models/products/productEntity";
import { RootState } from "../../../../config/create-store";

const getProductState = (state: RootState) => state.productReducer;

const productSelectors = ProductEntityAdapter.getSelectors(getProductState);

const SelectAllProducts = productSelectors.selectAll;
const error = createSelector(getProductState, (state) => state.error);
const getLoadingState = createSelector(
  getProductState,
  (state) => state.loading,
);

const getProductDetailsLoadingState = createSelector(
  getProductState,
  (state) => state.productDetailsLoading,
);
const selectedProduct = createSelector(
  getProductState,
  (state) => state.selectedProduct,
);
const productDetailsError = createSelector(
  getProductState,
  (state) => state.productDetailsError,
);

// const getTotalItems = createSelector(
//   getProductState,
//   (state) => state.totalItems
// );
// const getCurrentPage = createSelector(
//   getProductState,
//   (state) => state.currentPage
// );

export const ProductSelector = {
  SelectAllProducts,
  getLoadingState,
  error,
  selectedProduct,
  productDetailsError,
  getProductDetailsLoadingState,
  // getTotalItems,
  // getCurrentPage,
};
