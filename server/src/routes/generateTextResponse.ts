import { Router } from "express";
import { generateResponse } from "../controllers/generateResponseControllers";

const router = Router();

router.get("/generate", generateResponse);

export default router;
