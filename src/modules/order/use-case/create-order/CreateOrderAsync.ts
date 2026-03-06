import { apiMiddleware, createAppAsyncThunk } from "../../../../config/create-app-thunk";
import type { CreateOrderCommand } from "./CreateOrderCommand";
import type { CreateOrderResponse } from "./CreateOrderResponse";

export const CreateOrderAsync = createAppAsyncThunk<CreateOrderResponse, CreateOrderCommand>(
  "order/create",
  async (command, { extra: { orderGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: orderGateway.createOrder(command),
      rejectWithValue,
    });
  },
);

