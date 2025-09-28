import { Router } from "express";
import { getHelp } from "../controllers/helpAndSupportControllers";

const router = Router();

router.get("/help", getHelp);

export default router;
