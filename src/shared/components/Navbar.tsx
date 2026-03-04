import { useNavigate } from "react-router-dom";
import { ProductRoutes } from "../../routes/routes";
import { useAuth } from "../../modules/auth/infra/ui/hooks/useAuth";
import { useCarts } from "../../modules/cart/infra/ui/hooks/useCarts";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { allCarts, onCartClick } = useCarts();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-stone-900">
            CleanShop
          </span>
        </div>
        <div className="flex space-x-4">
          {/* Bouton panier */}
          {isAuthenticated && (
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-stone-900 text-white p-2 rounded-xl hover:bg-amber-500 transition-colors duration-200 font-body font-medium text-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              {allCarts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {allCarts.length}
                </span>
              )}
            </button>
          )}
          {isAuthenticated && <UserAvatar />}
          {!isAuthenticated && (
            <button
              onClick={() => navigate(ProductRoutes.login)}
              className="relative flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition-colors duration-200 font-body font-medium text-sm cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
