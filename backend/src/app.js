import express from "express";
import cors from "cors";
import cron from "node-cron";
import cookieParser from "cookie-parser";
import errorHandler from "./common/middleware/error-middleware.js";
import authRoute from "./modules/auth/auth.routes.js";
import householdsRoute from "./modules/households/households.routes.js";
import itemsRoute from "./modules/items/items.routes.js";
import "./modules/items/items.cron.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://52.66.199.16",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/households", householdsRoute);
app.use("/api/items", itemsRoute);

app.use(errorHandler);

export default app;
