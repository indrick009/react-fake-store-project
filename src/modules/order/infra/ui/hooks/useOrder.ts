import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { CreateOrderActions, PayOrderActions } from "../../../actions/GetOrderActions";
import { OrderSelectors } from "../../../slice/OrderSelector";
import {
  clearOrderState,
  closeOrder,
  restartPaymentFlow,
  toggleOrder,
} from "../../../slice/OrderSlice";
import type { CreateOrderCommand } from "../../../use-case/create-order/CreateOrderCommand";
import type { PayOrderCommand } from "../../../use-case/pay-order/PayOrderCommand";

export const useOrder = () => {
  const dispatch = useAppDispatch();

  const isOrderOpen = useAppSelector(OrderSelectors.isOpen);
  const currentOrder = useAppSelector(OrderSelectors.currentOrder);
  const loading = useAppSelector(OrderSelectors.loading);
  const error = useAppSelector(OrderSelectors.error);
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

  const onOrderClick = () => {
    dispatch(toggleOrder());
  };

  const onCloseOrder = () => {
    dispatch(closeOrder());
  };

  return {
    isOrderOpen,
    currentOrder,
    loading,
    error,
    successMessage,
    createOrder,
    submitPayment,
    clearOrder,
    resetPayment,
    onOrderClick,
    onCloseOrder,
  };
};

export type UseOrderBehavior = ReturnType<typeof useOrder>;
