const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");


//Initialize database
var db = require("./models");
db.sequelize.sync({ force: true }).then(function(){
	
	//Set up Express
	const PORT = process.env.PORT || 3001;
	const app = express();

	// Serve up static assets
	if (process.env.NODE_ENV === "production") {
	  app.use(express.static("client/build"));
	}

	// Configure body parser
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Add routes, both API and view
	app.use(express.static("client/build"));

	app.use(routes);


	// Send every request to the React app
	// Define any API routes before this runs
	/*
	app.get("*", function(req, res) {
	  res.sendFile(path.join(__dirname, "./client/build/index.html"));
	});
	*/

	app.listen(PORT, function() {
	  console.log(`🌎 ==> Server now on port ${PORT}!`);
	});
}).catch(function(err){
	return console.log(err);
});
