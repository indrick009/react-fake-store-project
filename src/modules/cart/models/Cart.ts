import { createEntityAdapter } from "@reduxjs/toolkit";
import { Product } from "../../products/models/products/productEntity";

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: number;
  date: string;
  products: CartProduct[];
}

export const CartEntityAdapter=createEntityAdapter<Cart>()