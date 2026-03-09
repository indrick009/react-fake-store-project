import { useState } from "react";
import { LoadingState } from "../../../../shared/domain/enums/LoadingState";
import type { Cart } from "../../../cart/models/Cart";
import type { PaymentProvider } from "../../models/payment/PaymentMethod";
import OrderStep1 from "./components/OrderStep1";
import OrderStep2 from "./components/OrderStep2";
import OrderStep3 from "./components/OrderStep3";
import Stepper from "./components/Stepper";
import { useOrder } from "./hooks/useOrder";
import PrimaryButton from "../../../../shared/components/PrimaryButton";

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
    createOrder({
      userId: cart.userId || 0,
      cart,
      christmasGift,
      valentinesGift,
    });
  };

  const handleSubmitPayment = () => {
    if (!currentOrder || !phoneNumber.trim()) return;
    submitPayment({
      orderId: currentOrder.id,
      provider,
      phoneNumber: phoneNumber.trim(),
    });
  };

  const handleCloseSuccess = () => {
    clearOrder();
    onClearCart();
    onOrderClick();
  };

  const step = !currentOrder ? 1 : paymentStatus === "success" ? 3 : 2;
  const giftOptions = [
    {
      label: "🎄 Christmas gift",
      sublabel: "+$3.50",
      price: 3.5,
      checked: christmasGift,
      onChange: setChristmasGift,
    },
    {
      label: "💝​ Valentines gift",
      sublabel: "+$2.75",
      price: 2.75,
      checked: valentinesGift,
      onChange: setValentinesGift,
    },
  ];

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 h-screen"
        onClick={onOrderClick}
      />

      <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="px-7 pt-6 pb-5 border-b border-stone-100">
          <div className="flex items-start justify-between">
            <div>
              <div>
                <span className="font-bold text-primary-500">Clean</span>
                <span className="font-bold text-stone-900">Shop</span>
              </div>
              <div className="text-2xl font-bold text-stone-900 tracking-tight">
                Finaliser la commande
              </div>
            </div>
            <button
              onClick={onOrderClick}
              className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              <svg
                className="w-4 h-4 text-stone-500"
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

          <Stepper step={step} />
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4">
          {!hasCartProducts && (
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6 text-center">
              <p className="text-stone-400 text-sm">
                Votre panier est vide. Ajoutez des produits avant de continuer.
              </p>
            </div>
          )}

          <OrderStep1
            hasCartProducts={hasCartProducts}
            currentOrder={currentOrder}
            cart={cart}
            giftOptions={giftOptions}
          />

          <OrderStep2
            currentOrder={currentOrder}
            paymentStatus={paymentStatus}
            provider={provider}
            setProvider={setProvider}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />

          <OrderStep3
            paymentStatus={paymentStatus}
            successMessage={successMessage}
          />

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="px-7 py-5 border-t border-stone-100">
          {!currentOrder && (
            <PrimaryButton
              onClick={handleCreateOrder}
              disabled={!hasCartProducts || isCreating}
              fullWidth
              size="lg"
              loading={isCreating}
            >
              Continuer vers paiement
            </PrimaryButton>
          )}

          {!!currentOrder && paymentStatus !== "success" && (
            <PrimaryButton
              onClick={handleSubmitPayment}
              disabled={!phoneNumber.trim() || isPaying}
              fullWidth
              size="lg"
              variant="amber"
              loading={isPaying}
            >
              Valider le paiement
            </PrimaryButton>
          )}

          {paymentStatus === "success" && (
            <PrimaryButton onClick={handleCloseSuccess} fullWidth size="lg">
              Fermer
            </PrimaryButton>
          )}
        </div>
      </aside>
    </div>
  );
}
