import { GetProfileResponse } from "../../use-case/GetProfileResponse";

export interface ProfileGateway{
    getProfile():Promise<GetProfileResponse>
}