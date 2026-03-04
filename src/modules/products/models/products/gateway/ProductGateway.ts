import { GetAllProductsCommand } from "../../../use-case/get-all-products/GetALLProductCommand";
import type { GetAllProductsResponse } from "../../../use-case/get-all-products/GetAllProductsResponse";
import { GetSigleProductResponse } from "../../../use-case/get-product-details/GetSigleProductResponse";
import { GetSingleProductCommand } from "../../../use-case/get-product-details/GetSingleProductCommand";
import { GetProductCategoriesResponse } from "../../../use-case/get-products-categories/GetProductsCategoriesResponse";

export interface ProductGateway {
  getProductCategories(): Promise<GetProductCategoriesResponse>;
  getAllProducts(
    command: GetAllProductsCommand,
  ): Promise<GetAllProductsResponse>;
  getProductDetails(
    command: GetSingleProductCommand,
  ): Promise<GetSigleProductResponse>;
}
