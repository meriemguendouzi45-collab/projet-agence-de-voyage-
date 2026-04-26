const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createMessage,
  getMessages,
  deleteMessage
} = require("../controllers/messageController");

// PUBLIC (contact form)
router.post("/", createMessage);

// ADMIN ONLY
router.get("/", auth, role("admin"), getMessages);
router.delete("/:id", auth, role("admin"), deleteMessage);

module.exports = router;