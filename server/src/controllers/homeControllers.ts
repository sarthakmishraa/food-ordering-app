import { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  res
    .status(200)
    .send("Welcome to Config driven Food Ordering App");
};
