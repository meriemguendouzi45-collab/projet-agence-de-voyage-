const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

// ➜ USER SEND MESSAGE
exports.createMessage = async (req, res) => {
  try {
    const msg = await Message.create(req.body);

    // 📩 SEND EMAIL TO YOU
    await sendEmail(
      process.env.EMAIL_USER,
      `New Contact Message: ${msg.subject}`,
      `
Name: ${msg.name}
Email: ${msg.email}
Phone: ${msg.phone}

Message:
${msg.message}
      `
    );

    res.json({ success: true, msg });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ➜ ADMIN GET ALL MESSAGES
exports.getMessages = async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: -1 });
  res.json(msgs);
};

// ➜ ADMIN DELETE MESSAGE
exports.deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};