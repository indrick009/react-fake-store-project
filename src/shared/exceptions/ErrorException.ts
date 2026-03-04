import type { ErrorExceptionType } from "./ErrorExceptionType";

export class ErrorException extends Error {
    type: ErrorExceptionType;
    constructor(msg: string) {
        super(msg);
        this.type = "ErrorException";
    }
}
