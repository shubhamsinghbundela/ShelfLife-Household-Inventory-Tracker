import express from "express";
import cron from "node-cron";
import errorHandler from "./common/middleware/error-middleware.js";
import authRoute from "./modules/auth/auth.routes.js";
import householdsRoute from "./modules/households/households.routes.js";
import itemsRoute from "./modules/items/items.routes.js";
import "./modules/items/items.cron.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/households", householdsRoute);
app.use("/api/items", itemsRoute);

app.use(errorHandler);

export default app;
