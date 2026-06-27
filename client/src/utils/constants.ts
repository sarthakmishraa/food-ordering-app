import { FieldMapper } from "./types";

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

export enum MessageRole {
  USER = "USER",
  BOT = "BOT",
}

export const REACT_ICONS_MD_ICON_SIZE = 20;
export const REACT_ICONS_IO_ICON_SIZE = 20;
export const REACT_ICONS_PI_ICON_SIZE = 20;

export const REQUIRED_FIELD_LABEL =
  "This field is required.";

export const fieldMapper: FieldMapper[] = [
  {
    fieldKey: "name",
    label: "Name",
    placeholder: "Enter your name",
    showOnSignIn: false,
  },
  {
    fieldKey: "username",
    label: "Username",
    placeholder: "Enter your username",
    showOnSignIn: true,
  },
  {
    fieldKey: "password",
    label: "Password",
    placeholder: "Enter a strong password",
    fieldType: "password",
    showOnSignIn: true,
  },
  {
    fieldKey: "email",
    label: "Email",
    placeholder: "sample@email.com",
    showOnSignIn: false,
  },
  {
    fieldKey: "phoneNumber",
    label: "Phone Number",
    placeholder: "eg: 9876543210",
    showOnSignIn: false,
  },
];
