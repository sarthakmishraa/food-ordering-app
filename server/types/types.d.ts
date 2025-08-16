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
