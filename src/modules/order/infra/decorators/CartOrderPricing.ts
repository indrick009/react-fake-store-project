import type { Cart } from "../../../cart/models/Cart";
import type { OrderPricing } from "../../models/pricing/OrderPricing";

export class CartOrderPricing implements OrderPricing {
  constructor(private readonly cart: Cart) {}

  getSubtotal() {
    return Number(this.cart.products.reduce((sum, item) => sum + item.total, 0).toFixed(2));
  }

  getGiftFee() {
    return 0;
  }

  getTotal() {
    return this.getSubtotal();
  }

  getLabels() {
    return [];
  }
}

