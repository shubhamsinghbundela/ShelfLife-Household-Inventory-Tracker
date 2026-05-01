import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import * as controller from './items.controller.js';

const router = Router();

router.post('/', authMiddleware, controller.createItems);

export default router;