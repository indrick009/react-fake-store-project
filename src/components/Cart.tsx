import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="font-display text-xl font-bold text-stone-900">
            Mon Panier
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Liste des articles */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-stone-400">
              <svg
                className="w-16 h-16 text-stone-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="font-body text-sm">Votre panier est vide</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain bg-white rounded-lg p-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-stone-700 line-clamp-2 font-medium">
                    {item.title}
                  </p>
                  <p className="font-display text-sm font-bold text-stone-900 mt-1">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Contrôle quantité */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          }),
                        )
                      }
                      className="w-6 h-6 rounded-full bg-white border border-stone-200 text-stone-700 text-sm flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-body text-sm font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          }),
                        )
                      }
                      className="w-6 h-6 rounded-full bg-white border border-stone-200 text-stone-700 text-sm flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-auto text-red-400 hover:text-red-600 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer total */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-body text-stone-500">Total</span>
              <span className="font-display text-2xl font-bold text-stone-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-amber-400 text-stone-900 font-body font-semibold py-3 rounded-xl hover:bg-amber-500 transition-colors cursor-pointer">
              Passer la commande
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
