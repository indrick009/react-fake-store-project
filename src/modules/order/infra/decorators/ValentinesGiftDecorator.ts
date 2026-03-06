import { OrderPricingDecorator } from "./OrderPricingDecorator";

const VALENTINES_GIFT_FEE = 2.75;

export class ValentinesGiftDecorator extends OrderPricingDecorator {
  override getGiftFee() {
    return Number((this.wrapped.getGiftFee() + VALENTINES_GIFT_FEE).toFixed(2));
  }

  override getLabels() {
    return [...this.wrapped.getLabels(), "valentines_gift"];
  }
}

