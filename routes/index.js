const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const session = require("express-session");
//const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

/*
// Authentication Routes
function isLoggedIn(req, res, next) {
  req.loggedIn = !!req.user;
  next();
}

router.get('/', isLoggedIn, function(req, res) {
  res.json({
    loggedIn:req.loggedIn
  });
});

router.get('/auth/facebook', 
   passport.authenticate('facebook', {scope:"public_profile, email"}));
router.get('/auth/facebook/callback', 
   passport.authenticate('facebook', 
		{ successRedirect: '/', failureRedirect: '/login' }));

router.get('/login', isLoggedIn, function(req, res) {
  if(req.loggedIn) res.redirect('/');
  console.log("/login: " + req.loggedIn);
  res.json({
    login: false
  });
});

// 500 error handler (middleware)
router.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.json(err);
});
*/

module.exports = function(passport){

// middleware that is specific to this router
router.use(isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.json({data: "not logged in"}); 
});

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

return router;
}

//module.exports = router;