import { RootState } from "../../../config/create-store";

export class ProfileSelectors {
  static currentUser = (state: RootState) => state.profileReducer.currentUser;
  static loading = (state: RootState) => state.profileReducer.loading;
  static error = (state: RootState) => state.profileReducer.error;
  static isOpen = (state: RootState) => state.profileReducer.isOpen;
}