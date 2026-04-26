const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  title: String,
  destination: String,
  price: Number,
  description: String,
  image: String,
  availableSeats: Number,
  date: Date
});

module.exports = mongoose.model("Trip", tripSchema);