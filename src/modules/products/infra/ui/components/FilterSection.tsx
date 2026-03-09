import { useEffect } from "react";
import { LoadingState } from "../../../../../shared/domain/enums/LoadingState";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { SearchSection } from "./SearchSection";

export function FilterSection() {
  const {
    selectedCategory,
    setCategories,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
  } = useProducts();
  const { categories, catLoading, catError, getProductCategoriesDetails } =
    useCategories();

  useEffect(() => {
    getProductCategoriesDetails();
  }, [getProductCategoriesDetails]);

  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <aside className="hidden md:block md:sticky md:top-[88px] md:self-start bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200 p-5 shadow-sm">
      <div className="text-lg font-bold text-stone-900 mb-5">Explorer</div>

      <div className="space-y-5">
        <SearchSection />

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400 font-body mb-2">
            Pagination
          </p>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
            <div className="mb-3">
              <label className="text-xs text-stone-500 font-body">
                Par page
              </label>
              <div className="relative mt-1">
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="w-full appearance-none rounded-full border border-stone-200 bg-white px-4 py-2 pr-10 text-sm font-body text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 rounded-full border border-stone-200 bg-white text-xs font-body text-stone-600 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Precedent
              </button>
              <span className="text-xs font-body text-stone-500">
                Page {page}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1.5 rounded-full border border-stone-200 bg-white text-xs font-body text-stone-600 hover:bg-stone-100"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400 font-body mb-2">
            Filtres
          </p>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 space-y-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400 font-body mb-2">
                Categorie
              </p>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setCategories(e.target.value)}
                  className="w-full appearance-none rounded-full border border-stone-200 bg-white px-4 py-2 pr-10 text-sm font-body text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value="">Toutes les categories</option>
                  {safeCategories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {catLoading === LoadingState.pending && (
                <p className="text-xs text-stone-500 mt-2">Chargement...</p>
              )}
              {catError && (
                <p className="text-xs text-red-500 mt-2">{catError}</p>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm font-body text-stone-600">
              <input type="checkbox" className="rounded border-stone-300" />
              Promo uniquement
            </label>
            <label className="flex items-center gap-2 text-sm font-body text-stone-600">
              <input type="checkbox" className="rounded border-stone-300" />
              Note 4+
            </label>
            <label className="flex items-center gap-2 text-sm font-body text-stone-600">
              <input type="checkbox" className="rounded border-stone-300" />
              Livraison rapide
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
