import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { LoginAsync } from "../use-case/login/LoginAsync";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  loading: LoadingState;
  error: string | null;
  isAuthenticated: boolean;
};

const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: LoadingState.idle,
  error: null,
  isAuthenticated: false,
};

export const LoginSlice = createSlice({
  name: "auth-slice",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        state.error =
          (action.payload as { message?: string } | undefined)?.message ??
          action.error.message ??
          "Erreur inconnue";
      });
  },
});
