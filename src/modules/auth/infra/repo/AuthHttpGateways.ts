import type { HttpClient } from "../../../../shared/gateway/HttpClient";
import { AuthGateway } from "../../models/gateway/AuthGateway";
import { LoginCommand } from "../../use-case/login/LoginCommand";
import { LoginResponse } from "../../use-case/login/LoginResponse";
import { loginRoutes } from "./ApiRoutes";

export class AuthHttpGateway implements AuthGateway {
  constructor(private httpProvider: HttpClient) {}

  async login(command: LoginCommand): Promise<LoginResponse> {
    const result = await this.httpProvider
      .post(loginRoutes.login, command,{ includeCred: false })  
      .then((res) => res.json());
    return { accessToken: result["accessToken"] ,refreshToken:result['refreshToken']};
  }
}