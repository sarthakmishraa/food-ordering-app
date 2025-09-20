import { IPurchasedItem } from "../types/types";
import {
  DISCOUNT_PERCENTAGE,
  TAX_PERCENTAGE,
} from "./constants";
import { menuItems } from "./mocks";

export const getTotalAmountFromOrderSummary = (
  itemsPurchased: IPurchasedItem[],
  includeTax: boolean
) => {
  let amount = 0;
  itemsPurchased?.map((purchasedItem) => {
    const itemObj = menuItems?.find(
      (i) => i?.id === purchasedItem?.id
    );
    if (!itemObj) return false;

    amount +=
      purchasedItem?.quantity *
      (itemObj?.price -
        (itemObj?.price * DISCOUNT_PERCENTAGE) / 100);
  });

  if (includeTax) {
    amount = amount + (amount * TAX_PERCENTAGE) / 100;
    return amount;
  } else {
    return amount;
  }
};
