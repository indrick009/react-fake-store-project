import { AuthGateway } from "../modules/auth/models/gateway/AuthGateway";
import { OrderGateway } from "../modules/order/models/gateway/OrderGateway";
import type { ProductGateway } from "../modules/products/models/products/gateway/ProductGateway";
import { ProfileGateway } from "../modules/profile/models/gateway/ProfileGateway";

export interface Dependencies {
  productsGateway: ProductGateway;
  authGateway: AuthGateway;
  profileGateway: ProfileGateway;
  orderGateway: OrderGateway;
}
