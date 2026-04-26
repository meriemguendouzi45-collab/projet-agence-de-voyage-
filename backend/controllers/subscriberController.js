const Subscriber = require("../models/Subscriber");
const sendEmail = require("../utils/sendEmail");

// ➜ USER SUBSCRIBE
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    // check if exists
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const sub = await Subscriber.create({ email });

    // 📩 EMAIL TO ADMIN
    await sendEmail(
      process.env.EMAIL_USER,
      "New Subscriber",
      `New user subscribed:\n\n${email}`
    );

    res.status(201).json({
      message: "Subscribed successfully",
      sub,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➜ ADMIN GET ALL
exports.getSubscribers = async (req, res) => {
  const subs = await Subscriber.find().sort({ createdAt: -1 });
  res.json(subs);
};