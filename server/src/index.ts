import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import home from "./routes/home";
import config from "./routes/config";
import menuCart from "./routes/menuCart";
import helpAndSupport from "./routes/helpAndSupport";
import generateTextResponse from "./routes/generateTextResponse";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FE_URL,
  })
);

app.use(express.json());

const port = process.env.PORT_BE || 3000;

// home APIs
app.use("", home);

// config APIs
app.use("", config);

// menuCart APIs
app.use("", menuCart);

// help and support APIs
app.use("", helpAndSupport);

app.use("", generateTextResponse);

app.listen(port, () => {
  console.log("Server is fired at port: ", { port });
});
