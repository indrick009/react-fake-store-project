import { createSlice, EntityState } from "@reduxjs/toolkit";
import { Product, ProductEntityAdapter } from "../../models/products/productEntity";
import { GetAllProductsAsync } from "../../use-case/get-all-products/GetAllProductsAsync";
import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import { GetSingleProductAsync } from "../../use-case/get-product-details/GetSingleProductAsync";
import { listenWhenProductsRefreshOrPagine } from "../../listerners/ListenWhenProductsrefreshOrPagine";

type ProductState = EntityState<Product, number> & {
  loading: LoadingState;
  error: string | null;
  selectedProduct: Product | null;
  productDetailsLoading: LoadingState;
  productDetailsError: string | null;
};

const initialProductsState: ProductState = ProductEntityAdapter.getInitialState(
  {
    products: [],
    loading: LoadingState.idle,
    error: null,
    selectedProduct: null,
    productDetailsLoading: LoadingState.idle,
    productDetailsError: null,
  },
);

export const ProductSlice = createSlice({
  name: "products-slice",
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllProductsAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
      })
      .addCase(GetAllProductsAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        ProductEntityAdapter.setAll(state, action.payload.products);
      })
      .addCase(GetAllProductsAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        state.error = action.error.message ?? "Erreur inconnue";
      })
      .addCase(GetSingleProductAsync.pending, (state) => {
        state.productDetailsLoading = LoadingState.pending;
        state.productDetailsError = null;
      })
      .addCase(GetSingleProductAsync.fulfilled, (state, action) => {
        state.productDetailsLoading = LoadingState.success;
        state.selectedProduct = action.payload.product;
        state.productDetailsError = null;
      })
      .addCase(GetSingleProductAsync.rejected, (state, action) => {
        state.productDetailsLoading = LoadingState.failed;
        state.productDetailsError = action.error.message ?? "Erreur inconnue";
      });
  },
});
listenWhenProductsRefreshOrPagine();
