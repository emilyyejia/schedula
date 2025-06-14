const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    console.log(req.query.date);
    const dateBegin = new Date(req.query.date);
    const dateEnd = new Date(req.query.date); 
    dateEnd.setDate(dateEnd.getDate()+10);
    console.log(dateBegin);
    console.log(dateEnd);
    const teacherId = req.query.teacherId;
    const appointments = await Appointment.find({
      teacher: teacherId,
      date: {
            $gte: dateBegin,
            $lte: dateEnd
      }
    });
    // below would return all appointments for just the logged in user
    res.json(appointments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
}

async function create(req, res) {
  try {
    
    const user = req.user;
    console.log(user);
    let appointment = {};
    const { date, startTime, teacher } = req.body;
    if (user.role === "teacher") {
      appointment = {
        date, 
        startTime, 
        status: "blocked", 
        teacher: req.user._id
      };
    } else {
       appointment = {
        date, 
        startTime, 
        status: "booked", 
        student: req.user._id, 
        teacher: teacher
      };
    }
    console.log(appointment);
    const newAppointment = await Appointment.create(appointment);
    res.json(newAppointment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create appointment" });
  }
}
