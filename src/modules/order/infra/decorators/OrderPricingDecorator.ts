import type { OrderPricing } from "../../models/pricing/OrderPricing";

export abstract class OrderPricingDecorator implements OrderPricing {
  constructor(protected readonly wrapped: OrderPricing) {}

  getSubtotal() {
    return this.wrapped.getSubtotal();
  }

  getGiftFee() {
    return this.wrapped.getGiftFee();
  }

  getTotal() {
    return Number((this.getSubtotal() + this.getGiftFee()).toFixed(2));
  }

  getLabels() {
    return this.wrapped.getLabels();
  }
}

