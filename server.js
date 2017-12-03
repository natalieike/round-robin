const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const keys = require("./config/keys.json")
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

//Initialize database
var db = require("./models");
db.sequelize.sync({ force: false }).then(function(){
	
	// Setup Passport
	passport.use(new FacebookStrategy(
		{
	    clientID: process.env.facebookAppId || keys.facebook.app_id,
	    clientSecret: process.env.facebookAppSecret || keys.facebook.app_secret,
	    callbackURL: process.env.facebookCallback || keys.facebook.callback,
	    profileFields:['displayname', 'id', 'email','first_name','last_name']
    }, 
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      let me = {
          email:profile.emails[0].value,
          firstName: profile.first_name,
          lastName: profile.last_name,
          fbUserId: profile.id,
          streetAddress: "Please Confirm",
          city: "Please Confirm",
          postalCode: "Please Confirm",
          shippingPreferenceId: 1,
          stateProvinceId: 1
    	};

      db.user.findOrCreate({
      	where: {
	      	fbUserId: me.fbUserId,
	      	isActive: true
	    	},
	    	defaults: me
	    }).spread(function(user, created){
	    	console.log("find or create user: " + user);
	    	return cb(user)
      }).catch(err => {res.json(err)});
	  }
	));

	passport.serializeUser(function(user, done) {
    console.log("serialize user: " + user);
    done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
    db.user.findOne({
    	where: {
    		id: id,
    		isActive: true
    	}})
    .then(function(err, user) {
    	console.log("deserialize user: " + user);
      done(err, user);
    });
	});

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

	// Configure Express-Session for Passport
	app.set('trust proxy', 1); // trust first proxy
	app.use(session({
	  secret: process.env.cookieSecret || keys.cookieSecret,
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: true }
	}));
	app.use(passport.initialize());
	app.use(passport.session());

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
