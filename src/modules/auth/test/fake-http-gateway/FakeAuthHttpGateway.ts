import {AuthGateway} from "../../models/gateway/AuthGateway.ts";
import {LoginResponse} from "../../use-case/login/LoginResponse.ts";


export class FakeAuthHttpGateway implements AuthGateway {

  async login(): Promise<LoginResponse> {
    return Promise.resolve({
      accessToken: "auth-access-token",
      refreshToken: "auth-refresh-token",
    });
  }


}