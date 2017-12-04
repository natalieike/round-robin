const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook");
const FacebookTokenStrategy = require('passport-facebook-token');

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.json({data: "not logged in"});
}

//module.exports = function(passport){

	// Matches with "/api/events" - find all events, create new event
	router.route("/")
	  .get(eventController.findAll)
	  .post(eventController.create);

	// Matches with "/api/events/:id" - find/update/delete event by ID
	router.route("/:id")
	  .get(isAuthenticated, eventController.findById)
	  .put(isAuthenticated, eventController.update)
	  .delete(isAuthenticated, eventController.remove);

	//Matches with "/api/events/join/:eventid&:userid" - user joins or leaves an event, or updates event data
	router.route("/join/:eventid&:userid")
		.post(isAuthenticated, eventController.join)
		.put(isAuthenticated, eventController.eventAssociationUpdate)
		.delete(isAuthenticated, eventController.eventAssociationLeave);

	//Matches with "/api/events/user/:userId" - finds events that the user has joined
	router.route("/user/:userId")
		.get(isAuthenticated, eventController.findUserEvents);

	//Matches with "/api/events/match/:id" - runs match process to match all participants
	router.route("/match/:id")
		.put(isAuthenticated, eventController.match);

	//Matches with "/api/events/options/:option&:value" - search by an option
	router.route("/options/:option&:value")
		.get(isAuthenticated, eventController.findByOption);

	//Matches with "/api/events/categories/all" - list all Categories
	router.route("/categories/all")
		.get(eventController.findAllCategories);

	//Matches with "/api/events/matchoptions/all" - list all match options
	router.route("/matchoptions/all")
		.get(eventController.findAllMatchOptions);

//	return router;
//}

module.exports = router;