interface CartIconProps {
  totalQuantity: number;
  onCartClick: () => void;
}

export default function CartIcon({ totalQuantity, onCartClick }: CartIconProps) {
  return (
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
  );
}