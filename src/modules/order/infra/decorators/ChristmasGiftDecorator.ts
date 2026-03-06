import { OrderPricingDecorator } from "./OrderPricingDecorator";

const CHRISTMAS_GIFT_FEE = 3.5;

export class ChristmasGiftDecorator extends OrderPricingDecorator {
  override getGiftFee() {
    return Number((this.wrapped.getGiftFee() + CHRISTMAS_GIFT_FEE).toFixed(2));
  }

  override getLabels() {
    return [...this.wrapped.getLabels(), "christmas_gift"];
  }
}

