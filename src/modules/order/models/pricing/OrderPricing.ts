export interface OrderPricing {
  getSubtotal(): number;
  getGiftFee(): number;
  getTotal(): number;
  getLabels(): string[];
}

