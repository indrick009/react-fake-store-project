import { AuthGateway } from "../modules/auth/models/gateway/AuthGateway";
import { CartsGateway } from "../modules/cart/models/gateway/CartsGateway";
import type { ProductGateway } from "../modules/products/models/products/gateway/ProductGateway";
import { ProfileGateway } from "../modules/profile/models/gateway/ProfileGateway";

export interface Dependencies {
  productsGateway: ProductGateway;
  authGateway: AuthGateway;
  cartsGateway: CartsGateway;
  profileGateway: ProfileGateway;
}
