const router = require("express").Router();
const eventController = require("../../controllers/eventController");

// Matches with "/api/events"
router.route("/")
  .get(eventController.findAll)
  .post(eventController.create);

// Matches with "/api/events/:id"
router.route("/:id")
  .get(eventController.findById)
  .put(eventController.update)
  .delete(eventController.remove);

//Matches with "/api/events/join/:eventid&:userid"
router.route("/join/:eventid&:userid")
	.post(eventController.join)
	.put(eventController.eventAssociationUpdate)
	.delete(eventController.eventAssociationLeave);

//Matches with "/api/events/match/:id" - runs match process to match all participants
router.route("/match/:id")
	.put(eventController.match);

//Matches with "/api/events/options/:option&:value" - search by an option
router.route("/options/:option&:value")
	.get(eventController.findByOption);

//Matches with "/api/events/categories/all" - list all Categories
router.route("/categories/all")
	.get(eventController.findAllCategories);

//Matches with "/api/events/matchoptions/all" - list all match options
router.route("/matchoptions/all")
	.get(eventController.findAllMatchOptions);

module.exports = router;