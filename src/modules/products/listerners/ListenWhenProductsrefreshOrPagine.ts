import { startAppListening } from "../../../config/create-app-listener-middleware";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { ProductsActions } from "../actions/GetProductsActions";
import { GetAllProductsAsync } from "../use-case/get-all-products/GetAllProductsAsync";

let isProfileListenerRegistered = false;

export const listenWhenProductsRefreshOrPagine = () => {
  if (isProfileListenerRegistered) return;
  isProfileListenerRegistered = true;

  startAppListening({
     actionCreator: ProductsActions,
    effect: async (action, { dispatch, getState }) => {
      if (getState().productReducer.loading === LoadingState.pending) return;
      dispatch(GetAllProductsAsync(action.payload));
    },
  });
};
