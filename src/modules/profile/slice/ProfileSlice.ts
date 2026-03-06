import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../shared/domain/enums/LoadingState";
import { CurrentUser } from "../models/CurrentUser";
import { GetProfileAsync } from "../use-case/GetProfileAsync";
import { listenWhenProfileRefresh } from "../listerners/ListenWhenProfileRefresh";

type ProfileState = {
  currentUser: CurrentUser | null;
  loading: LoadingState;
  error: string | null;
  isOpen: boolean;
};

const initialAuthState: ProfileState = {
  loading: LoadingState.idle,
  error: null,
  currentUser: null,
  isOpen: false,
};

export const ProfileSlice = createSlice({
  name: "profile-slice",
  initialState: initialAuthState,
  reducers: {
    toggleProfile(state) {
      state.isOpen = !state.isOpen;
    },
    closeProfile(state) {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProfileAsync.pending, (state) => {
        state.loading = LoadingState.pending;
        state.error = null;
      })
      .addCase(GetProfileAsync.fulfilled, (state, action) => {
        state.loading = LoadingState.success;
        state.currentUser = action.payload.currentUser;
      })
      .addCase(GetProfileAsync.rejected, (state, action) => {
        state.loading = LoadingState.failed;
        state.error = action.error.message ?? "Erreur inconnue";
      });
  },
});

export const { toggleProfile: toggleProfile, closeProfile: closeProfile } =
  ProfileSlice.actions;

listenWhenProfileRefresh();
