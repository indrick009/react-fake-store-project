import type { PaymentStatus } from "../../../models/payment/PaymentMethod";

interface OrderStep3Props {
  paymentStatus: PaymentStatus;
  successMessage: string | null;
}

export default function OrderStep3({
  paymentStatus,
  successMessage,
}: OrderStep3Props) {
  if (paymentStatus !== "success") return null;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-7 h-7 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p className="text-emerald-700 font-semibold mb-1">Paiement confirme</p>
      <p className="text-stone-400 text-sm mt-1">
        {successMessage ?? "Merci d'avoir choisi CleanShop"}
      </p>
    </div>
  );
}
