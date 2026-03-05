import { combineReducers } from "@reduxjs/toolkit";
import { ProductSlice } from "../modules/products/slice/products/ProductsSlice";
import { LoginSlice } from "../modules/auth/slices/AuthSlice";
import { CartSlice } from "../modules/cart/slice/CartSlice";
import { ProfileSlice } from "../modules/profile/slice/ProfileSlice";
import { CategoriesSlice } from "../modules/products/slice/categories/CategoriesSlice";

export const rootReducer = combineReducers({
  productReducer: ProductSlice.reducer,
  loginReducer: LoginSlice.reducer,
  cartReducer: CartSlice.reducer,
  addToCartReducer: CartSlice.reducer,
  profileReducer: ProfileSlice.reducer,
  categoriesReducer: CategoriesSlice.reducer,
});
