import type { Order } from "../../models/Order";
import type { PaymentStatus } from "../../models/payment/PaymentMethod";

export interface PayOrderResponse {
  order: Order;
  paymentStatus: PaymentStatus;
  message: string;
}

