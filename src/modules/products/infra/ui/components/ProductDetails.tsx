import { useParams, useNavigate } from "react-router-dom";
import { LoadingState } from "../../../../../shared/domain/enums/LoadingState";
import { useEffect } from "react";
import { useProductsDetails } from "../hooks/useProductsDetails";
import { useCart } from "../../../../cart/infra/ui/hooks/useCarts";
import { useAuth } from "../../../../auth/infra/ui/hooks/useAuth";
import { ProductRoutes } from "../../../../../routes/routes";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;
  const {
    selectedProduct,
    loadingProductDetails,
    errorProductDetails,
    getProductDetails,
  } = useProductsDetails();

  const { isAuthenticated } = useAuth();

  const { addTocart } = useCart();

  const navigate = useNavigate();
  const stars = selectedProduct ? Math.round(selectedProduct.rating.rate) : 0;

  useEffect(() => {
    if (!productId || Number.isNaN(productId)) return;
    getProductDetails(productId);
  }, [getProductDetails, productId]);

  if (loadingProductDetails === LoadingState.pending) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
        <div className="h-5 w-24 bg-stone-200 rounded mb-10" />
        <div className="flex flex-col md:flex-row gap-12">
          <div className="bg-stone-100 rounded-3xl h-80 w-full md:w-96 flex-shrink-0" />
          <div className="flex-1 space-y-4 pt-4">
            <div className="h-4 bg-stone-200 rounded w-24" />
            <div className="h-8 bg-stone-200 rounded w-3/4" />
            <div className="h-4 bg-stone-200 rounded w-32" />
            <div className="h-24 bg-stone-200 rounded" />
            <div className="h-10 bg-stone-200 rounded w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (errorProductDetails || !selectedProduct) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <p className="text-red-400 font-body mb-6">
          {errorProductDetails ?? "Produit introuvable."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-stone-900 text-white px-6 py-3 rounded-xl font-body font-medium hover:bg-amber-500 transition-colors cursor-pointer"
        >
          ← Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-20">
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-400 hover:text-stone-700 font-body text-sm mb-10 transition-colors cursor-pointer group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour
      </button>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Image */}
        <div className="w-full md:w-96 flex-shrink-0">
          <div className="bg-stone-50 rounded-3xl p-10 flex items-center justify-center h-80 border border-stone-100">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="h-60 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Infos */}
        <div className="flex-1">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-body font-medium px-3 py-1 rounded-full capitalize mb-4">
            {selectedProduct.category}
          </span>

          <div className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mb-4">
            {selectedProduct.title}
          </div>

          {/* Note */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < stars ? "text-amber-400" : "text-stone-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-stone-500 font-body text-sm">
              {parseFloat(selectedProduct.rating.rate.toString()).toFixed(1)} /
              5<span className="text-stone-300 mx-2">·</span>
              {selectedProduct.rating.count} avis
            </span>
          </div>

          <p className="font-body text-stone-500 text-sm leading-relaxed mb-8">
            {selectedProduct.description}
          </p>

          <div className="border-t border-stone-100 mb-8" />


          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-stone-900">
              ${selectedProduct.price.toFixed(2)}
            </span>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  addTocart(selectedProduct);
                } else {
                  navigate(ProductRoutes.login);
                }
              }}
              className="flex items-center gap-2 bg-primary-500 text-white font-body font-medium px-6 py-3 rounded-full hover:bg-primary-700 transition-colors duration-200 cursor-pointer text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
