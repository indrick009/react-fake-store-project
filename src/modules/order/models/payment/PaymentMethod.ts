export type PaymentProvider = "mtn_momo" | "orange_money";

export type PaymentStatus =
  | "idle"
  | "awaiting_phone"
  | "processing"
  | "success"
  | "failed";

