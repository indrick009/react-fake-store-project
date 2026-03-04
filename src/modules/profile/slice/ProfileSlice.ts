import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { CurrentUser } from "../models/CurrentUser";
import { GetProfileAsync } from "../use-case/GetProfileAsync";
import { listenWhenProfileRefresh } from "../listerners/ListenWhenProfileRefresh";

type ProfileState = {
  currentUser: CurrentUser | null;
  loading: LoadingState;
  error: string | null;
};

const initialAuthState: ProfileState = {
  loading: LoadingState.idle,
  error: null,
  currentUser: null,
};

export const ProfileSlice = createSlice({
  name: "profile-slice",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProfileAsync.pending, (state) => {
        console.log("=========1")
        state.loading = LoadingState.pending;
        state.error = null;
      })
      .addCase(GetProfileAsync.fulfilled, (state, action) => {
        console.log("=========2",action.payload.currentUser)
        state.loading = LoadingState.success;
        state.currentUser = action.payload.currentUser;
      })
      .addCase(GetProfileAsync.rejected, (state, action) => {
        console.log("=========3")
        state.loading = LoadingState.failed;
        state.error = action.error.message ?? "Erreur inconnue";
      });
  },
});

listenWhenProfileRefresh();
