import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import { LoginCommand } from "./LoginCommand";
import { LoginResponse } from "./LoginResponse";

export const LoginAsync = createAppAsyncThunk<LoginResponse, LoginCommand>(
  "auth/login",
  async (command, { extra: { authGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: authGateway.login(command),
      rejectWithValue,
    });
  },
);
