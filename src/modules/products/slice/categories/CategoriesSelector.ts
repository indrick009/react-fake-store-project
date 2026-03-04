import { RootState } from "../../../../config/create-store";

export class CategoriesSelectors {
  static categories = (state: RootState) =>
    state.categoriesReducer?.categories ?? [];
  static loading = (state: RootState) => state.categoriesReducer?.loading;
  static error = (state: RootState) => state.categoriesReducer?.error ?? null;
}
