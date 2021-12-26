const router = require("express").Router({ mergeParams: true });
const checkAuth = require("../middleware/checkAuth.js");

const eventsController = require("../controller/events.js");
const guestsRouter = require("./guests.js");

const validate = require("../middleware/validate.js");
const eventsSchema = require("../schema/events.json");

router.get("/:eventId?", validate(eventsSchema.GET), eventsController.read);
router.post("/", checkAuth, validate(eventsSchema.POST), eventsController.create);
router.patch("/:eventId", checkAuth, validate(eventsSchema.PATCH), eventsController.update);
router.delete("/:eventId", checkAuth, validate(eventsSchema.DELETE), eventsController.delete);

router.use("/:eventId/guests", guestsRouter);

module.exports = router;
