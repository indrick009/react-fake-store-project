import { Cart as CartModel } from "../../models/Cart";
import AppButton from "../../../../shared/components/AppButton";

export default function Cart({
  cart,
  onCartClick,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: {
  cart: CartModel | null;
  onCartClick: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 h-screen"
        onClick={onCartClick}
      />

      <aside className="fixed right-0 top-0 h-screen w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col border-l border-stone-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900">Mon Panier</h2>
          <button
            onClick={onCartClick}
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

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {(cart?.products?.length ?? 0) === 0 ? (
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
            (cart?.products ?? []).map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-14 h-14 object-contain bg-white rounded-lg p-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-stone-700 line-clamp-2 font-medium">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold text-stone-900 mt-1">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-6 h-6 rounded-full bg-white border border-stone-200 text-stone-700 text-sm flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-body text-sm font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-6 h-6 rounded-full bg-white border border-stone-200 text-stone-700 text-sm flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-auto"
                    >
                      <img
                        src="./img/delete.svg"
                        alt="Supprimer le panier"
                        className="h-[25px] w-[25px]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {(cart?.products?.length ?? 0) > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-body text-stone-500">Total</span>
              <span className="text-2xl font-bold text-stone-900">
                ${cart?.total.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AppButton onClick={onCheckout} fullWidth>
                Poursuivre la commande
              </AppButton>
              <div className="">
                <button onClick={onClearCart}>
                  <img
                    src="./img/delete.svg"
                    alt="Supprimer le panier"
                    className="h-[40px] w-[30px]"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
