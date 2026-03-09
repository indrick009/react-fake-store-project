/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorExceptionType } from "../shared/exceptions/ErrorExceptionType";
import { AlertType } from "../shared/lib/Notify";

export interface ErrorState {
  message: string;
  status: boolean;
  type: ErrorExceptionType;
  alertType: AlertType;
}
