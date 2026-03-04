import { GetAllProductsCommand } from "../../use-case/get-all-products/GetALLProductCommand";
import { GetSingleProductCommand } from "../../use-case/get-product-details/GetSingleProductCommand";

export const productsRoutes = {
  getAllProducts: (command: GetAllProductsCommand) =>
    command.category
      ? `/products/category/${encodeURIComponent(command.category)}?limit=${command.limit}&skip=${(command.page - 1) * command.limit}`
      : `/products${command.search ? `/search?q=${command.search}&` : `?`}limit=${command.limit}&skip=${(command.page - 1) * command.limit}`,
  getDetailsProduct: (command: GetSingleProductCommand) =>
    `/products/${command.id}`,
  getProductCategories: () => `/products/categories`,
};
