import { createSlice, EntityState } from "@reduxjs/toolkit";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { Cart, CartEntityAdapter } from "../models/Cart";
import { GetAllCartsAsync } from "../use-case/get-all-cart/GetAllCartAsync";

type CartState = EntityState<Cart, string> & {
  loading: LoadingState;
  error: string | null;
};

const initialCartState: CartState = CartEntityAdapter.getInitialState({
  carts: [],
  loading: LoadingState.idle,
  error: null,
});

export const CartSlice = createSlice({
  name: "cart-slice",
  initialState: initialCartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCartsAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
      })
      .addCase(GetAllCartsAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        CartEntityAdapter.setAll(state, action.payload.carts);
      })
      .addCase(GetAllCartsAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        state.error = action.error.message ?? "Erreur inconnue";
      });
  },
});
// listenWhenProductsRefreshOrPagine();
