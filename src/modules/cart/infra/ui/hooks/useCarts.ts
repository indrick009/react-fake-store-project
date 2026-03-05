import { useAppDispatch, useAppSelector } from "../../../../../config/hooks";
import { ProfileSelectors } from "../../../../profile/slice/ProfileSelector";
import {
  addToCart,
  clearCart,
  closeCart,
  removeFromCart,
  toggleCart,
  updateCartQuantity,
} from "../../../slice/CartSlice";
import { Product } from "../../../../products/models/products/productEntity";
import { CartsSelector } from "../../../slice/CartSelector";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(CartsSelector.cart);
  const isCartOpen = useAppSelector(CartsSelector.isOpen);
  const totalQuantity = useAppSelector(CartsSelector.totalQuantity);
  const currentUser = useAppSelector(ProfileSelectors.currentUser);

  function addTocart(product: Product) {
    dispatch(addToCart({ userId: currentUser?.id, product }));
  }

  function onCartClick() {
    dispatch(toggleCart());
  }

  function onCloseCart() {
    dispatch(closeCart());
  }

  function onUpdateQuantity(productId: number, quantity: number) {
    dispatch(updateCartQuantity({ productId, quantity }));
  }

  function onRemoveItem(productId: number) {
    dispatch(removeFromCart({ productId }));
  }

  function onClearCart() {
    dispatch(clearCart());
  }

  return {
    cart,
    totalQuantity,
    isCartOpen,
    onCartClick,
    onCloseCart,
    addTocart,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
  };
};

export type UseCartsBehavoir = ReturnType<typeof useCart>;
