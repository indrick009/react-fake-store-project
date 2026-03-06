import type { PaymentProvider } from "../../models/payment/PaymentMethod";

export interface PayOrderCommand {
  orderId: number;
  provider: PaymentProvider;
  phoneNumber: string;
}

