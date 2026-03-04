import type { HttpClient } from "../../../../shared/gateway/HttpClient";
import type { ProductGateway } from "../../models/products/gateway/ProductGateway";
import { GetAllProductsCommand } from "../../use-case/get-all-products/GetALLProductCommand";
import type { GetAllProductsResponse } from "../../use-case/get-all-products/GetAllProductsResponse";
import { GetSigleProductResponse } from "../../use-case/get-product-details/GetSigleProductResponse";
import { GetSingleProductCommand } from "../../use-case/get-product-details/GetSingleProductCommand";
import { GetProductCategoriesResponse } from "../../use-case/get-products-categories/GetProductsCategoriesResponse";
import ProductFactory from "../factories/ProductFactory";
import { productsRoutes } from "./routes";

export class ProductHttpGateway implements ProductGateway {
  constructor(private httpProvider: HttpClient) {}
  async getProductCategories(): Promise<GetProductCategoriesResponse> {
    const result = await this.httpProvider
      .get(productsRoutes.getProductCategories(), { includeCred: false })
      .then((res) => res.json());

    return ProductFactory.buildProductCategoriesResponseFromApi(result);
  }

  async getAllProducts(
    command: GetAllProductsCommand,
  ): Promise<GetAllProductsResponse> {
    const result = await this.httpProvider
      .get(productsRoutes.getAllProducts(command), { includeCred: false })
      .then((res) => res.json());
    return ProductFactory.buildProductsResponseFromApi(result);
  }

  async getProductDetails(
    command: GetSingleProductCommand,
  ): Promise<GetSigleProductResponse> {
    const result = await this.httpProvider
      .get(productsRoutes.getDetailsProduct(command))
      .then((res) => res.json());
      console.log("==========productdetails",result)
    return ProductFactory.buildProductFromApi(result);
  }
}
