
export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  userId: number;
  total: number;         
  discountedTotal: number;
  totalProducts: number; 
  totalQuantity: number; 
  products: CartProduct[];
}

export interface GetAllCartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}
