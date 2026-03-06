import type { PaymentProvider, PaymentStatus } from "./payment/PaymentMethod";

export interface OrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  subtotal: number;
  giftFee: number;
  total: number;
  giftOptions: {
    christmasGift: boolean;
    valentinesGift: boolean;
  };
  payment: {
    provider: PaymentProvider | null;
    phoneNumber: string | null;
    status: PaymentStatus;
  };
  createdAt: string;
}

