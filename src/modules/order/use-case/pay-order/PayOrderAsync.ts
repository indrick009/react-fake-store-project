import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import type { PayOrderCommand } from "./PayOrderCommand";
import type { PayOrderResponse } from "./PayOrderResponse";

export const PayOrderAsync = createAppAsyncThunk<
  PayOrderResponse,
  PayOrderCommand
>(
  "order/pay",
  async (command, { extra: { orderGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: orderGateway.payOrder(command),
      rejectWithValue,
    });
  },
);
