import { useNavigate } from "react-router-dom";
import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import Navbar from "../../../../shared/components/Navbar";
import { useCart } from "../../../cart/infra/ui/hooks/useCarts";
import ProductCard from "./components/ProductCard";
import { useProducts } from "./hooks/useProducts";
import { FilterSection } from "./components/FilterSection";
import CategoriesSection from "./components/CategoriesSection";
import { SearchSection } from "./components/SearchSection";

export default function HomeProductsView() {
  const { allProducts, loadingProducts, error, searchTerm, handleSearch } =
    useProducts();
  const { addTocart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      <section className="h-[320px] md:h-[520px] relative bg-[url('https://media.istockphoto.com/id/2155795543/photo/a-back-view-of-a-woman-holding-shopping-bags-in-front-of-a-store-window.jpg?s=2048x2048&w=is&k=20&c=WIkI5826AKsZ0Q7Ggc-KB5AiWzAGLcjdyEoNIgOZkyM=')] bg-cover bg-center text-white py-16 px-4 text-center">
        <div className="w-full h-full top-0 left-0 right-0 bottom-0 absolute bg-stone-900/70" />
        <div className="w-full h-full top-0 left-0 right-0 bottom-0 absolute flex flex-col items-center justify-evenly px-6">
          <div>
            <p className="text-primary-300 font-body font-medium text-sm tracking-widest uppercase mb-3">
              Bienvenue sur
            </p>
            <div className="flex text-3xl sm:text-5xl font-bold mb-6 gap-3">
              <div>
                <span className="text-primary-500">Clean</span>
                <span className="text-white">Shop</span>
              </div>
              Boutique
            </div>
          </div>

          <div className="w-full max-w-md md:hidden">
            <SearchSection searchTerm={searchTerm} handleSearch={handleSearch} />
          </div>
        </div>
      </section>

      <main className="w-full mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="flex gap-4">
          <FilterSection />

          <section className="flex-1 min-w-0">
            <div className=" md:hidden mb-4">
              <CategoriesSection />
            </div>

            {/* Loading */}
            {loadingProducts === LoadingState.pending && (
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[calc(50%-8px)] md:w-[220px] bg-white rounded-2xl overflow-hidden animate-pulse"
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

            {/* Error */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 font-body">{error}</p>
              </div>
            )}

            {/* Products */}
            {!(loadingProducts === LoadingState.pending) && !error && (
              <>
                <p className="text-stone-400 font-body text-sm mb-5">
                  {allProducts.length} produit
                  {allProducts.length > 1 ? "s" : ""} trouvé
                  {allProducts.length > 1 ? "s" : ""}
                </p>
                <div className="flex flex-wrap gap-4">
                  {allProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loadingAddToCart={false}
                      onAddToCart={() => addTocart(product)}
                      className="w-[calc(50%-8px)] md:w-[220px]"
                      onViewDetails={(id) => navigate(`/product/${id}`)}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
