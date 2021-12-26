const router = require("express").Router({ mergeParams: true });

const guestsController = require("../controller/guests.js");

const validate = require("../middleware/validate.js");
const guestsSchema = require("../schema/guests.json");

router.post("/", validate(guestsSchema.POST), guestsController.create);
router.delete("/:ticketId", validate(guestsSchema.DELETE), guestsController.delete);

module.exports = router;
