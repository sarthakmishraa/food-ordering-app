import { Request, RequestHandler, Response } from "express";
import { menuItems } from "../utils/mocks";
import {
  getTotalAmountFromOrderSummary,
  searchThroughItems,
} from "../utils/helper";

export const getMenu: RequestHandler = (req, res) => {
  const { query } = req;

  const searchText = query.searchText;
  const pageNumber = query.pageNumber;

  if (typeof pageNumber !== "string") {
    res.status(400).json({
      success: false,
      message: "Page number is not valid.",
    });
    return;
  } else if (
    pageNumber &&
    typeof pageNumber === "string" &&
    parseInt(pageNumber) < 0
  ) {
    res.status(400).json({
      success: false,
      message:
        "Page number is not valid. It must be 0 or greater.",
    });
    return;
  }

  if (typeof searchText !== "string") {
    res.status(400).json({
      success: false,
      message: "Search text is not valid.",
    });
    return;
  }

  const searchedMenuItems = searchThroughItems(
    searchText,
    menuItems,
    ["name"],
    pageNumber
  );

  res.status(200).send(searchedMenuItems);
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
