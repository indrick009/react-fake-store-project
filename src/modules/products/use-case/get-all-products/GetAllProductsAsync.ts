import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import { GetAllProductsCommand } from "./GetALLProductCommand";
import type { GetAllProductsResponse } from "./GetAllProductsResponse";

export const GetAllProductsAsync = createAppAsyncThunk<
  GetAllProductsResponse,
  GetAllProductsCommand
>(
  "products/all",
  async (command, { extra: { productsGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: productsGateway.getAllProducts(command),
      rejectWithValue,
    });
  }
);
