import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  numericOnly?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, numericOnly = false, onChange, ...props }, ref) => {
    const handleChange: AppInputProps["onChange"] = (event) => {
      if (numericOnly) {
        const nextValue = event.target.value.replace(/\D+/g, "");
        if (nextValue !== event.target.value) {
          event.target.value = nextValue;
        }
      }
      onChange?.(event);
    };

    return (
      <input
        ref={ref}
        onChange={handleChange}
        inputMode={numericOnly ? "numeric" : props.inputMode}
        pattern={numericOnly ? "[0-9]*" : props.pattern}
        className={twMerge(
          "w-full border border-stone-200 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all px-4 py-3 rounded-full focus:ring-primary-500",
          className,
        )}
        {...props}
      />
    );
  },
);

AppInput.displayName = "AppInput";

export default AppInput;
