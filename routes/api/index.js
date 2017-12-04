const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./users");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook");
const FacebookTokenStrategy = require('passport-facebook-token');

//module.exports = function(passport){

//	router.use("/events", eventRoutes)(passport);
//	router.use("/users", userRoutes)(passport);
	router.use("/events", eventRoutes);
	router.use("/users", userRoutes);
//	return router;
//}
module.exports = router;