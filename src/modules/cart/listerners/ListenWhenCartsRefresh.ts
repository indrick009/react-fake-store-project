import { startAppListening } from "../../../config/create-app-listener-middleware";
import { CartsActions } from "../actions/GetCartsActions";


export const listenWhenCartsRefresh = () => {
  startAppListening({
    actionCreator: CartsActions,
    effect: async (action, { dispatch, getState }) => {
      console.log(getState);
      // dispatch(GetAllCartsAsync(action.payload));
    },
  });
};
