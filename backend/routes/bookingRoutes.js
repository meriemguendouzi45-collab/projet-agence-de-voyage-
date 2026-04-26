const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createBooking } = require("../controllers/bookingController");


router.post("/", auth, createBooking);

module.exports = router;