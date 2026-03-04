import { ErrorException } from "./ErrorException";

export default class InternalServerException extends ErrorException {
    constructor(msg?: string) {
        super(msg ?? "Une erreur est survenue lors du traitement de votre requête");
        this.type = "InternalServerException";
    }
}
