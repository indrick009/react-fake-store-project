import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import type { Order } from "../models/Order";
import type { PaymentStatus } from "../models/payment/PaymentMethod";
import { resolvePaymentState } from "../models/payment/state/PaymentState";
import { CreateOrderAsync } from "../use-case/create-order/CreateOrderAsync";
import { PayOrderAsync } from "../use-case/pay-order/PayOrderAsync";
import { listenWhenOrderRefresh } from "../listerners/ListenWhenOrderRefresh";

type OrderState = {
  currentOrder: Order | null;
  loading: LoadingState;
  error: string | null;
  paymentStatus: PaymentStatus;
  successMessage: string | null;
};

const initialOrderState: OrderState = {
  currentOrder: null,
  loading: LoadingState.idle,
  error: null,
  paymentStatus: "idle",
  successMessage: null,
};

export const OrderSlice = createSlice({
  name: "order-slice",
  initialState: initialOrderState,
  reducers: {
    clearOrderState() {
      return initialOrderState;
    },
    restartPaymentFlow(state) {
      const current = resolvePaymentState(state.paymentStatus);
      state.paymentStatus = current.next("RESET").status;
      state.successMessage = null;
      state.error = null;
      if (state.currentOrder) {
        state.currentOrder.payment.status = state.paymentStatus;
        state.currentOrder.payment.provider = null;
        state.currentOrder.payment.phoneNumber = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrderAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(CreateOrderAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.currentOrder = action.payload.order;
        state.paymentStatus = action.payload.order.payment.status;
      })
      .addCase(CreateOrderAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        state.error =
          ((action.payload as { message?: string } | undefined)?.message ??
            action.error.message ??
            "Erreur inconnue");
      })
      .addCase(PayOrderAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
        const current = resolvePaymentState(state.paymentStatus);
        state.paymentStatus = current.next("SUBMIT_PHONE").status;
      })
      .addCase(PayOrderAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.currentOrder = action.payload.order;
        const current = resolvePaymentState(state.paymentStatus);
        state.paymentStatus = current.next("PAYMENT_SUCCESS").status;
        state.successMessage = action.payload.message;
      })
      .addCase(PayOrderAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        const current = resolvePaymentState(state.paymentStatus);
        state.paymentStatus = current.next("PAYMENT_FAILED").status;
        state.error =
          ((action.payload as { message?: string } | undefined)?.message ??
            action.error.message ??
            "Erreur inconnue");
      });
  },
});

export const { clearOrderState, restartPaymentFlow } = OrderSlice.actions;

listenWhenOrderRefresh();

