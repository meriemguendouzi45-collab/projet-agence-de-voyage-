const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  destination: String,
  departureDate: String,
  returnDate: String,
  adults: Number,
  children: Number,
  packageType: String,
  name: String,
  email: String,
  phone: String,
  paymentMethod: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);