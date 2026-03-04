import { ErrorException } from "./ErrorException";

export class ValidationErrorException extends ErrorException {
    constructor(msg?: string) {
        super(msg ?? 'Erreur de validation');
        this.type = "ValidationErrorException";
    }
}
 export enum ERROR_TYPES {
    ValidationErrorException="ValidationErrorException"
}
