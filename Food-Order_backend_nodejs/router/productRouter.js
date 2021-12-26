import express from "express";
import productController from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/products", authAdmin, productController.createProduct);
router.delete("/products/:id", authAdmin, productController.deleteProduct);
router.put("/products/:id",  productController.updateProduct);
router.get("/products/:categoryName", productController.getProductsCategory)

export default router