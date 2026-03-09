import { ProductSelector } from "../../../slice/products/ProductSelector";
import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { GetSingleProductAsync } from "../../../use-case/get-product-details/GetSingleProductAsync";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../../../cart/infra/ui/hooks/useCarts";
import { useAuth } from "../../../../auth/infra/ui/hooks/useAuth";
import { ProductRoutes } from "../../../../../routes/routes";

export const useProductsDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;

  const selectedProduct = useAppSelector(ProductSelector.selectedProduct);

  const loadingProductDetails = useAppSelector(
    ProductSelector.getProductDetailsLoadingState,
  );
  const errorProductDetails = useAppSelector(
    ProductSelector.productDetailsError,
  );
  const { isAuthenticated } = useAuth();
  const { addTocart } = useCart();

  const getProductDetails = useCallback(
    (id: number) => {
      return dispatch(GetSingleProductAsync({ id }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!productId || Number.isNaN(productId)) return;
    getProductDetails(productId);
  }, [getProductDetails, productId]);

  const stars = useMemo(
    () => (selectedProduct ? Math.round(selectedProduct.rating.rate) : 0),
    [selectedProduct],
  );

  const onGoBack = () => navigate(-1);
  const onGoToProducts = () => navigate("/");

  const onAddToCart = () => {
    if (!selectedProduct) return;
    if (isAuthenticated) {
      addTocart(selectedProduct);
      return;
    }
    navigate(ProductRoutes.login);
  };

  return {
    selectedProduct,
    loadingProductDetails,
    errorProductDetails,
    getProductDetails,
    stars,
    onGoBack,
    onGoToProducts,
    onAddToCart,
  };
};

export type UseProductsBehavoir = ReturnType<typeof useProductsDetails>;
