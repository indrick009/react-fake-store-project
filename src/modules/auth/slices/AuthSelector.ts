import type { RootState } from "../../../config/create-store";

export class AuthSelectors {
  static isAuthenticated = (state: RootState) => state.loginReducer.isAuthenticated;
  static loading = (state: RootState) => state.loginReducer.loading;
  static error = (state: RootState) => state.loginReducer.error;
}