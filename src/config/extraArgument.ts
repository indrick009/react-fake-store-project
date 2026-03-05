import { AuthHttpGateway } from "../modules/auth/infra/repo/AuthHttpGateways";
import { ProductHttpGateway } from "../modules/products/infra/repo/ProductHttpGateway";
import { ProfileHttpGateway } from "../modules/profile/infra/repo/ProfileHttpGateway";
import httpClient from "../shared/http/FetchHttpClient";
import type { Dependencies } from "./dependencies";

export const extraArgument: Dependencies = {
  productsGateway: new ProductHttpGateway(httpClient),
  authGateway: new AuthHttpGateway(httpClient),
  profileGateway: new ProfileHttpGateway(httpClient),
};
