import { Request, Response } from "express";
import { uiConfig } from "../utils/mocks";

export const getConfig = (req: Request, res: Response) => {
  res.status(200).send(uiConfig);
};
