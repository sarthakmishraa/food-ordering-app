import { ReactNode } from "react";
import { IPaymentMethod } from "./constants";

export interface IMenuItem {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
}

export interface IPrimaryButton {
  text?: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  extraContainerClassNames?: string;
  extraButtonClassNames?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export interface IMenuCard {
  item: IMenuItem;
}

export interface IHeaderTab {
  tabTitle: string;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isActiveTab?: boolean;
}

export interface IBanner {
  label: string;
  containerClassNames?: string;
  labelClassNames?: string;
}

export interface IPaymentDetails {
  amount: number;
  paymentMethod: IPaymentMethod;
}

export interface IPurchasedItem {
  id: string;
  quantity: number;
}

export interface ISelectedAddress {
  address: string;
  city: string;
  countryCode: string; //todo: change this to countryCode after integrating country api
  pincode: number;
}

export interface IOrderSummary {
  purchasedItems: IPurchasedItem[];
  selectedAddress: ISelectedAddress;
  paymentDetails: IPaymentDetails;
}

export interface IHelpData {
  name: string;
  email: string;
}

export interface SomethingWentWrongProps {
  message?: string;
  onRetry?: () => void;
}

export interface LabelProps {
  text: string;
  className?: string;
}

export interface IItemsFromCartDetails {
  dish: IMenuItem;
  quantity: number;
}

export interface ICartSummary {
  amountBeforeTax: number;
  amountAfterTax: number;
  itemsFromCartDetails: IItemsFromCartDetails[];
}

export interface ColorSet {
  primary: string;
  secondary: string;
  surface: string;
}

export interface TextColorSet {
  primary: string;
  secondary: string;
  link: string;
  inverse: string;
}

export interface StateColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface TypographyConfig {
  fontFamily: string;
  fontSizeBase: string;
  headingFontWeight: number;
  bodyFontWeight: number;
}

export interface IConfig {
  appTitle: string;
  colors: {
    bgColor: ColorSet;
    textColor: TextColorSet;
    accentColor: string;
    borderColor: string;
    states: StateColors;
  };
  typography: TypographyConfig;
}
