/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ErrorExceptionType } from "../exceptions/ErrorExceptionType";
import type { AlertType } from "../lib/Notify";


export interface ErrorState{
    message: string,
    status : boolean,
    type : ErrorExceptionType;
    alertType: AlertType;
}
