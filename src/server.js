require("dotenv").config();
import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import cors from "cors";
import { json } from "body-parser";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

export const app = express(); // You can also use Express
app
  .use(json())
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .use(cors())
  .options("*", cors())

  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
