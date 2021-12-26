const router = require("express").Router({ mergeParams: true });

const authController = require("../controller/auth.js");

const validate = require("../middleware/validate.js");
const authSchema = require("../schema/auth.json");

router.post("/login", validate(authSchema.POST), authController.login);
router.post("/reset", authController.resetPassword);

module.exports = router;
