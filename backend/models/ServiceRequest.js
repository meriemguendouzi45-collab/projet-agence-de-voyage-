const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  type: String, // flight, hotel, visa...

  name: String,
  email: String,
  phone: String,

  data: Object, // flexible form

  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceSchema);