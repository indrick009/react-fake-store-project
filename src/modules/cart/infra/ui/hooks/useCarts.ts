import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { CartsSelector } from "../../../slice/CartSelector";
import { GetAllCartsAsync } from "../../../use-case/get-all-cart/GetAllCartAsync";
import { useAuth } from "../../../../auth/infra/ui/hooks/useAuth";

export const useCarts = () => {
  const dispatch = useAppDispatch();
  const allCarts = useAppSelector(CartsSelector.SelectAllCarts);
  const loadingCarts = useAppSelector(CartsSelector.getLoadingState);
  const error = useAppSelector(CartsSelector.error);
  const { isAuthenticated } = useAuth();

  //   const getProductDetails = useCallback(
  //     (id: number) => {
  //       return dispatch(GetSingleProductAsync({ id }));
  //     },
  //     [dispatch],
  //   );

  function addTocart() {
    //   return dispatch(LoginAsync(payload));
  }

  function onCartClick() {
    //   return dispatch(LoginAsync(payload));
  }

  useEffect(() => {
    if(!isAuthenticated){
      return;
    }
    dispatch(GetAllCartsAsync());
  }, []);


  return {
    allCarts,
    loadingCarts,
    error,
    addTocart,
    onCartClick
  };
};

export type UseCartsBehavoir = ReturnType<typeof useCarts>;
