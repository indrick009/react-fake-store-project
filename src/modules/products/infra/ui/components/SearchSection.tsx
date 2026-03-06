import { useProducts } from "../hooks/useProducts";

export function SearchSection() {
  const { searchTerm, handleSearch } = useProducts();
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Nom du produit..."
        className="w-full rounded-full border border-stone-200 bg-white pl-9 pr-3 py-2 text-sm font-body text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
      />
    </div>
  );
}
