import ProductCard from "./components/ProductCard";
import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import { useProducts } from "./hooks/useProducts";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../shared/components/Navbar";
import { useCategories } from "./hooks/useCategories";
import { useEffect } from "react";

export default function HomeProductsView() {
  const {
    allProducts,
    loadingProducts,
    error,
    selectedCategory,
    handleSearch,
    setCategories
  } = useProducts();
  const { categories, catLoading, catError, getProductCategoriesDetails } =
    useCategories();
  const safeCategories = Array.isArray(categories) ? categories : [];
  const navigate = useNavigate();

  useEffect(() => {
    getProductCategoriesDetails();
  }, [getProductCategoriesDetails]);

  return (
    <div className="min-h-screen bg-stone-50 font-body">
      <Navbar />
      {/* Hero */}
      <section className="h-[320px] relative bg-[url('https://media.istockphoto.com/id/2155795543/photo/a-back-view-of-a-woman-holding-shopping-bags-in-front-of-a-store-window.jpg?s=2048x2048&w=is&k=20&c=WIkI5826AKsZ0Q7Ggc-KB5AiWzAGLcjdyEoNIgOZkyM=')] bg-cover bg-center  text-white py-16 px-4 text-center">
        <div className="w-full h-full top-0 left-0 right-0 bottom-0 absolute bg-stone-900/50"></div>
        <div className="w-full h-full top-0 left-0 right-0 bottom-0 absolute flex flex-col items-center justify-center">
          <p className="text-amber-400 font-body font-medium text-sm tracking-widest uppercase mb-3">
            Bienvenue sur
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Cleanshop Boutique
          </h1>
        </div>
      </section>

      {/* Filtres catégories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setCategories("")}
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
              selectedCategory === ""
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
            }`}
          >
            Tous
          </button>

          {catLoading === LoadingState.pending && (
            <p className="text-stone-500 text-sm font-body self-center whitespace-nowrap">
              Chargement...
            </p>
          )}

          {catError && (
            <p className="text-red-500 text-sm font-body self-center whitespace-nowrap">
              {catError}
            </p>
          )}

          {catLoading !== LoadingState.pending &&
            safeCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategories(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium capitalize transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === cat.slug
                    ? "bg-stone-900 text-white"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </section>

      {/* Grille de produits */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* État de chargement */}
        {loadingProducts === LoadingState.pending && (
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
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 font-body">{error}</p>
          </div>
        )}

        {/* Produits */}
        {!(loadingProducts === LoadingState.pending) && !error && (
          <>
            <p className="text-stone-400 font-body text-sm mb-5">
              {allProducts.length} produit{allProducts.length > 1 ? "s" : ""}{" "}
              trouvé
              {allProducts.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => {
                    // dispatch(addToCart({ ...product, quantity: 1 }))
                  }}
                  onViewDetails={(id) => {
                    navigate(`/product/${id}`);
                  }}
                />
              ))}
            </div>
          </>
        )}
        {/* {cartOpen && <Cart onClose={() => setCartOpen(false)} />} */}
      </main>
    </div>
  );
}
