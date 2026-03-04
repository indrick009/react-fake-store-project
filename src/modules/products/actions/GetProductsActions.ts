import { createAction } from "@reduxjs/toolkit";
import { GetAllProductsCommand } from "../use-case/get-all-products/GetALLProductCommand";

export const ProductsActions =
  createAction<GetAllProductsCommand>("productsActionCall");
