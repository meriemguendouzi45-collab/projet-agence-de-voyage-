const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createTrip,
  getTrips,
  updateTrip,
  deleteTrip
} = require("../controllers/tripController");

router.get("/", getTrips);
router.post("/", auth, role("admin"), createTrip);
router.put("/:id", auth, role("admin"), updateTrip);
router.delete("/:id", auth, role("admin"), deleteTrip);

module.exports = router;