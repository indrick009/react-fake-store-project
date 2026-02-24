import { Product } from "../types";
import ProductCard from "./../components/ProductCard";
import { useNavigate } from "react-router-dom";

import { useProducts, useCategories } from "./../hooks/useApi";

interface HomeProductProps {
  handleAddToCart: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function HomeProduct(props: HomeProductProps) {
  const { selectedCategory, setSelectedCategory, handleAddToCart } = props;
  const navigate = useNavigate();
  // Appels API
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useProducts(selectedCategory || undefined);
  const { categories, loading: loadingCats } = useCategories();

  
  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-900 text-white py-16 px-4 text-center">
        <p className="text-amber-400 font-body font-medium text-sm tracking-widest uppercase mb-3">
          Bienvenue sur
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          FakeStore Boutique
        </h1>
      </section>

      {/* Filtres catégories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors cursor-pointer ${
              selectedCategory === ""
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
            }`}
          >
            Tous
          </button>
          {!loadingCats &&
            categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium capitalize transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-stone-900 text-white"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                }`}
              >
                {cat}
              </button>
            ))}
        </div>
      </section>

      {/* Grille de produits */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* État de chargement */}
        {loadingProducts && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="bg-stone-200 h-52" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-4 bg-stone-200 rounded w-1/2" />
                  <div className="h-8 bg-stone-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Erreur */}
        {errorProducts && (
          <div className="text-center py-16">
            <p className="text-red-500 font-body">{errorProducts}</p>
          </div>
        )}

        {/* Produits */}
        {!loadingProducts && !errorProducts && (
          <>
            <p className="text-stone-400 font-body text-sm mb-5">
              {products.length} produit{products.length > 1 ? "s" : ""} trouvé
              {products.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
