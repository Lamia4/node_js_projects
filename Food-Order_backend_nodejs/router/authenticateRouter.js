import express from "express";
import authenticationController from "../controllers/authenticateController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", authenticationController.loginByEmail);
router.get("/logout", authenticationController.logout);
router.get("/information", auth, authenticationController.getUser);

export default router;