import {AuthGateway} from "../../models/gateway/AuthGateway.ts";
import {LoginCommand} from "../../use-case/login/LoginCommand.ts";
import {LoginResponse} from "../../use-case/login/LoginResponse.ts";


export class FakeAuthHttpGateway implements AuthGateway {

  async login(command: LoginCommand): Promise<LoginResponse> {

    console.log(command,"command")
    return Promise.resolve({
      accessToken: "auth-access-token",
      refreshToken: "auth-refresh-token",
    });
  }


}