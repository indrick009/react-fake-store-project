import { HttpClient } from "../../../../shared/gateway/HttpClient";
import { ProfileGateway } from "../../models/gateway/ProfileGateway";
import { GetProfileResponse } from "../../use-case/GetProfileResponse";
import ProfileFactory from "../factories/ProfileFactory";
import { profileRoutes } from "./ApiRoutes";

export class ProfileHttpGateway implements ProfileGateway {
  constructor(private httpProvider: HttpClient) {}

  async getProfile(): Promise<GetProfileResponse> {
    const result = await this.httpProvider
      .get(profileRoutes.getProfile, { includeCred: false })
      .then((res) => res.json());
    return  ProfileFactory.buildProfileFromApi(result);
  }
}
