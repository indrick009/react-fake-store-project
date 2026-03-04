import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProductRoutes } from "./routes";
import HomeProductsView from "../modules/products/infra/ui/HomeProductsView";
import { AppStore } from "../config/create-store";
import { GetAllProductLoader } from "../modules/products/infra/ui/loader/GetAllProductLoader";
import ProductDetailPage from "../modules/products/infra/ui/components/ProductDetails";
import LoginPage from "../modules/auth/infra/ui/LoginPage";
export const createRouter = ({ store }: { store: AppStore }) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={ProductRoutes.list} replace={true} />,
    },
    {
      path: ProductRoutes.list,
      element: <HomeProductsView />,
      loader: GetAllProductLoader(store),
    },
    {
      path: ProductRoutes.details,
      element: <ProductDetailPage />,
    },
    {
      path: ProductRoutes.login,
      element: <LoginPage />,
    },
  ]);
};

export type AppRouter = ReturnType<typeof createRouter>;
