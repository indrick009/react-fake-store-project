import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import { GetAllCartCommand } from "./GetAllCartCommand";
import { GetAllCartsResponse } from "./GetAllCartResponse";

export const GetAllCartsAsync = createAppAsyncThunk<
  GetAllCartsResponse,
  GetAllCartCommand
>(
  "cart/all",
  async (command, { extra: { cartsGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: cartsGateway.getAllCarts(command),
      rejectWithValue,
    });
  }
);
