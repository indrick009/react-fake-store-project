import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../config/create-store";
import { CartEntityAdapter } from "../models/Cart";

const getCartState = (state: RootState) => state.cartReducer;

const cartSelectors = CartEntityAdapter.getSelectors(getCartState);

const SelectAllCarts = cartSelectors.selectAll;
const error = createSelector(getCartState, (state) => state.error);
const getLoadingState = createSelector(getCartState, (state) => state.loading);

export const CartsSelector = {
  SelectAllCarts,
  getLoadingState,
  error,
};
