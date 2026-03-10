import type { PaymentProvider } from "../../../models/payment/PaymentMethod";
import type { PaymentStatus } from "../../../models/payment/PaymentMethod";
import type { Order } from "../../../models/Order";
import AppInput from "../../../../../shared/components/AppInput";

interface OrderStep2Props {
  currentOrder: Order | null;
  paymentStatus: PaymentStatus;
  provider: PaymentProvider;
  setProvider: (provider: PaymentProvider) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

export default function OrderStep2({
  currentOrder,
  paymentStatus,
  provider,
  setProvider,
  phoneNumber,
  setPhoneNumber,
}: OrderStep2Props) {
  if (!currentOrder || paymentStatus === "success") return null;

  return (
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
          Methode de paiement
        </p>
        <label className="flex items-center gap-3 p-3 rounded-full border border-stone-200 cursor-pointer">
          <input
            type="radio"
            name="payment-provider"
            checked={provider === "mtn_momo"}
            onChange={() => setProvider("mtn_momo")}
          />
          <div className="flex items-center gap-2">
            <img src="/img/mtn.png" alt="" className="h-[25px] w-[25px]"/>
            <span className="text-sm font-medium text-stone-700">
              MTN MoMo
            </span>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-full border border-stone-200 cursor-pointer">
          <input
            type="radio"
            name="payment-provider"
            checked={provider === "orange_money"}
            onChange={() => setProvider("orange_money")}
          />
          <div className="flex items-center">
            <img src="/img/orange.png" alt="" className="h-[25px] w-[40px]"/>
            <span className="text-sm font-medium text-stone-700">
              Orange Money
            </span>
          </div>
        </label>

        <AppInput
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Numero de telephone"
          numericOnly
        />
      </div>
    </div>
  );
}
