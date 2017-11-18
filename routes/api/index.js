const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./users");

// Article routes
router.use("/events", eventRoutes);
router.use("/users", userRoutes);

module.exports = router;