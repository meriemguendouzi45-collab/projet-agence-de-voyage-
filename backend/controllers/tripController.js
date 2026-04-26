const Trip = require("../models/Trip");

exports.createTrip = async (req, res) => {
  const trip = await Trip.create(req.body);
  res.json(trip);
};

exports.getTrips = async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
};

exports.updateTrip = async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(trip);
};

exports.deleteTrip = async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json("Trip supprimé");
};