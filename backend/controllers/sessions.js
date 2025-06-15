const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
module.exports = {
  index,
};

async function index(req, res) {
  try {
    const appointments = await Appointment.find({teacher: req.user._id}).populate("student");
    res.json(appointments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
}

