import express from "express";
import errorHandler from "./common/middleware/error-middleware.js";
import authRoute from './modules/auth/auth.routes.js'
import householdsRoute from './modules/households/households.routes.js'

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/households", householdsRoute)

app.use(errorHandler)

export default app;