import { useState } from "react";
import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import type { Cart } from "../../../cart/models/Cart";
import type { PaymentProvider } from "../../models/payment/PaymentMethod";
import { useOrder } from "./hooks/useOrder";

export default function Order({
  cart,
  onOrderClick,
  onClearCart,
}: {
  cart: Cart | null;
  onOrderClick: () => void;
  onClearCart: () => void;
}) {
  const {
    currentOrder,
    loading,
    error,
    paymentStatus,
    successMessage,
    createOrder,
    submitPayment,
    clearOrder,
  } = useOrder();

  const [christmasGift, setChristmasGift] = useState(false);
  const [valentinesGift, setValentinesGift] = useState(false);
  const [provider, setProvider] = useState<PaymentProvider>("mtn_momo");
  const [phoneNumber, setPhoneNumber] = useState("");

  const hasCartProducts = (cart?.products?.length ?? 0) > 0;
  const isCreating = loading === LoadingState.pending && !currentOrder;
  const isPaying = loading === LoadingState.pending && !!currentOrder;

  const handleCreateOrder = () => {
    if (!cart || !hasCartProducts) return;
    createOrder({ userId: cart.userId || 0, cart, christmasGift, valentinesGift });
  };

  const handleSubmitPayment = () => {
    if (!currentOrder || !phoneNumber.trim()) return;
    submitPayment({ orderId: currentOrder.id, provider, phoneNumber: phoneNumber.trim() });
  };

  const handleCloseSuccess = () => {
    clearOrder();
    onClearCart();
    onOrderClick();
  };

  const step = !currentOrder ? 1 : paymentStatus === "success" ? 3 : 2;

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 h-screen"
        onClick={onOrderClick}
      />

      <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="px-7 pt-6 pb-5 border-b border-stone-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-1">
                CleanShop
              </p>
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                Finaliser la commande
              </h2>
            </div>
            <button
              onClick={onOrderClick}
              className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-1 mt-5">
            {["Panier", "Paiement", "Confirmé"].map((label, i) => {
              const s = i + 1;
              const active = step === s;
              const done = step > s;
              return (
                <div key={s} className="flex items-center gap-1 flex-1 last:flex-none">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      active ? "bg-stone-900 text-white" :
                      done ? "bg-amber-400 text-stone-900" :
                      "bg-stone-100 text-stone-400"
                    }`}>
                      {done ? "✓" : s}
                    </div>
                    <span className={`text-xs font-medium transition-colors ${
                      active ? "text-stone-900" : done ? "text-amber-500" : "text-stone-300"
                    }`}>
                      {label}
                    </span>
                  </div>
                  {s < 3 && <div className="flex-1 h-px bg-stone-100 mx-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4">

          {/* Panier vide */}
          {!hasCartProducts && (
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6 text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-stone-400 text-sm">
                Votre panier est vide. Ajoutez des produits avant de continuer.
              </p>
            </div>
          )}

          {/* Étape 1 — Options + résumé */}
          {hasCartProducts && !currentOrder && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
                  Options cadeaux
                </p>
                <div className="space-y-2">
                  {[
                    { label: "🎄 Christmas gift", sublabel: "+$3.50", state: christmasGift, set: setChristmasGift },
                    { label: "💝 Valentines gift", sublabel: "+$2.75", state: valentinesGift, set: setValentinesGift },
                  ].map(({ label, sublabel, state, set }) => (
                    <label key={label} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      state ? "border-amber-300 bg-amber-50" : "border-stone-200 bg-white hover:border-stone-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          state ? "bg-amber-400 border-amber-400" : "border-stone-300"
                        }`}>
                          {state && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-stone-700">{label}</span>
                      </div>
                      <span className="text-xs text-amber-500 font-semibold">{sublabel}</span>
                      <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} className="hidden" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium mb-1">
                  Total estimé
                </p>
                <p className="text-4xl font-bold text-stone-900 tracking-tight">
                  ${cart?.total.toFixed(2)}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {cart?.products.length} article{(cart?.products.length ?? 0) > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}

          {/* Étape 2 — Paiement */}
          {!!currentOrder && paymentStatus !== "success" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">
                  Commande #{currentOrder.id}
                </p>
                <div className="space-y-2 text-sm text-stone-500">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>${currentOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais cadeaux</span>
                    <span>${currentOrder.giftFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-900 font-bold text-base">
                    <span>Total</span>
                    <span>${currentOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-100 bg-white p-5 space-y-3 shadow-sm">
                <p className="text-[10px] tracking-[0.2em] uppercase text-amber-500 font-semibold">
                  Méthode de paiement
                </p>
                {[
                  { value: "mtn_momo", label: "MTN MoMo", icon: "./img/mtn.png" },
                  { value: "orange_money", label: "Orange Money", icon: "./img/orange.png" },
                ].map(({ value, label, icon }) => (
                  <label key={value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    provider === value
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 hover:border-stone-300"
                  }`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      provider === value ? "border-white" : "border-stone-300"
                    }`}>
                      {provider === value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`flex gap-2 text-sm font-medium ${provider === value ? "text-white" : "text-stone-700"}`}>
                      <img src={icon} alt="" className="h-[25px] w-[25px] rounded-full object-contain" /> {label}
                    </span>
                    <input type="radio" name="payment-provider" checked={provider === value as PaymentProvider} onChange={() => setProvider(value as PaymentProvider)} className="hidden" />
                  </label>
                ))}

                <div className="relative mt-1">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Numéro de téléphone"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Étape 3 — Succès */}
          {paymentStatus === "success" && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-700 font-semibold mb-1">Paiement confirmé !</p>
              <p className="text-stone-400 text-sm mt-1">
                {successMessage ?? "Merci d'avoir choisi CleanShop"}
              </p>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 flex items-start gap-3">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-stone-100">
          {!currentOrder && (
            <button
              onClick={handleCreateOrder}
              disabled={!hasCartProducts || isCreating}
              className="w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Création...
                </>
              ) : "Continuer vers paiement →"}
            </button>
          )}

          {!!currentOrder && paymentStatus !== "success" && (
            <button
              onClick={handleSubmitPayment}
              disabled={!phoneNumber.trim() || isPaying}
              className="w-full bg-amber-400 text-stone-900 font-bold py-3.5 rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isPaying ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Traitement...
                </>
              ) : "Valider le paiement →"}
            </button>
          )}

          {paymentStatus === "success" && (
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-black text-white font-bold py-3.5 rounded-xl  transition-colors cursor-pointer"
            >
              Fermer ✓
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}