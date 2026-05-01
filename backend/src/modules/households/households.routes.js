import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import * as controller from './households.controller.js';

const router = Router();

router.post('/', authMiddleware, controller.createHouseHold);
router.post('/join', authMiddleware, controller.joinHouseHold);
router.get('/:id/members', authMiddleware, controller.getAllMembers);
router.delete('/:id/leave', authMiddleware, controller.leaveHouseHold);

export default router;