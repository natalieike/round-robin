const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

//Matches with "/api/users/interests/:userid&:interestid"
router.route("/interests/:userid&:interestid")
	.delete(userController.removeInterestFandom);

module.exports = router;