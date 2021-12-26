import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/checkout", auth, orderController.createNewOrder );
router.get("/checkout", orderController.getOrders);

export default router;