import { Cart } from "../../models/Cart";
import { GetAllCartsResponse } from "../../use-case/get-all-cart/GetAllCartResponse";

export default class CartsFactory {
  static buildCartResponseFromApi(data: any): GetAllCartsResponse {
    return {
      carts: Array.from(data).map(
        ({ ...cart }: any): Cart => ({
          ...cart,
        }),
      ),
    };
  }
}
