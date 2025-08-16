import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { helpDetails, menuItems } from "./utils/mocks";
import { getTotalAmountFromOrderSummary } from "./utils/helper";
import { IMenuItem } from "./types/types";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FE_URL,
  })
);
app.use(express.json());

const port = process.env.PORT_BE || 3000;

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("Welcome to Config driven Food Ordering App");
});

app.get("/menu", (req: Request, res: Response) => {
  res.status(200).send(menuItems);
});

app.post("/cart", (req: Request, res: Response) => {
  const cart = req.body;

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
});

app.get("/help", (req: Request, res: Response) => {
  res.status(200).send(helpDetails);
});

app.listen(port, () => {
  console.log("Server is fired at port: ", { port });
});
