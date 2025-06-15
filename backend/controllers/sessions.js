const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
const Session = require("../models/session");
module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const appointments = await Appointment.find({
      teacher: req.user._id,
    }).populate("student");
    const sessions = await Session.find({ teacher: req.user._id});
    res.json({appointments, sessions});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
}

async function create(req, res) {
  try {
    const { date, startTime } = req.body;
    const teacher = req.user._id;
    let session = await Session.findOne({ teacher });
    if (!session) {
      session = new Session({
        teacher,
        blockedTimeSlots: [],
      });
    }
    // const isBooked = await Appointment.exists({
    //   teacher: req.user._id,
    //   date: new Date(date),
    //   startTime,
    // });
    // if (!isBooked) {
      session.blockedTimeSlots.push({ date, startTime });
      await session.save();
      res.json(session);
    // }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to block this Time" });
  }
}
