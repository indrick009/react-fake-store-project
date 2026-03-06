import { useEffect } from "react";
import { LoadingState } from "../../../../../shared/domain/enums/LoadingState";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

export default function CategoriesSection() {
  const { selectedCategory, setCategories } = useProducts();

  const { categories, catLoading, catError, getProductCategoriesDetails } =
    useCategories();

  const safeCategories = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    getProductCategoriesDetails();
  }, [getProductCategoriesDetails]);

  return (
    <section className="w-full pb-6">
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
              className={`px-4 py-2 rounded-full text-sm font-body font-medium capitalize  transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
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
  );
}
