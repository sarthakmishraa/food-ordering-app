import express from "express";
import { getConfig } from "../controllers/configControllers";

const router = express.Router();

router.get("/config", getConfig);

export default router;
