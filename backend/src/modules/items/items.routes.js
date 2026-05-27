import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import * as controller from "./items.controller.js";
import housholdMiddleware from "../households/households.middleware.js";

const router = Router();

router.post("/", authMiddleware, housholdMiddleware, controller.createItem);
router.get("/", authMiddleware, housholdMiddleware, controller.getItems);

export default router;
