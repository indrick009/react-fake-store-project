import { LoginCommand } from "../../use-case/login/LoginCommand";
import { LoginResponse } from "../../use-case/login/LoginResponse";

export interface AuthGateway {
    login(command:LoginCommand): Promise<LoginResponse>;
}