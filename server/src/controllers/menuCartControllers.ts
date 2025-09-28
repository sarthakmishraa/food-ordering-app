import { Request, Response } from "express";
import { menuItems } from "../utils/mocks";
import { getTotalAmountFromOrderSummary } from "../utils/helper";

export const getMenu = (req: Request, res: Response) => {
  res.status(200).send(menuItems);
};

export const updateCart = (req: Request, res: Response) => {
  const cart = req.body;

  if (!cart) {
    res.status(404).send("Error occured: Cart not found");
    return;
  }

  const amountBeforeTax = getTotalAmountFromOrderSummary(
    cart,
    false
  );
  const amountAfterTax = getTotalAmountFromOrderSummary(
    cart,
    true
  );

  const itemsFromCartDetails = cart
    ?.map((item: { id: string; quantity: number }) => {
      const foundItem = menuItems?.find(
        (i) => i?.id === item?.id
      );
      if (!foundItem) return null;

      return {
        dish: foundItem,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  res.status(200).send({
    itemsFromCartDetails,
    amountBeforeTax,
    amountAfterTax,
  });
};
