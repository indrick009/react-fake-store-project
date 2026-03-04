import { startAppListening } from "../../../config/create-app-listener-middleware";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { GetProfileAsync } from "../../profile/use-case/GetProfileAsync";
import { ProfileActions } from "../actions/GetProfileActions";

let isProfileListenerRegistered = false;

export const listenWhenProfileRefresh = () => {
  if (isProfileListenerRegistered) return;
  isProfileListenerRegistered = true;

  startAppListening({
    actionCreator: ProfileActions,
    effect: async (_, { dispatch, getState }) => {
      if (getState().categoriesReducer.loading === LoadingState.pending) return;
      dispatch(GetProfileAsync(null));
    },
  });
};
