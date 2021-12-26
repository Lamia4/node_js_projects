import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.register);
router.get("/", userController.readOne);
router.get("/refresh_token", userController.refreshToken);

export default router;