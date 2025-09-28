import { Request, Response } from "express";
import { helpDetails } from "../utils/mocks";

export const getHelp = (req: Request, res: Response) => {
  res.status(200).send(helpDetails);
};
