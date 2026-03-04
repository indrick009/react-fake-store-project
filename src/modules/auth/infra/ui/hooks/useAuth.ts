import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { AuthSelectors } from "../../../slices/AuthSelector";
import { LoginAsync } from "../../../use-case/login/LoginAsync";
import { LoginCommand } from "../../../use-case/login/LoginCommand";
import { ProfileActions } from "../../../../profile/actions/GetProfileActions";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const loading = useAppSelector(AuthSelectors.loading);
  const error = useAppSelector(AuthSelectors.error);

  async function login(payload: LoginCommand) {
    const result = await dispatch(LoginAsync(payload));
    if (LoginAsync.fulfilled.match(result)) {
      dispatch(ProfileActions());
    }
    return result;
  }

  return { isAuthenticated, loading, error, login };
};
