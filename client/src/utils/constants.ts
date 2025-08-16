export const INRSymbol = "₹";

export const DISCOUNT_PERCENTAGE = 10;

export const placeholderUrl =
  "https://picsum.photos/200/300";

export enum IPaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  ONLINE = "ONLINE",
}

export const TAX_PERCENTAGE = 18;

export const toastStyles = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

export type NetworkStatus =
  | "idle"
  | "loading"
  | "loaded"
  | "error";

export enum NetworkStatusEnum {
  Idle = "idle",
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
}
