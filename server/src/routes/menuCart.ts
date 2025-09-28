import { Router } from "express";
import {
  getMenu,
  updateCart,
} from "../controllers/menuCartControllers";

const router = Router();

router.get("/menu", getMenu);

router.post("/cart", updateCart);

export default router;
