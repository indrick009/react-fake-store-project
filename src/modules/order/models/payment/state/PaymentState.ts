import type { PaymentStatus } from "../PaymentMethod";

export type PaymentEvent =
  | "START"
  | "SUBMIT_PHONE"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "RETRY"
  | "RESET";

export interface PaymentState {
  readonly status: PaymentStatus;
  next(event: PaymentEvent): PaymentState;
}

class IdlePaymentState implements PaymentState {
  readonly status = "idle" as const;

  next(event: PaymentEvent): PaymentState {
    if (event === "START") return new AwaitingPhonePaymentState();
    return this;
  }
}

class AwaitingPhonePaymentState implements PaymentState {
  readonly status = "awaiting_phone" as const;

  next(event: PaymentEvent): PaymentState {
    if (event === "SUBMIT_PHONE") return new ProcessingPaymentState();
    if (event === "RESET") return new IdlePaymentState();
    return this;
  }
}

class ProcessingPaymentState implements PaymentState {
  readonly status = "processing" as const;

  next(event: PaymentEvent): PaymentState {
    if (event === "PAYMENT_SUCCESS") return new SuccessPaymentState();
    if (event === "PAYMENT_FAILED") return new FailedPaymentState();
    return this;
  }
}

class SuccessPaymentState implements PaymentState {
  readonly status = "success" as const;

  next(event: PaymentEvent): PaymentState {
    if (event === "RESET") return new IdlePaymentState();
    return this;
  }
}

class FailedPaymentState implements PaymentState {
  readonly status = "failed" as const;

  next(event: PaymentEvent): PaymentState {
    if (event === "RETRY") return new AwaitingPhonePaymentState();
    if (event === "RESET") return new IdlePaymentState();
    return this;
  }
}

export const resolvePaymentState = (status: PaymentStatus): PaymentState => {
  switch (status) {
    case "awaiting_phone":
      return new AwaitingPhonePaymentState();
    case "processing":
      return new ProcessingPaymentState();
    case "success":
      return new SuccessPaymentState();
    case "failed":
      return new FailedPaymentState();
    case "idle":
    default:
      return new IdlePaymentState();
  }
};

