import { startAppListening } from "../../../config/create-app-listener-middleware";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { CreateOrderActions, PayOrderActions } from "../actions/GetOrderActions";
import { CreateOrderAsync } from "../use-case/create-order/CreateOrderAsync";
import { PayOrderAsync } from "../use-case/pay-order/PayOrderAsync";

let isOrderListenerRegistered = false;

export const listenWhenOrderRefresh = () => {
  if (isOrderListenerRegistered) return;
  isOrderListenerRegistered = true;

  startAppListening({
    actionCreator: CreateOrderActions,
    effect: async (action, { dispatch, getState }) => {
      if (getState().orderReducer.loading === LoadingState.pending) return;
      dispatch(CreateOrderAsync(action.payload));
    },
  });

  startAppListening({
    actionCreator: PayOrderActions,
    effect: async (action, { dispatch, getState }) => {
      if (getState().orderReducer.loading === LoadingState.pending) return;
      dispatch(PayOrderAsync(action.payload));
    },
  });
};

