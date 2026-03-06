import { GetProfileResponse } from "../../use-case/GetProfileResponse";

export default class ProfileFactory {
  static buildProfileFromApi(data: any): GetProfileResponse {
    return {
      currentUser: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
        phone:data.phone
      },
    };
  }
}