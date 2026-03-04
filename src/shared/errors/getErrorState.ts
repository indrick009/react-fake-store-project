import { AlertType } from "../lib/Notify";
import type { ErrorState } from "./ErrorState";
import { parseMessages } from "./parseMessageResponse";

export const getErrorState = (error: any): ErrorState => {
  return {
    message: parseMessages(error),
    status: false,
    type: error.type,
    alertType: error.level === "warning" ? AlertType.WARNING : AlertType.ERROR,
  };
};
