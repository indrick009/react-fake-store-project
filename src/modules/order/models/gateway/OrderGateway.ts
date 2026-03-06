import type { CreateOrderCommand } from "../../use-case/create-order/CreateOrderCommand";
import type { CreateOrderResponse } from "../../use-case/create-order/CreateOrderResponse";
import type { PayOrderCommand } from "../../use-case/pay-order/PayOrderCommand";
import type { PayOrderResponse } from "../../use-case/pay-order/PayOrderResponse";

export interface OrderGateway {
  createOrder(command: CreateOrderCommand): Promise<CreateOrderResponse>;
  payOrder(command: PayOrderCommand): Promise<PayOrderResponse>;
}

