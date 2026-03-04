import { GetAllCartCommand } from "../../use-case/get-all-cart/GetAllCartCommand";
import { GetAllCartsResponse } from "../../use-case/get-all-cart/GetAllCartResponse";

export interface CartsGateway {
    getAllCarts(command:GetAllCartCommand): Promise<GetAllCartsResponse>;
}