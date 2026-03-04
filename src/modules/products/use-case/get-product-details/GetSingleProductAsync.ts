import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import { GetSigleProductResponse } from "./GetSigleProductResponse";
import { GetSingleProductCommand } from "./GetSingleProductCommand";

export const GetSingleProductAsync = createAppAsyncThunk<
  GetSigleProductResponse,
  GetSingleProductCommand
>(
  "product/single",
  async (command, { extra: { productsGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: productsGateway.getProductDetails(command),
      rejectWithValue,
    });
  },
);
