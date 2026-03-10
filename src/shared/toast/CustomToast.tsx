import { twMerge } from "tailwind-merge";
import { AlertType } from "../lib/Notify";

type OwnProps = {
  className?: string;
  type: AlertType;
  message: string;
};

const CustomToast = ({ className, type, message }: OwnProps) => {
  const wrapperClasses = twMerge(
    "flex items-center gap-3 px-4 py-3 text-sm font-semibold",
    type === AlertType.SUCCESS && "text-emerald-500/95",
    type === AlertType.ERROR && "text-red-500/95",
    type === AlertType.WARNING && "text-amber-500/95",
    type === AlertType.DEFAULT && "text-blue-500/95",
    className
  );

  const badgeClasses = twMerge(
    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white",
    type === AlertType.SUCCESS && "bg-emerald-500/95",
    type === AlertType.ERROR && "bg-red-500/95",
    type === AlertType.WARNING && "bg-amber-500/95",
    type === AlertType.DEFAULT && "bg-blue-500/95"
  );

  return (
    <div className={wrapperClasses}>
      <span className={badgeClasses}>
        {type === AlertType.SUCCESS && "✓"}
        {type === AlertType.ERROR && "!"}
        {type === AlertType.WARNING && "!"}
        {type === AlertType.DEFAULT && "i"}
      </span>

      <span className="leading-tight">{message}</span>
    </div>
  );
};

export default CustomToast;