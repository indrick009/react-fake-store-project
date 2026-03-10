import { useNavigate } from "react-router-dom";
import { ProductRoutes } from "../../routes/routes";
import { useAuth } from "../../modules/auth/infra/ui/hooks/useAuth";
import { useCart } from "../../modules/cart/infra/ui/hooks/useCarts";
import UserAvatar from "./UserAvatar";
import Cart from "../../modules/cart/infra/ui/Cart";
import Profile from "../../modules/profile/infra/ui/Profile";
import { useProfile } from "../../modules/profile/infra/ui/hooks/useProfile";
import Order from "../../modules/order/infra/ui/Order";
import { useOrder } from "../../modules/order/infra/ui/hooks/useOrder";
import PrimaryButton from "./PrimaryButton";
import { useEffect } from "react";
import CartIcon from "../../modules/products/infra/ui/components/CartIcon";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isProfileOpen, onCloseProfile, onProfileClick } = useProfile();
  const { isOrderOpen, onOrderClick, onCloseOrder } = useOrder();
  const {
    cart,
    totalQuantity,
    isCartOpen,
    onCartClick,
    onCloseCart,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
  } = useCart();

  const handleCheckoutClick = () => {
    onCloseCart();
    onOrderClick();
  };

  useEffect(() => {
    const shouldLock = isCartOpen || isProfileOpen || isOrderOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen, isProfileOpen, isOrderOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/img/store.svg" alt="" className="w-[30px] h-[30px]" />
          <div>
            <span className="text-xl font-bold text-primary-500">Clean</span>
            <span className="text-xl font-bold text-stone-900">Shop</span>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Bouton panier */}
          {isAuthenticated && (
            <CartIcon onCartClick={onCartClick} totalQuantity={totalQuantity} />
          )}
          {isAuthenticated && (
            <button onClick={onProfileClick}>
              {" "}
              <UserAvatar />
            </button>
          )}
          {!isAuthenticated && (
            <PrimaryButton
              onClick={() => navigate(ProductRoutes.login)}
              variant="dark"
              className="px-4 py-2"
            >
              Login
            </PrimaryButton>
          )}
        </div>
      </div>
      {isAuthenticated && isCartOpen && (
        <Cart
          cart={cart}
          onCartClick={onCloseCart}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          onCheckout={handleCheckoutClick}
        />
      )}
      {isAuthenticated && isOrderOpen && (
        <Order
          cart={cart}
          onOrderClick={onCloseOrder}
          onClearCart={onClearCart}
        />
      )}
      {isAuthenticated && isProfileOpen && (
        <Profile onCartClick={onCloseProfile} />
      )}
    </header>
  );
}
