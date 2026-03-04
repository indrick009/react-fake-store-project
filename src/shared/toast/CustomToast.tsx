import { twMerge } from "tailwind-merge";
import { AlertType } from "../lib/Notify";

type OwnProps = {
  className?: string;
  type: AlertType;
  message: string;
};

const CustomToast = ({ className, type, message }: OwnProps) => {
  return (
    <div
      className={twMerge(
        `py-2 px-4 rounded-xl text-white font-medium
        transition-all duration-300 ease-linear overflow-hidden relative w-[450px] text-sm min-h-[65px]`,
        type === AlertType.SUCCESS && "bg-green border border-green",
        type === AlertType.ERROR && "bg-red border border-red",
        type === AlertType.WARNING && "bg-yellow-400 border border-yellow-400",
        type === AlertType.DEFAULT && "bg-blue-400 border border-blue-400",
        className
      )}
    >
      {message}
      {/*<div className="h-2 w-full bg-transparent absolute left-0 right-0 bottom-0">*/}
      {/*  <div className="bg-white w-0 progress-bar-anim h-full"></div>*/}
      {/*</div>*/}
    </div>
  );
};

export default CustomToast;
