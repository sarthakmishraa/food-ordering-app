import express from "express";
import { getHome } from "../controllers/homeControllers";

const router = express.Router();

router.get("/", getHome);

export default router;
