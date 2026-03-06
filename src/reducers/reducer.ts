import { ProductSlice } from "../modules/products/slice/products/ProductsSlice";
import { LoginSlice } from "../modules/auth/slices/AuthSlice";
import { CartSlice } from "../modules/cart/slice/CartSlice";
import { OrderSlice } from "../modules/order/slice/OrderSlice";
import { ProfileSlice } from "../modules/profile/slice/ProfileSlice";
import { CategoriesSlice } from "../modules/products/slice/categories/CategoriesSlice";
import { combineReducers, createAction } from "@reduxjs/toolkit";

export const resetAppStore = createAction("app/resetStore");

const appReducer = combineReducers({
  categoriesReducer: CategoriesSlice.reducer,
  productReducer: ProductSlice.reducer,
  loginReducer: LoginSlice.reducer,
  cartReducer: CartSlice.reducer,
  orderReducer: OrderSlice.reducer,
  profileReducer: ProfileSlice.reducer,
});

export const rootReducer = (state: any, action: any) => {
  if (resetAppStore.match(action)) {
    state = {
      productReducer: state?.productReducer,
      categoriesReducer: state?.categoriesReducer,
    };
  }
  return appReducer(state, action);
};
