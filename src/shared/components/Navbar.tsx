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
import AppButton from "./AppButton";

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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="./img/store.svg" alt="" className="w-[30px] h-[30px]"/>
          <div>
            <span className="text-xl font-bold text-primary-500">Clean</span>
            <span className="text-xl font-bold text-stone-900">Shop</span>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Bouton panier */}
          {isAuthenticated && (
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-stone-900 text-white p-2 rounded-xl hover:bg-stone-700 transition-colors duration-200 font-body font-medium text-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-400 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
          )}
          {isAuthenticated && (
            <button onClick={onProfileClick}>
              {" "}
              <UserAvatar />
            </button>
          )}
          {!isAuthenticated && (
            <AppButton
              onClick={() => navigate(ProductRoutes.login)}
              variant="dark"
              className="px-4 py-2"
            >
              Login
            </AppButton>
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
