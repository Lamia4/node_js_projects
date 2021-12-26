import express from "express";
import categoryController from "../controllers/categoryController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/category", categoryController.getCategories);
router.post("/category", categoryController.createCategory);
router.delete("/category/:id",  categoryController.deleteCategory);
router.put("/category/:id", categoryController.updateCategory);

export default router;