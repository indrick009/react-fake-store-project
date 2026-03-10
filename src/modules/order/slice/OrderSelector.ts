import type { RootState } from "../../../config/create-store";

export class OrderSelectors {
  static isOpen = (state: RootState) => state.orderReducer.isOpen;
  static currentOrder = (state: RootState) => state.orderReducer.currentOrder;
  static loading = (state: RootState) => state.orderReducer.loading;
  static error = (state: RootState) => state.orderReducer.error;
  static successMessage = (state: RootState) => state.orderReducer.successMessage;
}
