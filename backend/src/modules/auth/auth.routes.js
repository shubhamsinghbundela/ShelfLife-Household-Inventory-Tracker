import { Router } from "express";
import * as controller from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("CI/CD working-post for twitter");
});
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.get("/getme", authMiddleware, controller.getMe);
router.get("/logout", authMiddleware, controller.logout);

export default router;
