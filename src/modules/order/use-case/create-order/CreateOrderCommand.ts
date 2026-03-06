import { Cart } from "../../../cart/models/Cart";

export interface CreateOrderCommand {
  userId: number;
  cart: Cart;
  christmasGift: boolean;
  valentinesGift: boolean;
}

