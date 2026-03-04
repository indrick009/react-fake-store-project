import { CategoryEntity } from "../../models/categories/CategoryEntity";
import { Product, ProductReview } from "../../models/products/productEntity";
import { GetAllProductsResponse } from "../../use-case/get-all-products/GetAllProductsResponse";
import { GetSigleProductResponse } from "../../use-case/get-product-details/GetSigleProductResponse";
import { GetProductCategoriesResponse } from "../../use-case/get-products-categories/GetProductsCategoriesResponse";

export default class ProductFactory {
  private static buildProductFromApiData(data: any): Product {
    const ratingList: ProductReview[] = Array.isArray(data?.reviews)
      ? data.reviews.map((review: any) => ({
          rating: Number(review?.rating ?? 0),
          comment: String(review?.comment ?? ""),
          date: String(review?.date ?? ""),
          reviewerName: String(review?.reviewerName ?? ""),
          reviewerEmail: String(review?.reviewerEmail ?? ""),
        }))
      : [];

    const ratingFromList =
      ratingList.length > 0
        ? ratingList.reduce((sum, review) => sum + review.rating, 0) /
          ratingList.length
        : Number(data?.rating ?? 0);

    return {
      id: Number(data?.id ?? 0),
      title: String(data?.title ?? ""),
      price: Number(data?.price ?? 0),
      description: String(data?.description ?? ""),
      category: String(data?.category ?? ""),
      image: String(data?.thumbnail ?? data?.image ?? ""),
      rating: {
        rate: ratingFromList,
        count: ratingList.length,
      },
      ratingList,
    };
  }

  static buildProductsResponseFromApi(data: any): GetAllProductsResponse {
    return {
      products: Array.from(data?.products ?? []).map(
        (product: any): Product => this.buildProductFromApiData(product),
      ),
    };
  }

  static buildProductCategoriesResponseFromApi(
    data: any,
  ): GetProductCategoriesResponse {
    return {
      categories: Array.from(data ?? []).map(
        (categories: any): CategoryEntity =>
          this.buildProductCategoriesFromApiData(categories),
      ),
    };
  }

  static buildProductFromApi(data: any): GetSigleProductResponse {
    return {
      product: this.buildProductFromApiData(data),
    };
  }

  private static buildProductCategoriesFromApiData(data: any): CategoryEntity {
    return {
      slug: data.slug,
      name: data.name,
      url: data.url,
    };
  }
}
