import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import { GetProductCategoriesResponse } from "./GetProductsCategoriesResponse";

export const GetProductCategoriesAsync = createAppAsyncThunk<
  GetProductCategoriesResponse,
  null
>(
  "product/single",
  async (_, { extra: { productsGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: productsGateway.getProductCategories(),
      rejectWithValue,
    });
  },
);
