const mongoose = require("mongoose");
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Session = require("../models/session");
const TeacherProfile = require('../models/teacherProfile');
module.exports = {
  getTeachers,
  getAppointments,
  index,
  create,
  remove,
  update,
};

async function getTeachers(req, res) {
  try {
    const teachers = await TeacherProfile.find({ })
    .populate("teacher");
    res.json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
}

async function getAppointments(req, res) {
  try {
    const today = new Date(req.query.date);
    const appointments = await Appointment.find({
      student: req.user._id,
      date: {$gte: today}
    })
    .populate("teacher");
    res.json(appointments);
  } catch (err) {
        console.log(err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }

}
async function index(req, res) {
  try {
    const dateBegin = new Date(req.query.date);
    const dateEnd = new Date(req.query.date);
    dateEnd.setDate(dateEnd.getDate() + 7);
    const teacherId = req.params.teacherId;
    const appointments = await Appointment.find({
      teacher: teacherId,
      date: {
        $gte: dateBegin,
        $lte: dateEnd,
      },
    });
    const sessions = await Session.find({
      teacher: teacherId,
    });
    res.json({ appointments, sessions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
}

async function create(req, res) {
  try {
    const user = req.user;
    let appointment = {};
    const { date, startTime, teacher } = req.body;
    if (user.role === "teacher") {
      appointment = {
        date,
        startTime,
        status: "blocked",
        teacher: req.user._id,
      };
    } else {
      appointment = {
        date,
        startTime,
        status: "booked",
        student: req.user._id,
        teacher: teacher,
      };
    }
    console.log(appointment);
    const newAppointment = await Appointment.create(appointment);
    res.json(newAppointment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to book appointment" });
  }
}

async function remove(req, res) {
  try {
    const appointmentId = req.body.appointmentId;
    await Appointment.findByIdAndDelete(appointmentId);
    res.json(appointmentId);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to cancel appointment" });
  }
}

async function update(req, res) {
  try {
    const appointmentId = req.body.appointmentId;
    const { startTime, date } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { startTime, date },
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: "Call to reschedule" });
  }
}
