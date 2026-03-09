import type { Cart } from "../../../../cart/models/Cart";
import type { Order } from "../../../models/Order";

interface GiftOption {
  label: string;
  sublabel: string;
  checked: boolean;
  price: number;
  onChange: (next: boolean) => void;
}

interface OrderStep1Props {
  hasCartProducts: boolean;
  currentOrder: Order | null;
  cart: Cart | null;
  giftOptions: GiftOption[];
}

export default function OrderStep1({
  hasCartProducts,
  currentOrder,
  cart,
  giftOptions,
}: OrderStep1Props) {
  if (!hasCartProducts || currentOrder) return null;

  const giftTotal = giftOptions.reduce(
    (sum, g) => sum + (g.checked ? g.price : 0),
    0
  );

  const total = (cart?.total ?? 0) + giftTotal;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
          Options cadeaux
        </p>

        <div className="space-y-2">
          {giftOptions.map(({ label, sublabel, checked, onChange }) => (
            <label
              key={label}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                checked
                  ? "border-amber-300 bg-amber-50"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-amber-400 border-amber-400"
                      : "border-stone-300"
                  }`}
                >
                  {checked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <span className="text-sm text-stone-700">{label}</span>
              </div>

              <span className="text-xs text-amber-500 font-semibold">
                {sublabel}
              </span>

              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium mb-1">
          Total estimé
        </p>

        <p className="text-4xl font-bold text-stone-900 tracking-tight">
          ${total.toFixed(2)}
        </p>

        <p className="text-xs text-stone-400 mt-1">
          {cart?.products.length ?? 0} article
          {(cart?.products.length ?? 0) > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}