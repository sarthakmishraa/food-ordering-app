import express from "express";
import {
  signInUser,
  signUpUser,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/signIn", signInUser);
router.post("/signUp", signUpUser);

export default router;
