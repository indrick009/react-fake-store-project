import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import type { Order } from "../models/Order";
import { resolvePaymentState } from "../models/payment/state/PaymentState";
import { CreateOrderAsync } from "../use-case/create-order/CreateOrderAsync";
import { PayOrderAsync } from "../use-case/pay-order/PayOrderAsync";
import { listenWhenOrderRefresh } from "../listerners/ListenWhenOrderRefresh";

type OrderState = {
  isOpen: boolean;
  currentOrder: Order | null;
  loading: LoadingState;
  error: string | null;
  successMessage: string | null;
};

const initialOrderState: OrderState = {
  isOpen: false,
  currentOrder: null,
  loading: LoadingState.idle,
  error: null,
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
      const currentStatus = state.currentOrder?.payment.status ?? "idle";
      const current = resolvePaymentState(currentStatus);
      const nextStatus = current.next("RESET").status;
      state.successMessage = null;
      state.error = null;
      if (state.currentOrder) {
        state.currentOrder.payment.status = nextStatus;
        state.currentOrder.payment.provider = null;
        state.currentOrder.payment.phoneNumber = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE as any, (state) => {
        state.isOpen = false;
        state.error =""
      })
      .addCase(CreateOrderAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(CreateOrderAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.currentOrder = action.payload.order;
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
          state.error = "Commande introuvable";
          return;
        }
        const current = resolvePaymentState(state.currentOrder.payment.status);
        state.currentOrder.payment.status = current.next("SUBMIT_PHONE").status;
      })
      .addCase(PayOrderAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.currentOrder = action.payload.order;
        if (state.currentOrder) {
          const current = resolvePaymentState(state.currentOrder.payment.status);
          state.currentOrder.payment.status =
            action.payload.paymentStatus === "success"
              ? current.next("PAYMENT_SUCCESS").status
              : current.next("PAYMENT_FAILED").status;
        }
        state.successMessage = action.payload.message;
      })
      .addCase(PayOrderAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        if (state.currentOrder) {
          const current = resolvePaymentState(state.currentOrder.payment.status);
          state.currentOrder.payment.status = current.next("PAYMENT_FAILED").status;
        }
        state.successMessage = null;
        const message =
          ((action.payload as { message?: string } | undefined)?.message ??
            action.error.message ??
            "Erreur inconnue");
        state.error = message;

        const normalizedMessage = message.toLowerCase().trim();
        if (normalizedMessage.includes("commande introuvable")) {
          state.currentOrder = null;
          state.successMessage = null;
        }
      });
  },
});

export const { toggleOrder, closeOrder, clearOrderState, restartPaymentFlow } =
  OrderSlice.actions;

listenWhenOrderRefresh();
