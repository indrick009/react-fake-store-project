import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { CreateOrderActions, PayOrderActions } from "../../../actions/GetOrderActions";
import { OrderSelectors } from "../../../slice/OrderSelector";
import { clearOrderState, restartPaymentFlow } from "../../../slice/OrderSlice";
import type { CreateOrderCommand } from "../../../use-case/create-order/CreateOrderCommand";
import type { PayOrderCommand } from "../../../use-case/pay-order/PayOrderCommand";

export const useOrder = () => {
  const dispatch = useAppDispatch();

  const currentOrder = useAppSelector(OrderSelectors.currentOrder);
  const loading = useAppSelector(OrderSelectors.loading);
  const error = useAppSelector(OrderSelectors.error);
  const paymentStatus = useAppSelector(OrderSelectors.paymentStatus);
  const successMessage = useAppSelector(OrderSelectors.successMessage);

  const createOrder = (payload: CreateOrderCommand) => {
    dispatch(CreateOrderActions(payload));
  };

  const submitPayment = (payload: PayOrderCommand) => {
    dispatch(PayOrderActions(payload));
  };

  const clearOrder = () => {
    dispatch(clearOrderState());
  };

  const resetPayment = () => {
    dispatch(restartPaymentFlow());
  };

  return {
    currentOrder,
    loading,
    error,
    paymentStatus,
    successMessage,
    createOrder,
    submitPayment,
    clearOrder,
    resetPayment,
  };
};

export type UseOrderBehavior = ReturnType<typeof useOrder>;

