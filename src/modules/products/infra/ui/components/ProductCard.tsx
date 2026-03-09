import { twMerge } from "tailwind-merge";
import { Product } from "../../../models/products/productEntity";
import { useAuth } from "../../../../auth/infra/ui/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ProductRoutes } from "../../../../../routes/routes";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails?: (id: number) => void;
  loadingAddToCart: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  loadingAddToCart,
  className,
}: ProductCardProps) {
  const stars = Math.round(product.rating.rate);
  const { isAuthenticated } = useAuth();

   const navigate = useNavigate();

  return (
    <div
      onClick={() => onViewDetails?.(product.id)}
      className={twMerge(
        "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-stone-100 cursor-pointer",
        className,
      )}
    >
      <div className="relative bg-stone-50 p-6 flex items-center justify-center h-32 md:h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-30 md:h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
        />

        <span className="absolute top-3 left-3 text-xs font-body font-medium bg-black/50 text-white px-2 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-body font-medium text-stone-800 text-sm leading-snug line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < stars ? "text-amber-400" : "text-stone-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-400 font-body">
            ({product.rating.count})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
          <span className="text-[12px] md:text-xl font-bold text-stone-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={loadingAddToCart}
            className="md:hidden"
          >
            {loadingAddToCart ? (
              <div></div>
            ) : (
              <img src="/img/addcart.svg" className="h-[25px]" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isAuthenticated) {
                onAddToCart(product);
              } else {
                navigate(ProductRoutes.login);
              }
            }}
            disabled={loadingAddToCart}
            className="hidden md:block bg-primary-500 text-white text-[10px]  md:text-xs font-body font-medium px-4 py-2 rounded-full hover:bg-primary-700 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAddToCart ? (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                ...
              </span>
            ) : (
              "+ Panier"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
