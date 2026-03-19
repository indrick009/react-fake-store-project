import {ProfileGateway} from "../../profile/models/gateway/ProfileGateway.ts";
import {GetProfileResponse} from "../../profile/use-case/GetProfileResponse.ts";


export class FakeProfileHttpGateway implements ProfileGateway {


  getProfile(): Promise<GetProfileResponse> {
    return Promise.resolve({
      currentUser: {
        id: 1,
        username: "test user",
        email: "test@gmail.com",
        firstName: "test",
        lastName: "user",
        phone: "678945454",
        gender: "male",
        image: "png"
      }
    });
  }


}