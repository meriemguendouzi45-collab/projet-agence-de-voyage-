const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

exports.createBooking = async (req, res) => {
  try {
    const user = req.user;

    const booking = await Booking.create({
      ...req.body,
      userId: user.id,
    });

    // 📩 email admin
    await sendEmail(
      process.env.EMAIL_USER,
      "New Booking Received",
      `User ${user.id} booked a trip:\n\n${JSON.stringify(req.body, null, 2)}`
    );

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};