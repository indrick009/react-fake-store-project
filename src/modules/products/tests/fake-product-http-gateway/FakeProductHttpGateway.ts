import {ProductGateway} from "../../models/products/gateway/ProductGateway.ts";
import {GetAllProductsCommand} from "../../use-case/get-all-products/GetALLProductCommand.ts";
import {GetAllProductsResponse} from "../../use-case/get-all-products/GetAllProductsResponse.ts";
import {GetProductCategoriesResponse} from "../../use-case/get-products-categories/GetProductsCategoriesResponse.ts";
import {GetSingleProductCommand} from "../../use-case/get-product-details/GetSingleProductCommand.ts";
import {GetSigleProductResponse} from "../../use-case/get-product-details/GetSigleProductResponse.ts";
import {Product} from "../../models/products/productEntity.ts";
import {CategoryEntity} from "../../models/categories/CategoryEntity.ts";


export class FakeProductHttpGateway implements ProductGateway {

  private fakeProducts: Product[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {rate: 3.9, count: 120},
      ratingList: [
        {
          rating: 4,
          comment: "Great backpack, very durable!",
          date: "2024-01-15",
          reviewerName: "John Doe",
          reviewerEmail: "john@example.com"
        },
        {
          rating: 3,
          comment: "Good quality but a bit small",
          date: "2024-01-20",
          reviewerName: "Jane Smith",
          reviewerEmail: "jane@example.com"
        }
      ]
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable comfort",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX_.UX_.jpg",
      rating: {rate: 4.7, count: 500},
      ratingList: [
        {
          rating: 5,
          comment: "Perfect fit and great quality!",
          date: "2024-02-01",
          reviewerName: "Mike Johnson",
          reviewerEmail: "mike@example.com"
        }
      ]
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {rate: 4.5, count: 300},
      ratingList: [
        {
          rating: 4,
          comment: "Very warm and comfortable",
          date: "2024-02-10",
          reviewerName: "Tom Wilson",
          reviewerEmail: "tom@example.com"
        }
      ]
    }
  ];

  private fakeCategories: CategoryEntity[] = [
    {
      slug: "mens-clothing",
      name: "Men's Clothing",
      url: "/category/mens-clothing"
    },
    {
      slug: "womens-clothing",
      name: "Women's Clothing",
      url: "/category/womens-clothing"
    },
    {
      slug: "electronics",
      name: "Electronics",
      url: "/category/electronics"
    }
  ];


  getAllProducts(command: GetAllProductsCommand): Promise<GetAllProductsResponse> {

    console.log(command)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({products: this.fakeProducts});
      }, 100);
    });
  }

  getProductCategories(): Promise<GetProductCategoriesResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({categories: this.fakeCategories});
      }, 50);
    });
  }

  getProductDetails(command: GetSingleProductCommand): Promise<GetSigleProductResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = this.fakeProducts.find(p => p.id === command.id);
        resolve({product: product || this.fakeProducts[0]});
      }, 150);
    });
  }


}