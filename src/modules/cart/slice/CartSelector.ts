import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../config/create-store";

const getCartState = (state: RootState) => state.cartReducer;

const cart = createSelector(getCartState, (state) => state.cart);
const isOpen = createSelector(getCartState, (state) => state.isOpen);
const totalQuantity = createSelector(
  getCartState,
  (state) => state.cart?.totalQuantity ?? 0,
);

export const CartsSelector = {
  cart,
  isOpen,
  totalQuantity,
};