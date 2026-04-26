const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createService,
  getAllServices,
  updateServiceStatus,
  deleteService,
} = require("../controllers/serviceController");

// USER
router.post("/", auth, createService);

// ADMIN
router.get("/", auth, role("admin"), getAllServices);
router.put("/:id", auth, role("admin"), updateServiceStatus);
router.delete("/:id", auth, role("admin"), deleteService);

module.exports = router;