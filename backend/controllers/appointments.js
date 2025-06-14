const mongoose = require("mongoose");
const Appointment = require("../models/appointment");
module.exports = {
  index,
  create,
  remove,
  update
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
    })
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
    res.status(400).json({message: 'Failed to cancel appointment'});
  }
}

async function update(req, res) {
  try {
    const appointmentId = req.body.appointmentId;
    const { startTime, date } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId, 
    {startTime, date},
    {new: true}
  );
    res.json(updatedAppointment);

    
  } catch (err) {
    res.status(400).json({message: 'Call to reschedule'});
    
  }
}