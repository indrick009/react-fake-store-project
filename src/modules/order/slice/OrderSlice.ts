import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import type { Order } from "../models/Order";
import type { PaymentStatus } from "../models/payment/PaymentMethod";
import { resolvePaymentState } from "../models/payment/state/PaymentState";
import { CreateOrderAsync } from "../use-case/create-order/CreateOrderAsync";
import { PayOrderAsync } from "../use-case/pay-order/PayOrderAsync";
import { listenWhenOrderRefresh } from "../listerners/ListenWhenOrderRefresh";

type OrderState = {
  isOpen: boolean;
  currentOrder: Order | null;
  loading: LoadingState;
  error: string | null;
  paymentStatus: PaymentStatus;
  successMessage: string | null;
};

const initialOrderState: OrderState = {
  isOpen: false,
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
    toggleOrder(state) {
      state.isOpen = !state.isOpen;
    },
    closeOrder(state) {
      state.isOpen = false;
    },
    clearOrderState() {
      return {
        ...initialOrderState,
        isOpen: false,
      };
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
      .addCase(REHYDRATE as any, (state) => {
        state.isOpen = false;
      })
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
        if (!state.currentOrder) {
          state.loading = LoadingState.failed;
          state.paymentStatus = "idle";
          state.error = "Commande introuvable";
          return;
        }
        const current = resolvePaymentState(state.paymentStatus);
        state.paymentStatus = current.next("SUBMIT_PHONE").status;
      })
      .addCase(PayOrderAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.currentOrder = action.payload.order;
        const current = resolvePaymentState(state.paymentStatus);
        state.paymentStatus =
          action.payload.paymentStatus === "success"
            ? current.next("PAYMENT_SUCCESS").status
            : current.next("PAYMENT_FAILED").status;
        state.successMessage = action.payload.message;
      })
      .addCase(PayOrderAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        const current = resolvePaymentState(state.paymentStatus);
        state.paymentStatus = current.next("PAYMENT_FAILED").status;
        state.successMessage = null;
        const message =
          ((action.payload as { message?: string } | undefined)?.message ??
            action.error.message ??
            "Erreur inconnue");
        state.error = message;

        const normalizedMessage = message.toLowerCase().trim();
        if (normalizedMessage.includes("commande introuvable")) {
          state.currentOrder = null;
          state.paymentStatus = "idle";
          state.successMessage = null;
        }
      });
  },
});

export const { toggleOrder, closeOrder, clearOrderState, restartPaymentFlow } =
  OrderSlice.actions;

listenWhenOrderRefresh();
