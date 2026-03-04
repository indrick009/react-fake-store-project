import { createEntityAdapter } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
  ratingList: ProductReview[];
}

export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
export type Category = string;

export const ProductEntityAdapter = createEntityAdapter<Product>();
