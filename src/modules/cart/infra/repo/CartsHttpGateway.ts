import { HttpClient } from "../../../../shared/gateway/HttpClient";
import { CartsGateway } from "../../models/gateway/CartsGateway";
import { GetAllCartCommand } from "../../use-case/get-all-cart/GetAllCartCommand";
import { GetAllCartsResponse } from "../../use-case/get-all-cart/GetAllCartResponse";
import CartsFactory from "../factory/CartProductFactory";
import { cartsRoutes } from "./ApiRoutes";

export class CartsHttpGateway implements CartsGateway {
  constructor(private httpProvider: HttpClient) {}
  async getAllCarts(command: GetAllCartCommand): Promise<GetAllCartsResponse> {
    const result = await this.httpProvider
      .get(cartsRoutes.getAllCartProduct(command))
      .then((res) => res.json());
    return CartsFactory.buildCartResponseFromApi(result);
  }
}
