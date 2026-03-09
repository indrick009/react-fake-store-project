interface StepperProps {
  step: number;
}

export default function Stepper({ step }: StepperProps) {
  return (
    <div className="flex items-center gap-1 mt-5">
      {["Panier", "Paiement", "Confirme"].map((label, i) => {
        const current = i + 1;
        const active = step === current;
        const done = step > current;

        return (
          <div key={current} className="flex items-center gap-1 flex-1 last:flex-none">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  active
                    ? "bg-stone-900 text-white"
                    : done
                      ? "bg-amber-400 text-stone-900"
                      : "bg-stone-100 text-stone-400"
                }`}
              >
                {done ? "OK" : current}
              </div>

              <span
                className={`text-xs font-medium transition-colors ${
                  active
                    ? "text-stone-900"
                    : done
                      ? "text-amber-500"
                      : "text-stone-300"
                }`}
              >
                {label}
              </span>
            </div>

            {current < 3 && <div className="flex-1 h-px bg-stone-100 mx-2" />}
          </div>
        );
      })}
    </div>
  );
}

