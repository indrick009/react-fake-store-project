import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast, type ToastOptions, } from "react-toastify";
import CustomToast from "../toast/CustomToast";

export enum AlertType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',  
  DEFAULT = 'DEFAULT'
}

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Bounce,
  theme: "colored",
};

export type NotifyOptions = {
  title?: string,
  msg: string,
  type?: AlertType,
  toastId?: string,
  customOptions?: Object
}


class Notify {
  private _toast(options: NotifyOptions) {
    toast(
      CustomToast({
        message: options.msg,
        type: options.type ?? AlertType.DEFAULT,
      }),
      {
        ...defaultOptions,
        ...options.customOptions,
        toastId: options.toastId, // injecté manuellement
        className: 'custom-toast',
        bodyStyle: {
          borderRadius: '50px',
          background: 'rgba(0,0,0,0)',
        },
      }
    );
  }

  show(msg: string, type: AlertType = AlertType.DEFAULT, toastId?: string, customOptions?: ToastOptions) {
    this._toast({ msg, type, toastId, customOptions });
  }

  success(msg: string, toastId?: string, customOptions?: ToastOptions) {
    this._toast({ msg, type: AlertType.SUCCESS, toastId, customOptions });
  }

  error(msg: string, toastId?: string, customOptions?: ToastOptions) {
    this._toast({ msg, type: AlertType.ERROR, toastId, customOptions });
  }

  info(msg: string, toastId?: string, customOptions?: ToastOptions) {
    this._toast({ msg, type: AlertType.DEFAULT, toastId, customOptions });
  }

  warning(msg: string, toastId?: string, customOptions?: ToastOptions) {
    this._toast({ msg, type: AlertType.WARNING, toastId, customOptions });
  }

  loading(msg: string, toastId?: string, customOptions?: ToastOptions) {
    toast.loading(msg, {
      ...defaultOptions,
      ...customOptions,
      toastId,
    });
  }

  custom(message: string, type?: AlertType, toastId?: string) {
    this._toast({
      msg: message,
      type,
      toastId,
    });
  }

  dismiss(toastId?: string) {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }
}

export default new Notify();
