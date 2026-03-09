import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "dark" | "amber";
type Size = "md" | "lg";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-700",
  dark: "bg-stone-900 text-white hover:bg-stone-700",
  amber: "bg-amber-400 text-stone-900 hover:bg-amber-300",
};

const sizeClasses: Record<Size, string> = {
  md: "py-3 rounded-xl text-sm font-semibold",
  lg: "py-3.5 rounded-xl text-base font-semibold",
};

export default function AppButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  className,
  ...props
}: AppButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={twMerge(
        "transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}

