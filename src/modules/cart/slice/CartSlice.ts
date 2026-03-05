import { createSlice } from "@reduxjs/toolkit";
import { Cart, CartProduct } from "../models/Cart";
import { Product } from "../../products/models/products/productEntity";

type CartState = {
  cart: Cart | null;
  isOpen: boolean;
};

const initialCartState: CartState = {
  cart: {
    id: 1,
    userId: 0,
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
    products: [],
  },
  isOpen: false,
};

const recalculateCart = (cart: Cart) => {
  cart.totalProducts = cart.products.length;
  cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
  cart.total = Number(
    cart.products.reduce((sum, item) => sum + item.total, 0).toFixed(2),
  );
  cart.discountedTotal = Number(
    cart.products.reduce((sum, item) => sum + item.discountedTotal, 0).toFixed(2),
  );
};

export const CartSlice = createSlice({
  name: "cart-slice",
  initialState: initialCartState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    addToCart(state, action: { payload: { userId?: number; product: Product } }) {
      if (!state.cart) return;
      const { userId, product } = action.payload;
      state.cart.userId = userId ?? state.cart.userId ?? 0;

      const existing = state.cart.products.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
        existing.total = Number((existing.price * existing.quantity).toFixed(2));
        existing.discountedTotal = Number(
          (
            existing.total -
            (existing.total * existing.discountPercentage) / 100
          ).toFixed(2),
        );
      } else {
        const nextProduct: CartProduct = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          total: Number(product.price.toFixed(2)),
          discountPercentage: 0,
          discountedTotal: Number(product.price.toFixed(2)),
          thumbnail: product.image,
        };
        state.cart.products.push(nextProduct);
      }

      recalculateCart(state.cart);
    },
    updateCartQuantity(
      state,
      action: { payload: { productId: number; quantity: number } },
    ) {
      if (!state.cart) return;
      const item = state.cart.products.find(
        (product) => product.id === action.payload.productId,
      );
      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.cart.products = state.cart.products.filter(
          (product) => product.id !== action.payload.productId,
        );
      } else {
        item.quantity = action.payload.quantity;
        item.total = Number((item.price * item.quantity).toFixed(2));
        item.discountedTotal = Number(
          (item.total - (item.total * item.discountPercentage) / 100).toFixed(2),
        );
      }

      recalculateCart(state.cart);
    },
    removeFromCart(state, action: { payload: { productId: number } }) {
      if (!state.cart) return;
      state.cart.products = state.cart.products.filter(
        (product) => product.id !== action.payload.productId,
      );
      recalculateCart(state.cart);
    },
    clearCart(state) {
      if (!state.cart) return;
      state.cart.products = [];
      recalculateCart(state.cart);
    },
  },
  extraReducers: () => {},
});

export const {
  toggleCart,
  closeCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = CartSlice.actions;
