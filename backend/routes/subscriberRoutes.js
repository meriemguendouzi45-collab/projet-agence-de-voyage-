const router = require("express").Router();

const {
  subscribe,
  getSubscribers,
} = require("../controllers/subscriberController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// PUBLIC
router.post("/", subscribe);

// ADMIN
router.get("/", auth, role("admin"), getSubscribers);

module.exports = router;