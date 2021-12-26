import express from "express";
import articlesController from "../Controllers/articleController.js";

const router = express.Router();

router.post("/", articlesController.create);
router.get("/", articlesController.readAll);
router.get("/:articleId", articlesController.readOne);
router.put("/:articleId", articlesController.update);
router.delete("/:articleId", articlesController.delete);

export default router;

// import express from "express";
// import {newDetails} from "../Controllers/articleController.js"

// const router = express.Router();

// router.get( "/",async(req, res) => {

//     const articles = "article mit router";
//     res.send(articles);

// });

// router.post( "/", newDetails);

// export default router