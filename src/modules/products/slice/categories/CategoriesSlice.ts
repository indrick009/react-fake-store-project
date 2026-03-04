import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import { CategoryEntity } from "../../models/categories/CategoryEntity";
import { GetProductCategoriesAsync } from "../../use-case/get-products-categories/GetProductsCategoriesAsync";

type CategoryState = {
  categories: CategoryEntity[];
  loading: LoadingState;
  error: string | null;
};

const initialProductsState: CategoryState = {
  categories: [],
  loading: LoadingState.idle,
  error: null,
};

export const CategoriesSlice = createSlice({
  name: "categories-slice",
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProductCategoriesAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
      })
      .addCase(GetProductCategoriesAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.categories = action.payload?.categories ?? [];
      })
      .addCase(GetProductCategoriesAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        state.error = action.error.message ?? "Erreur inconnue";
      });
  },
});
