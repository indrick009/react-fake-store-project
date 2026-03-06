import { createAction } from "@reduxjs/toolkit";
import type { CreateOrderCommand } from "../use-case/create-order/CreateOrderCommand";
import type { PayOrderCommand } from "../use-case/pay-order/PayOrderCommand";

export const CreateOrderActions = createAction<CreateOrderCommand>("order/createActionCall");
export const PayOrderActions = createAction<PayOrderCommand>("order/payActionCall");

