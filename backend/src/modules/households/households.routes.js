import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import * as controller from './households.controller.js';

const router = Router();

router.post('/', authMiddleware, controller.createHouseHold);
router.post('/join', authMiddleware, controller.joinHouseHold);

export default router;