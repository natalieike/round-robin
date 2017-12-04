const router = require("express").Router();
const userController = require("../../controllers/userController");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook");
const FacebookTokenStrategy = require('passport-facebook-token');

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({data: "not logged in"});
}

//module.exports = function(passport){

	// Matches with "/api/users" - find all users, create new user
	router.route("/")
	  .get(userController.findAll)
	  .post(userController.create);

	// Matches with "/api/users/:id" - find/update/delete user by ID
	router.route("/:id")
	  .get(userController.findById)
	  .put(userController.update)
	  .delete(userController.remove);

	//Matches with "/api/users/interests/:userid&:interestid" - remove an interest/fandom association from a user
	router.route("/interests/:userid&:interestid")
		.delete(userController.removeInterestFandom);

//	return router;

//}

module.exports = router;